import * as tagService from '@/app/_services/TagService'

export const GET = async (req) => {
  const { searchParams } = new URL(req.url)
  const q = searchParams.get('q')
  const tags = q
    ? await tagService.searchTags(q)
    : await tagService.getPopularTags()
  return new Response(JSON.stringify(tags), { status: 200 })
}

export const POST = async (req) => {
  const { tagName } = await req.json()
  const tag = await tagService.addNewTag(tagName)
  return new Response(JSON.stringify(tag), { status: 201 })
}
