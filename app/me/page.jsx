import Feed from '@/components/Feed'
import { auth } from '@clerk/nextjs'

export const dynamic = 'force-dynamic'
export const revalidate = 0

const getPosts = async () => {
  const { userId } = auth()
  const res = await fetch(`http://localhost:3000/api/posts/${userId}`, {
    cache: 'no-store',
  })
  const posts = await res.json()
  return posts
}

const MePage = async () => {
  const posts = await getPosts()
  return (
    <main className='mt-16 flex justify-center'>
      <Feed posts={posts} />
    </main>
  )
}

export default MePage
