import PostCard from './PostCard'

const Feed = ({ username, posts }) => {
  return (
    <>
      {posts?.length > 0 && (
        <div className='flex w-[650px] flex-col items-center gap-6 rounded-xl px-4 py-3 md:px-10'>
          {posts?.map((post) => (
            <PostCard key={post.id} post={post} me={username} />
          ))}
        </div>
      )}
    </>
  )
}

export default Feed
