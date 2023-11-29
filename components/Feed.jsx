import PostCard from './PostCard'
import { currentUser } from '@clerk/nextjs'

const Feed = async ({ posts }) => {
  const user = await currentUser()
  
  return (
    <div className='flex h-screen w-[650px] flex-col items-center gap-6 rounded-xl p-4 md:p-10'>
      {posts.map((post) => (
        <PostCard
          key={post.id}
          post={post}
          me={user.username}
        />
      ))}
    </div>
  )
}

export default Feed
