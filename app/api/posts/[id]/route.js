import * as PostService from '@/app/_services/PostService'

export const GET = async (req, { params }) => {
  const postId = params.id
  const id = parseInt(postId)
  try {
    const post = await PostService.getAPost(id)
    return new Response(JSON.stringify(post), { status: 200 })
  } catch (err) {
    console.error(err)
    return new Response(JSON.stringify({ message: `error ${err}` }), {
      status: 500,
    })
  }
}

export const DELETE = async (req, { params }) => {
  const postId = params.id
  const id = parseInt(postId)

  try {
    await PostService.deletePost(id)
    return new Response(JSON.stringify({ message: 'OK' }), { status: 200 })
  } catch (err) {
    console.error(err)
    return new Response(JSON.stringify({ message: `error ${err}` }), {
      status: 500,
    })
  }
}

export const PATCH = async (req, { params }) => {
  const postId = params.id
  const id = parseInt(postId)
  const { content, imgUrl } = await req.json()

  try {
    await PostService.updatePost(id, content, imgUrl)
    return new Response(JSON.stringify({ message: 'OK' }), { status: 200 })
  } catch (err) {
    console.error(err)
    return new Response(JSON.stringify({ message: `error ${err}` }), {
      status: 500,
    })
  }
}
