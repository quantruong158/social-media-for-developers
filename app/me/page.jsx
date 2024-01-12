import Feed from '@/components/Feed'
import { currentUser } from '@clerk/nextjs'
import { fetchUserPosts } from '@/app/_actions/fetch-posts'
import LoadMore from '@/components/LoadMore'

export const dynamic = 'force-dynamic'
export const revalidate = 0

const MePage = async () => {
  const user = await currentUser()
  const posts = await fetchUserPosts(user.username, 1)
  return (
    <main className='mt-16 flex flex-col items-center justify-center'>
      <Feed username={user.username} posts={posts} />
      <LoadMore
        username={user.username}
        email={user.emailAddresses[0].emailAddress}
        fetchFn={fetchUserPosts}
        self={true}
      />
    </main>
  )
}

export default MePage
