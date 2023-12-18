import * as CommentRepo from '@/app/_repositories/CommentRepo'
import {
  createLikeOnPost,
  deleteLikeOnPost,
} from '@/app/_repositories/PostRepo'

const getComments = async (postId) => {
  return await CommentRepo.getCommentsByPostId(postId)
}

const createComment = async (postId, username, content) => {
  return await CommentRepo.createComment(postId, username, content)
}

const likeOrDislikePost = async (username, postId, liked) => {
  return liked
    ? await deleteLikeOnPost(username, postId)
    : await createLikeOnPost(username, postId)
}

export { getComments, createComment, likeOrDislikePost }
