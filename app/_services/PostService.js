import * as PostRepo from '@/app/_repositories/PostRepo'

const getPosts = async (username, page) => {
  return await PostRepo.getPostsByUsername(username, page)
}

const getAPost = async (postId) => {
  return await PostRepo.getPostById(postId)
}

const createPost = async (username, content, imgUrl, tagList, code) => {
  await PostRepo.createPost(username, content, imgUrl, tagList, code)
}
const updatePost = async (postId, content, imgUrl) => {
  await PostRepo.updatePostById(postId, content, imgUrl)
}

const deletePost = async (postId) => {
  await PostRepo.deletePostById(postId)
}

export { getPosts, getAPost, createPost, updatePost, deletePost }
