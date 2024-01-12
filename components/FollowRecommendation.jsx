'use client'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import Link from 'next/link'
import { Button, buttonVariants } from '@/components/ui/button'
import { ScrollArea } from '@/components/ui/scroll-area'
import { cn } from '@/lib/utils'
import { useEffect, useState } from 'react'
import Image from 'next/image'

const FollowRecommendation = ({ username }) => {
  const [recommendations, setRecommendations] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const handleFollow = async (follower) => {
    try {
      const res = await fetch(`/api/follows`, {
        method: 'POST',
        body: JSON.stringify({
          username,
          follower,
        }),
        headers: {
          'Content-Type': 'application/json',
        },
      })
      setRecommendations((prev) =>
        prev.filter((user) => user.username !== follower),
      )
    } catch (err) {
      console.error(err)
    }
  }

  useEffect(() => {
    const getRecommendations = async () => {
      const res = await fetch(`/api/users?username=${username}`)
      const data = await res.json()
      console.log(data)
      setRecommendations(data)
      setIsLoading(false)
    }
    getRecommendations()
  }, [])
  return (
    <Card className='mx-auto w-full min-w-[300px] max-w-[350px] border-2 border-primary'>
      <CardHeader>
        <h1 className='text-2xl font-bold text-primary'>Users you may like</h1>
      </CardHeader>
      <CardContent className='h-full p-4'>
        <ScrollArea className='flex h-[280px] flex-col gap-3 pr-5'>
          <div className='flex flex-col gap-2'>
            {isLoading ? (
              <div className='flex animate-pulse gap-2'>Loading...</div>
            ) : (
              recommendations.map((user) => (
                <div
                  key={user.username}
                  className='group relative overflow-hidden rounded-lg'
                >
                  <div className='bg-secondary p-3 group-hover:bg-secondary/90'>
                    <div className='flex gap-2 text-xl'>
                      {user.imgUrl?.length > 0 ? (
                        <Image
                          className='rounded-full'
                          src={user.imgUrl}
                          width={50}
                          height={50}
                          alt='avatar'
                        />
                      ) : (
                        <div className='h-[50px] w-[50px] rounded-full bg-white' />
                      )}
                      <div>
                        <p className='flex gap-2 text-lg font-semibold'>
                          {user.username}
                        </p>
                        <p className='text-xs text-slate-600 dark:text-slate-400'>
                          {user.email}
                        </p>
                      </div>
                    </div>
                    <Link
                      className={buttonVariants({ variant: 'link' })}
                      href={`/u/${user.username}`}
                    >
                      View this user&apos;s feed
                    </Link>
                    <Button
                      className='w-full'
                      onClick={() => handleFollow(user.username)}
                    >
                      Follow
                    </Button>
                  </div>
                </div>
              ))
            )}
          </div>
          <Link
            href='/follow'
            className={cn(
              buttonVariants({ variant: 'default' }),
              'mt-3 w-full',
            )}
          >
            See more
          </Link>
        </ScrollArea>
      </CardContent>
    </Card>
  )
}

export default FollowRecommendation
