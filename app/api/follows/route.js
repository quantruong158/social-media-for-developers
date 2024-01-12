import { followUser } from '@/app/_services/UserService'

export const POST = async (req) => {
  const { username, follower } = await req.json()

  try {
    await followUser(username, follower)
    return new Response(JSON.stringify({ message: 'created' }), { status: 201 })
  } catch (err) {
    console.error(err)
    return new Response(JSON.stringify({ message: `error ${err}` }), {
      status: 500,
    })
  }
}
