import { connectToDB } from '@/utils/database'

export const POST = async (req, { params }) => {
  const { username, liked } = await req.json()
  const id = parseInt(params.id)
  console.log(username, id)
  const driver = await connectToDB()
  const likePost = async () => {
    const session = driver.session()
    try {
      await session.executeWrite((tx) =>
        tx.run(
          !liked
            ? `
          match (u:User {username: $username})
          match (p:Post)
          where apoc.node.id(p) = $id
          create (u) -[:LIKES]-> (p)`
            : `
          match (u:User {username: $username}) -[r:LIKES]-> (p:Post)
          where apoc.node.id(p) = $id
          delete r
  
          `,
          {
            username: username,
            id: id,
          },
        ),
      )
      console.log("success")
      await session.close()
    } catch (error) {
      console.log(error)
    }
  }
  await likePost()
  return new Response({ message: 'created' }, { status: 201 })
}
