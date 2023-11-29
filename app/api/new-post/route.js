import { connectToDB } from '@/utils/database'

export const POST = async (req) => {
  const { username, content, imgUrl } = await req.json()
  const driver = await connectToDB()
  const createPost = async () => {
    const session = driver.session()
    try {
      await session.executeWrite((tx) =>
        tx.run(
          `
            match (me: User {username: $username})
            create (p: Post {content: $content, imgUrl: $imgUrl, createdTime: datetime()}) <-[:OWNS]- (me)
         `,
          {
            username: username,
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
  await createPost()
  return new Response({ message: 'created' }, { status: 201 })
}
