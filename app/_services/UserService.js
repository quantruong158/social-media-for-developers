import * as UserRepo from '@/app/_repositories/UserRepo'

const getRecommendUser = async (username) => {
  return await UserRepo.getRecommendUser(username)
}

const followUser = async (username, follower) => {
  return await UserRepo.followUser(username, follower)
}

const unfollowUser = async (username, follower) => {
  return await UserRepo.unfollowUser(username, follower)
}

export { getRecommendUser, followUser, unfollowUser }
