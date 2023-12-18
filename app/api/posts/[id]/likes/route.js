import { likeOrDislikePost } from '@/app/_services/PostInteractionService'

export const POST = async (req, { params }) => {
  const { username, liked } = await req.json()
  const id = parseInt(params.id)

  try {
    await likeOrDislikePost(username, id, liked)
    return new Response(JSON.stringify({ message: 'created' }), { status: 201 })
  } catch (err) {
    console.error(err)
    return new Response(JSON.stringify({ message: `error ${err}` }), {
      status: 500,
    })
  }
}
