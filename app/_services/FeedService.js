import { getFeedPostsByUsername } from '@/app/_repositories/PostRepo'

const getFeedPosts = async (username, email, page) => {
  return await getFeedPostsByUsername(username, email, page)
}

export { getFeedPosts }
