import { connectToDB } from '@/utils/database'

export const PATCH = async (req) => {
  const { id, content, imgUrl } = await req.json()
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
