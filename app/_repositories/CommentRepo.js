import { connectToDB } from '@/lib/database'

const getCommentsByPostId = async (postId) => {
  const driver = await connectToDB()
  const session = driver.session()
  try {
    const res = await session.executeRead((tx) =>
      tx.run(
        `match (p:Post) -[:HAS_COMMENTS]-> (c:Comment) <-[:COMMENTS]- (u:User)
               where apoc.node.id(p) = $id
               return c as comments, u as owner
               order by apoc.node.id(c) ASC`,
        {
          id: postId,
        },
      ),
    )
    if (res.records.length === 0) {
      return []
    }
    const comments = res.records.map((record) => {
      const comment = record.get('comments')
      const owner = record.get('owner')
      return {
        content: comment.properties['content'],
        owner: owner.properties,
      }
    })
    await session.close()
    return comments
  } catch (error) {
    console.log(error)
  }
}
const createComment = async (postId, username, content) => {
  const driver = await connectToDB()
  try {
    const session = driver.session()
    await session.executeWrite((tx) =>
      tx.run(
        `match (p: Post)
               where apoc.node.id(p) = $id
               match (u: User {username: $username})
               create (u) -[:COMMENTS]-> (c:Comment {content: $content}) <-[:HAS_COMMENTS]- (p)`,
        {
          id: postId,
          username: username,
          content: content,
        },
      ),
    )
    await session.close()
  } catch (error) {
    console.log(error)
  }
}

export { getCommentsByPostId, createComment }
