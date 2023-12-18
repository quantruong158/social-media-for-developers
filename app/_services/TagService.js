import * as tagRepo from '@/app/_repositories/TagRepo'

const searchTags = async (q) => {
  return await tagRepo.getSearchedTags(q)
}

const getPopularTags = async () => {
  return await tagRepo.getTags()
}

const addNewTag = async (tagName) => {
  return await tagRepo.createTag(tagName)
}

export { searchTags, getPopularTags, addNewTag }
