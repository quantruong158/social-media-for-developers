'use client'

import { SendHorizonalIcon } from 'lucide-react'
import { Button } from './ui/button'
import { DialogContent, DialogHeader, DialogTitle } from './ui/dialog'
import { Input } from './ui/input'
import { ScrollArea } from './ui/scroll-area'
import { useState } from 'react'
import { useUser } from '@clerk/nextjs'
import { useRef } from 'react'
import Comment from './Comment'

const CommentSection = ({ username, postId, me }) => {
  const inputRef = useRef()
  const { user } = useUser()
  const [comments, setComments] = useState(null)
  const [content, setContent] = useState('')
  const getComments = async () => {
    try {
      const res = await fetch(`/api/posts/${postId}/comments`)
      if (!res.ok) {
        throw new Error('Error')
      }
      const data = await res.json()
      setComments(data)
    } catch (err) {
      console.error(err)
    }
  }
  const handleComment = async (e) => {
    e.preventDefault()
    try {
      const res = await fetch(`/api/posts/${postId}/comments`, {
        method: 'POST',
        body: JSON.stringify({
          postId: postId,
          username: me,
          content: content,
        }),
      })
      if (!res.ok) {
        throw new Error('Error')
      }
      setComments([
        ...comments,
        {
          owner: {
            username: user.username,
            email: user.emailAddresses[0].emailAddress,
            imgUrl: user.imageUrl,
          },
          content: content,
        },
      ])
      inputRef.current.value = ''
    } catch (err) {
      console.error(err)
    }
  }
  return (
    <DialogContent
      onOpenAutoFocus={getComments}
      className='bottom-0 left-[50%] top-auto flex h-[90%] max-w-2xl translate-x-[-50%] translate-y-0 flex-col border-2 border-primary p-3 sm:left-[50%] sm:top-[50%] sm:h-[70%] sm:translate-x-[-50%] sm:translate-y-[-50%]'
    >
      <DialogHeader>
        <DialogTitle className='text-center text-primary'>
          Comments on {username}&apos;s post
        </DialogTitle>
      </DialogHeader>

      <ScrollArea className='flex h-full flex-col gap-3'>
        <div className='flex flex-col gap-2'>
          {!comments ? (
            <h2 className='text-center text-foreground'>Loading...</h2>
          ) : comments.length === 0 ? (
            <h2 className='text-center text-foreground'>
              No comments on this post
            </h2>
          ) : (
            comments.map((comment) => (
              <Comment key={comment.owner.username} comment={comment} />
            ))
          )}
        </div>
      </ScrollArea>
      <form
        className='flex items-center gap-2'
        onSubmit={(e) => handleComment(e)}
      >
        <Input
          ref={inputRef}
          placeholder='Place your comment here'
          className='border-2 border-primary focus:outline-none'
          onChange={(e) => setContent(e.target.value)}
        />
        <Button className='text-white' type='submit'>
          <SendHorizonalIcon width={16} />
        </Button>
      </form>
    </DialogContent>
  )
}

export default CommentSection
