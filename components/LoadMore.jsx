'use client'

import { useEffect, useState } from 'react'
import { useInView } from 'react-intersection-observer'
import Spinner from '@/components/Spinner'
import Feed from '@/components/Feed'
import Link from 'next/link'

const LoadMore = ({ username, email, fetchFn, self }) => {
  const [posts, setPosts] = useState([])
  const [pagesLoaded, setPagesLoaded] = useState(1)
  const [noMorePosts, setNoMorePosts] = useState(false)
  const { ref, inView } = useInView()
  const loadMorePosts = async () => {
    const nextPage = pagesLoaded + 1

    const newPosts = self
      ? await fetchFn(username, nextPage)
      : await fetchFn(username, email, nextPage)
    if (newPosts?.length === 0) {
      setNoMorePosts(true)
      return
    }
    setPosts((prev) => [...prev, ...newPosts])
    setPagesLoaded(nextPage)
  }
  useEffect(() => {
    if (inView) {
      console.log('Scrolled to the end')
      loadMorePosts()
    }
  }, [inView])
  return (
    <>
      <Feed username={username} posts={posts} />
      {!noMorePosts ? (
        <div className='flex items-center justify-center p-4' ref={ref}>
          <Spinner />
        </div>
      ) : (
        <div className='mb-3 flex h-14 w-[650px] items-center justify-center rounded-xl bg-secondary'>
          {self ? (
            <p className='font-semibold text-black'>End of posts!</p>
          ) : (
            <p className='font-semibold text-black'>
              You have no more posts to view,{' '}
              <Link href='/follow' className='font-extrabold text-primary'>
                FOLLOW
              </Link>{' '}
              more users to see more!
            </p>
          )}
        </div>
      )}
    </>
  )
}

export default LoadMore
