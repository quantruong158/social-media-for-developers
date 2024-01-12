import * as UserService from '@/app/_services/UserService'

export const GET = async (req) => {
  const { searchParams } = new URL(req.url)
  const username = searchParams.get('username')
  const users = await UserService.getRecommendUser(username)
  return new Response(JSON.stringify(users), { status: 200 })
}
