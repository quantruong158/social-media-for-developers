import { connectToDB } from '@/lib/database'
import { int } from 'neo4j-driver'

const getFeedPostsByUsername = async (username, email, page) => {
  const skip = (page - 1) * 5
  const driver = await connectToDB()
  try {
    const session = driver.session()
    const res = await session.executeWrite((tx) =>
      tx.run(
        `
        merge (me: User {username: $username, email: $email})
        with me
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
        
        skip $skip
        
        limit $limit
        `,
        {
          username,
          email,
          skip: int(skip),
          limit: int(5),
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

const getPostsByUsername = async (username, page) => {
  const skip = (page - 1) * 5
  console.log(`page here: ${page}`)
  const driver = await connectToDB()
  try {
    const session = driver.session()
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
        
        skip $skip
        
        limit $limit
        `,
        {
          username,
          skip: int(skip),
          limit: int(5),
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

const getPostById = async (postId) => {
  const driver = await connectToDB()
  try {
    const session = driver.session()
    const res = await session.executeRead((tx) =>
      tx.run(
        `
            MATCH (p:Post)
            WHERE apoc.node.id(p) = $id
            return p as post`,
        {
          id: postId,
        },
      ),
    )
    await session.close()
    return res.records[0].get('post').properties
  } catch (error) {
    console.log(error)
  }
}

const createPost = async (username, content, imgUrl, tagList, code) => {
  const driver = await connectToDB()
  try {
    const session = driver.session()
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
          tagIdList: tagList,
        },
      ),
    )
    await session.close()
  } catch (error) {
    console.log(error)
  }
}
const updatePostById = async (postId, content, imgUrl) => {
  const driver = await connectToDB()
  try {
    const session = driver.session()
    await session.executeWrite((tx) =>
      tx.run(
        `
            MATCH (p:Post)
            WHERE apoc.node.id(p) = $id
            SET p.content = $content, p.imgUrl = $imgUrl`,
        {
          id: postId,
          content: content,
          imgUrl: imgUrl,
        },
      ),
    )
    await session.close()
  } catch (error) {
    console.log(error)
  }
}
const deletePostById = async (postId) => {
  const driver = await connectToDB()
  try {
    const session = driver.session()
    await session.executeWrite((tx) =>
      tx.run(
        `
            MATCH (p:Post)
            WHERE apoc.node.id(p) = $id
            OPTIONAL MATCH (p)-[:HAS_COMMENTS]->(c:Comment)
            detach delete p, c`,
        {
          id: postId,
        },
      ),
    )
    await session.close()
  } catch (error) {
    console.log(error)
  }
}

const createLikeOnPost = async (username, postId) => {
  const driver = await connectToDB()
  try {
    const session = driver.session()
    await session.executeWrite((tx) =>
      tx.run(
        `match (u:User {username: $username})
               match (p:Post)
               where apoc.node.id(p) = $id
               create (u) -[:LIKES]-> (p)`,
        {
          username: username,
          id: postId,
        },
      ),
    )
    await session.close()
  } catch (error) {
    console.log(error)
  }
}
const deleteLikeOnPost = async (username, postId) => {
  const driver = await connectToDB()
  try {
    const session = driver.session()
    await session.executeWrite((tx) =>
      tx.run(
        `match (u:User {username: $username}) -[r:LIKES]-> (p:Post)
               where apoc.node.id(p) = $id
               delete r`,
        {
          username: username,
          id: postId,
        },
      ),
    )
    await session.close()
  } catch (error) {
    console.log(error)
  }
}

export {
  getFeedPostsByUsername,
  getPostsByUsername,
  getPostById,
  createPost,
  updatePostById,
  deletePostById,
  createLikeOnPost,
  deleteLikeOnPost,
}
