import { getFeedPosts } from '@/app/_services/FeedService'

export const GET = async (req, { params }) => {
  const username = params.username
  try {
    const posts = await getFeedPosts(username)
    return new Response(JSON.stringify(posts), { status: 200 })
  } catch (err) {
    console.error(err)
    return new Response(JSON.stringify({ message: `error ${err}` }), {
      status: 500,
    })
  }
}
