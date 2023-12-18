import Feed from '@/components/Feed'
import { auth, currentUser } from '@clerk/nextjs'

export const dynamic = 'force-dynamic'
export const revalidate = 0

export const getPosts = async () => {
  const user = await currentUser()
  const res = await fetch(`http://localhost:3000/api/feed/${user.username}`, {
    cache: 'no-store',
  })

  return await res.json()
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
          <h2 className='text-2xl font-semibold text-primary'>
            You&amp;re not signed in!
          </h2>
        </>
      )}
    </main>
  )
}
