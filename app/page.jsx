import Feed from '@/components/Feed'
import { currentUser } from '@clerk/nextjs'
import { fetchFeedPosts } from '@/app/_actions/fetch-posts'
import LoadMore from '@/components/LoadMore'
import TrendingTagsCard from '@/components/TrendingTagsCard'
import { MyProfile } from '@/components/MyProfile'
import FollowRecommendation from '@/components/FollowRecommendation'

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
  console.log(user.emailAddresses[0].emailAddress)
  const posts = await fetchFeedPosts(
    user.username,
    user.emailAddresses[0].emailAddress,
    1,
  )
  return (
    <main className='mt-16 flex flex-col items-center justify-center'>
      <div className='left-10 top-20 hidden xl:fixed xl:block'>
        <TrendingTagsCard />
      </div>
      <div className='right-10 top-20 hidden max-h-screen space-y-3 xl:fixed xl:block'>
        <MyProfile />
        <FollowRecommendation username={user.username} />
      </div>

      <Feed username={user.username} posts={posts} />
      <LoadMore
        username={user.username}
        email={user.emailAddresses[0].emailAddress}
        fetchFn={fetchFeedPosts}
      />
    </main>
  )
}
