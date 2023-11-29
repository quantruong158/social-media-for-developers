import { connectToDB } from '@/utils/database'

export const GET = async (req, { params }) => {
  const postId = params.id
  console.log('postId', postId)
  const id = parseInt(postId)
  const driver = await connectToDB()
  const getPost = async () => {
    const session = driver.session()
    try {
      console.log('working')
      const res = await session.executeRead((tx) =>
        tx.run(
          `
            MATCH (p:Post)
            WHERE apoc.node.id(p) = $id
            return p as post`,
          {
            id: id,
          },
        ),
      )
      await session.close()
      console.log('bruh')
      const post = res.records[0].get('post').properties
      console.log(post)
      return post
    } catch (error) {
      console.log(error)
    }
  }
  const post = await getPost()
  return new Response(JSON.stringify(post), { status: 200 })
}
