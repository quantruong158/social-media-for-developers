import * as PostService from '@/app/_services/PostService'

export const GET = async (req) => {
  const { searchParams } = new URL(req.url)
  const username = searchParams.get('username')
  const page = parseInt(searchParams.get('page'))
  try {
    const posts = await PostService.getPosts(username, page)
    return new Response(JSON.stringify(posts), { status: 200 })
  } catch (err) {
    console.error(err)
    return new Response(JSON.stringify({ message: `error ${err}` }), {
      status: 500,
    })
  }
}

export const POST = async (req) => {
  const { username, content, imgUrl, code, tagList } = await req.json()
  const tagIdList = tagList.map((tag) => tag.id)

  try {
    await PostService.createPost(username, content, imgUrl, tagIdList, code)
    return new Response(JSON.stringify({ message: 'created' }), { status: 201 })
  } catch (err) {
    console.error(err)
    return new Response(JSON.stringify({ message: `error ${err}` }), {
      status: 500,
    })
  }
}
