import { connectToDB } from '@/utils/database'

export const GET = async (req, { params }) => {
  const id = params.id
  const postId = parseInt(id)
  const driver = await connectToDB()
  const getComments = async () => {
    const session = driver.session()
    try {
      const res = await session.executeRead((tx) =>
        tx.run(
          `
            match (p:Post) -[:HAS_COMMENTS]-> (c:Comment) <-[:COMMENTS]- (u:User)
            where apoc.node.id(p) = $id
            return c as comments, u as owner
          `,
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
  const comments = await getComments()
  return new Response(JSON.stringify(comments), { status: 200 })
}
export const POST = async (req, { params }) => {
  const id = params.id
  const postId = parseInt(id)
  const { username, content } = await req.json()
  console.log(id, username, content)
  const driver = await connectToDB()
  const createComment = async () => {
    const session = driver.session()
    try {
      await session.executeWrite((tx) =>
        tx.run(
          `
          match (p: Post)
          where apoc.node.id(p) = $id
          match (u: User {username: $username})
          create (u) -[:COMMENTS]-> (c:Comment {content: $content}) <-[:HAS_COMMENTS]- (p)
          `,
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
  await createComment()
  return new Response({ message: 'created' }, { status: 201 })
}
