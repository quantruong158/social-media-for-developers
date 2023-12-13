'use client'

import Image from 'next/image'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Dialog, DialogTrigger } from '@/components/ui/dialog'
import { buttonVariants } from './ui/button'
import { Button } from './ui/button'
import { cn } from '@/lib/utils'
import { ThumbsUpIcon } from 'lucide-react'
import { MessagesSquareIcon } from 'lucide-react'
import { Repeat2Icon } from 'lucide-react'
import { useState, useEffect } from 'react'
import CommentSection from './CommentSection'
import ConfigurePost from './ConfigurePost'
import CodeView from './CodeView'

const PostCard = ({ post, me, isPreview }) => {
  const {
    id,
    owner,
    content,
    likes,
    comments,
    shares,
    time,
    postImageUrl,
    hasLiked,
    code,
    tags,
  } = post
  const [liked, setLiked] = useState(hasLiked)
  const [virtualLikes, setVirtualLikes] = useState(likes)
  const [copyState, setCopyState] = useState(false)
  useEffect(() => {
    if (copyState) {
      setTimeout(() => {
        setCopyState((prev) => !prev)
      }, 3000)
    }
  }, [copyState])
  const handleLike = async (e) => {
    e.preventDefault()
    if (!liked) {
      setVirtualLikes((prev) => prev + 1)
    } else {
      setVirtualLikes((prev) => prev - 1)
    }
    const prevLiked = liked
    setLiked((prev) => !prev)
    try {
      console.log('bruh')
      const res = await fetch(`/api/posts/${id}/likes`, {
        method: 'POST',
        body: JSON.stringify({
          username: me,
          liked: prevLiked,
        }),
      })
      if (!res.ok) {
        throw new Error('ERROR')
      } else {
        console.log('success')
      }
    } catch (err) {
      console.error(err)
    }
  }

  return (
    <Card className='relative h-fit w-full border-none bg-secondary/20'>
      {!isPreview && <ConfigurePost id={id} owner={owner} me={me} />}
      <CardHeader className='flex-row gap-2 p-3'>
        {owner.imgUrl?.length > 0 ? (
          <Image
            className='rounded-full'
            src={owner.imgUrl}
            width={50}
            height={50}
            alt='avatar'
          />
        ) : (
          <div className='h-[50px] w-[50px] rounded-full bg-white' />
        )}

        <div>
          <CardTitle className='flex gap-2 text-xl'>
            <p>{owner.username}</p>
            {tags.map((tag) => (
              <div key={tag} className='flex items-center gap-1'>
                <div className='w-fit rounded-full bg-primary px-2 text-xs text-white'>
                  {tag}
                </div>
              </div>
            ))}
          </CardTitle>
          <CardDescription className='text-xs text-slate-600 dark:text-slate-400'>
            {owner.email}
          </CardDescription>
        </div>
      </CardHeader>

      <CardContent className='pb-2'>
        <p>{content}</p>
      </CardContent>

      {code?.length > 0 && (
        <div className='group relative mt-2 h-fit'>
          <button
            className='absolute right-5 top-3 z-[12] hidden h-9 w-9 items-center justify-center rounded-xl bg-primary text-white group-hover:flex'
            onClick={() => {
              setCopyState(true)
              navigator.clipboard.writeText(code)
            }}
          >
            {copyState ? (
              <svg
                xmlns='http://www.w3.org/2000/svg'
                width='24'
                height='24'
                viewBox='0 0 24 24'
                fill='none'
                stroke='currentColor'
                strokeWidth='2'
                strokeLinecap='round'
                strokeLinejoin='round'
                className='lucide lucide-check'
              >
                <path d='M20 6 9 17l-5-5' />
              </svg>
            ) : (
              <svg
                xmlns='http://www.w3.org/2000/svg'
                width='24'
                height='24'
                viewBox='0 0 24 24'
                fill='none'
                stroke='currentColor'
                strokeWidth='2'
                strokeLinecap='round'
                strokeLinejoin='round'
                className='lucide lucide-clipboard'
              >
                <rect width='8' height='4' x='8' y='2' rx='1' ry='1' />
                <path d='M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2' />
              </svg>
            )}
          </button>
          <CodeView code={code} />
        </div>
      )}

      {postImageUrl.length > 0 && (
        <div className='relative mt-2 flex w-full items-center justify-center'>
          <Image
            className='h-full w-full'
            src={postImageUrl}
            width={2000}
            height={2000}
            alt='avatar'
          />
        </div>
      )}

      <CardFooter className='mt-1 justify-end pb-0 pr-4 text-sm text-slate-600 dark:text-slate-400'>
        <p>&#183; {time} minutes ago</p>
      </CardFooter>

      <div className='mx-4 flex items-center justify-between gap-1'>
        <p className='text-sm font-semibold text-primary'>
          {virtualLikes} likes
        </p>
        <div className='flex items-center gap-1'>
          <p className='text-sm font-semibold text-primary'>
            {comments} comments
          </p>
          <p className='text-sm font-semibold text-primary'>{shares} shares</p>
        </div>
      </div>

      <div className='m-3 flex items-center justify-center gap-1'>
        <Button
          disabled={isPreview}
          className={cn(
            'w-1/3 gap-2 bg-secondary/20 dark:text-white',
            `${liked ? 'bg-primary font-semibold' : undefined} `,
          )}
          onClick={handleLike}
        >
          <ThumbsUpIcon width={15} />
          {!liked ? 'Like' : 'Liked'}
        </Button>

        <Dialog>
          <DialogTrigger
            disabled={isPreview}
            className={cn(
              buttonVariants({ variant: 'default' }),
              'w-1/3 gap-2 bg-secondary/20 dark:text-white',
            )}
          >
            <MessagesSquareIcon width={15} />
            Comment
          </DialogTrigger>
          <CommentSection username={owner.username} postId={id} me={me} />
        </Dialog>

        <Button
          disabled={isPreview}
          className='w-1/3 gap-2 bg-secondary/20 dark:text-white'
        >
          <Repeat2Icon width={15} />
          Share
        </Button>
      </div>
    </Card>
  )
}

export default PostCard
