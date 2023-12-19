import { getFeedPostsByUsername } from '@/app/_repositories/PostRepo'

const getFeedPosts = async (username, page) => {
  return await getFeedPostsByUsername(username, page)
}

export { getFeedPosts }
