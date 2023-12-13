import { connectToDB } from '@/utils/database'
import { clerkClient } from '@clerk/nextjs'

export const GET = async (req) => {
  const { searchParams } = new URL(req.url)
  const q = searchParams.get('q')
  const driver = await connectToDB()
  const getTags = async () => {
    const session = driver.session()
    try {
      let res
      if (q === null) {
        res = await session.executeRead((tx) =>
          tx.run(`
                      match (t: Tag)
                      return t as tags
                      limit 5
                  `),
        )
      } else {
        res = await session.executeRead((tx) =>
          tx.run(
            `
                      match (t: Tag)
                      where t.value =~ $query + '.*'
                      return t as tags
                  `,
            {
              query: q,
            },
          ),
        )
      }

      if (res.records.length === 0) {
        return []
      }
      const tags = res.records.map((record) => {
        const tag = record.get('tags')
        return {
          id: tag.identity['low'],
          value: tag.properties['value'],
        }
      })
      await session.close()
      return tags
    } catch (error) {
      console.log(error)
    }
  }
  const tags = await getTags()
  return new Response(JSON.stringify(tags), { status: 200 })
}

export const POST = async (req) => {
  const { username, content, imgUrl, code } = await req.json()
  const driver = await connectToDB()
  const createPost = async () => {
    const session = driver.session()
    try {
      await session.executeWrite((tx) =>
        tx.run(
          `
            match (me: User {username: $username})
            create (p: Post {content: $content, imgUrl: $imgUrl, code: $code, createdTime: datetime()}) <-[:OWNS]- (me)
         `,
          {
            username: username,
            content: content,
            imgUrl: imgUrl,
            code: code,
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
