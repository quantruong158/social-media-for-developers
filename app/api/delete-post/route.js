import { connectToDB } from '@/utils/database'

export const DELETE = async (req) => {
  const { searchParams } = new URL(req.url)
  const postId = searchParams.get('postId')
  console.log(postId)
  const id = parseInt(postId)
  const driver = await connectToDB()
  const deletePost = async () => {
    const session = driver.session()
    try {
      await session.executeWrite((tx) =>
        tx.run(
          `
            MATCH (p:Post)
            WHERE apoc.node.id(p) = $id
            OPTIONAL MATCH (p)-[:HAS_COMMENTS]->(c:Comment)
            detach delete p, c`,
          {
            id: id,
          },
        ),
      )
      await session.close()
    } catch (error) {
      console.log(error)
    }
  }
  await deletePost()
  return new Response({ message: 'deleted' }, { status: 200 })
}
