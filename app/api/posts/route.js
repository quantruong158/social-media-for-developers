import { connectToDB } from '@/utils/database'
import { clerkClient } from '@clerk/nextjs'

export const GET = async (req, { params }) => {
  const { searchParams } = new URL(req.url)
  const username = searchParams.get('username')
  console.log(username)
  const driver = await connectToDB()
  const getPosts = async () => {
    const session = driver.session()
    try {
      const res = await session.executeRead((tx) =>
        tx.run(
          `
        match (u:User {username: $username}) -[:OWNS]-> (p:Post)

        optional match (p) <-[l:LIKES]- (:User)

        with u, p, count(l) as likes
        optional match (p) -[c: HAS_COMMENTS]-> (:Comment)

        with u, p, likes, count(c) as comments
        optional match (p) <-[s:SHARES]- (:User)

        with u, p, likes, comments, count(s) as shares
        optional match (p) -[:HAS_TAGS]-> (t :Tag)
        
        return p as posts, u as users, likes, comments, shares, exists((u) -[:LIKES]-> (p)) as liked, collect(t.value) as tagnames
        order by p.createdTime desc
        `,
          {
            username: username,
          },
        ),
      )
      if (res.records.length === 0) {
        return []
      }
      const posts = res.records.map((record) => {
        const data = record.get('posts')
        const owner = record.get('users')
        const likes = record.get('likes')
        const comments = record.get('comments')
        const shares = record.get('shares')
        const liked = record.get('liked')
        const tags = record.get('tagnames')
        return {
          id: data.identity['low'],
          content: data.properties['content'],
          postImageUrl: data.properties['imgUrl'],
          owner: owner.properties,
          likes: likes['low'],
          comments: comments['low'],
          shares: shares['low'],
          hasLiked: liked,
          code: data.properties['code'],
          tags: tags
        }
      })
      await session.close()
      return posts
    } catch (error) {
      console.log(error)
    }
  }
  const posts = await getPosts()
  return new Response(JSON.stringify(posts), { status: 200 })
}

export const POST = async (req) => {
  const { username, content, imgUrl, code, tagList } = await req.json()
  const tagIdList = tagList.map((tag) => tag.id)
  console.log(tagIdList)
  const driver = await connectToDB()
  const createPost = async () => {
    const session = driver.session()
    try {
      await session.executeWrite((tx) =>
        tx.run(
          `
            match (me: User {username: $username})
            create (p: Post {content: $content, imgUrl: $imgUrl, code: $code, createdTime: datetime()}) <-[:OWNS]- (me)
            with p
            unwind $tagIdList AS tagId
            match (t: Tag) where apoc.node.id(t) = tagId
            create (p) -[:HAS_TAGS]-> (t)
         `,
          {
            username: username,
            content: content,
            imgUrl: imgUrl,
            code: code,
            tagIdList: tagIdList,
          },
        ),
      )
      await session.close()
    } catch (error) {
      console.log(error)
    }
  }
  await createPost()
  return new Response({ message: 'created' }, { status: 201 })
}
