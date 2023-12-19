import Feed from '@/components/Feed'
import { currentUser } from '@clerk/nextjs'
import { fetchFeedPosts } from '@/app/_actions/fetch-posts'
import LoadMore from '@/components/LoadMore'

export const dynamic = 'force-dynamic'
export const revalidate = 0

export default async function Home() {
  const user = await currentUser()
  if (!user) {
    return (
      <main className='mt-16 flex flex-col items-center justify-center'>
        <h2 className='text-2xl font-semibold text-primary'>
          You&#39;re not signed in!
        </h2>
      </main>
    )
  }
  const posts = await fetchFeedPosts(user.username, 1)
  return (
    <main className='mt-16 flex flex-col items-center justify-center'>
      <Feed username={user.username} posts={posts} />
      <LoadMore username={user.username} fetchFn={fetchFeedPosts} />
    </main>
  )
}
