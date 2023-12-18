import { getFeedPostsByUsername } from '@/app/_repositories/PostRepo'

const getFeedPosts = async (username) => {
  return await getFeedPostsByUsername(username)
}

export { getFeedPosts }
