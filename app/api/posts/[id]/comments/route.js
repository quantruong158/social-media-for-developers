import * as PostInteractionService from '@/app/_services/PostInteractionService'

export const GET = async (req, { params }) => {
  const id = params.id
  const postId = parseInt(id)

  try {
    const comments = await PostInteractionService.getComments(postId)
    return new Response(JSON.stringify(comments), { status: 200 })
  } catch (err) {
    return new Response(JSON.stringify({ message: `error: ${err}` }), {
      status: 500,
    })
  }
}
export const POST = async (req, { params }) => {
  const id = params.id
  const postId = parseInt(id)
  const { username, content } = await req.json()

  try {
    await PostInteractionService.createComment(postId, username, content)
    return new Response(JSON.stringify({ message: 'created' }), { status: 201 })
  } catch (err) {
    console.error(err)
    return new Response(JSON.stringify({ message: `error ${err}` }), {
      status: 500,
    })
  }
}
