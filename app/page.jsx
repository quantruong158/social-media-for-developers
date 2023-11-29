import Feed from '@/components/Feed'
import { auth } from '@clerk/nextjs'

export const dynamic = 'force-dynamic'
export const revalidate = 0

export const getPosts = async () => {
  const { userId } = auth()
  const res = await fetch(`http://localhost:3000/api/feed/${userId}`, {
    cache: 'no-store',
  })
  const posts = await res.json()
  console.log(posts)
  return posts
}

export default async function Home() {
  const { userId } = auth()
  const posts = userId ? await getPosts() : {}
  return (
    <main className='mt-16 flex justify-center'>
      {userId ? (
        <Feed posts={posts} />
      ) : (
        <>
          <p>You're not signed in</p>
        </>
      )}
    </main>
  )
}
