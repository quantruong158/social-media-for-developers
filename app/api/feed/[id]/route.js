import { connectToDB } from '@/utils/database'
import { clerkClient } from '@clerk/nextjs'

export const GET = async (req, { params }) => {
  const id = params.id
  const user = await clerkClient.users.getUser(id)
  const driver = await connectToDB()
  const getPosts = async () => {
    const session = driver.session()
    try {
      const res = await session.executeRead((tx) =>
        tx.run(
          `
        match (me: User {username: $username})
        match (me) -[:FOLLOWS]-> (u:User) -[:OWNS]-> (p:Post)

        optional match (p) <-[lk:LIKES]- (:User)

        with p, count(lk) as likes, u, me
        optional match (p) -[cm:HAS_COMMENTS]-> (:Comment)

        with p, likes, u, me, count(cm) as comments
        optional match (p) <-[sr:SHARES]- (:User)

        with p, likes, u, me, comments, count(sr) as shares
        optional match (p) -[:HAS_TAGS]-> (t :Tag)

        return p as posts, u as users, likes, comments, shares, exists((me) -[:LIKES]-> (p)) as liked, collect(t.value) as tagnames
        
        order by p.createdTime desc
        `,
          {
            username: user.username,
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
          tags: tags,
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
