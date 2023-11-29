import { connectToDB } from '@/utils/database'

export const GET = async (req) => {
  const { searchParams } = new URL(req.url)
  const username = searchParams.get('username')
  const postId = searchParams.get('postId')
  const id = parseInt(postId)
  console.log(username, id)
  const driver = await connectToDB()
  const getLiked = async () => {
    const session = driver.session()
    try {
      const res = await session.executeRead((tx) =>
        tx.run(
          `
        match (u:User {username: $username})
        match (p:Post)
        where apoc.node.id(p) = $id
        return exists((u) -[:LIKES]-> (p)) as liked`,
          {
            username: username,
            id: id,
          },
        ),
      )
      await session.close()
      return res.records[0].get('liked')
    } catch (error) {
      consAole.log(error)
    }
  }
  const liked = await getLiked()
  return new Response(JSON.stringify(liked), { status: 200 })
}
export const POST = async (req) => {
  const { username, postId, liked } = await req.json()
  const id = parseInt(postId)
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
      await session.close()
    } catch (error) {
      console.log(error)
    }
  }
  await likePost()
  return new Response({ message: 'created' }, { status: 201 })
}
