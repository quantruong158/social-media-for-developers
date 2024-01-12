import { getFeedPosts } from '@/app/_services/FeedService'

export const GET = async (req, { params }) => {
  const username = params.username
  const { searchParams } = new URL(req.url)
  const page = parseInt(searchParams.get('page'))
  const email = searchParams.get('email')
  try {
    const posts = await getFeedPosts(username, email, page)
    return new Response(JSON.stringify(posts), { status: 200 })
  } catch (err) {
    console.error(err)
    return new Response(JSON.stringify({ message: `error ${err}` }), {
      status: 500,
    })
  }
}
