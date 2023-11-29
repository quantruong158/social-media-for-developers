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
import { useState } from 'react'
import CommentSection from './CommentSection'
import ConfigurePost from './ConfigurePost'
const PostCard = ({ post, me }) => {
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
  } = post
  const [liked, setLiked] = useState(hasLiked)
  const [virtualLikes, setVirtualLikes] = useState(likes)
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
      const res = await fetch('/api/like-post', {
        method: 'POST',
        body: JSON.stringify({
          username: me,
          postId: id,
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
      <ConfigurePost id={id} owner={owner} me={me}/>
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
          <div className='h-[50px] w-[50px] bg-white rounded-full'/>
        )}

        <div>
          <CardTitle className='text-xl'>{owner.username}</CardTitle>
          <CardDescription className='text-xs text-slate-600 dark:text-slate-400'>
            {owner.email}
          </CardDescription>
        </div>
      </CardHeader>

      <CardContent className='pb-2'>
        <p>{content}</p>
      </CardContent>

      {postImageUrl.length > 0 && (
        <div className='relative flex w-full items-center justify-center'>
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
            className={cn(
              buttonVariants({ variant: 'default' }),
              'w-1/3 gap-2 bg-secondary/20 dark:text-white',
            )}
          >
            <MessagesSquareIcon width={15} />
            Comment
          </DialogTrigger>
          <CommentSection username={owner.username} postId={id} me={me}/>
        </Dialog>

        <Button className='w-1/3 gap-2 bg-secondary/20 dark:text-white'>
          <Repeat2Icon width={15} />
          Share
        </Button>
      </div>
    </Card>
  )
}

export default PostCard
