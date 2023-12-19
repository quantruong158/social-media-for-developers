import Feed from '@/components/Feed'
import { auth, currentUser } from '@clerk/nextjs'
import { fetchFeedPosts } from '@/app/_actions/fetch-posts'
import LoadMore from '@/components/LoadMore'

export const dynamic = 'force-dynamic'
export const revalidate = 0

export default async function Home() {
  const { userId } = auth()
  const user = await currentUser()
  const posts = await fetchFeedPosts(user.username, 1)
  return (
    <main className='mt-16 flex flex-col items-center justify-center'>
      {userId ? (
        <>
          <Feed username={user.username} posts={posts} />
          <LoadMore username={user.username} fetchFn={fetchFeedPosts} />
        </>
      ) : (
        <h2 className='text-2xl font-semibold text-primary'>
          You&amp;re not signed in!
        </h2>
      )}
    </main>
  )
}
