import { connectToDB } from '@/utils/database'

export const GET = async (req, { params }) => {
  const postId = params.id
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

export const DELETE = async (req, {params}) => {
  const postId = params.id
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

export const PATCH = async (req, {params}) => {
  const postId = params.id
  const id = parseInt(postId)
  const { content, imgUrl } = await req.json()
  const driver = await connectToDB()
  const updatePost = async () => {
    const session = driver.session()
    try {
      await session.executeWrite((tx) =>
        tx.run(
          `
            MATCH (p:Post)
            WHERE apoc.node.id(p) = $id
            SET p.content = $content, p.imgUrl = $imgUrl`,
          {
            id: id,
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
  await updatePost()
  return new Response({ message: 'updated' }, { status: 200 })
}
