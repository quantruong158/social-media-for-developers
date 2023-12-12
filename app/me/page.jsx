import Feed from '@/components/Feed'
import { currentUser } from '@clerk/nextjs';

export const dynamic = 'force-dynamic'
export const revalidate = 0

const getPosts = async () => {
  const user = await currentUser();
  const res = await fetch(`http://localhost:3000/api/posts?username=${user.username}`, {
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
