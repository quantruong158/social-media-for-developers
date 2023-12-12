'use client'

import { cn } from '@/lib/utils'
import { Button, buttonVariants } from '@/components/ui/button'
import UploadDnD from '@/components/UploadDnD'
import { Dialog, DialogTrigger, DialogContent } from '@/components/ui/dialog'
import { Textarea } from '@/components/ui/textarea'
import Image from 'next/image'
import { useState } from 'react'
import { useRef } from 'react'
import PostCard from './PostCard'
import { ScrollArea } from './ui/scroll-area'
import { useRouter } from 'next/navigation'
import PostTag from './PostTag'
import CodeEditor from './CodeEditor'


const CreatePost = ({ user }) => {
  const router = useRouter()
  const textRef = useRef()
  const [code, setCode] = useState('')
  const [imgUrl, setImgUrl] = useState('')
  const [tagList, setTagList] = useState([]);
  const [post, setPost] = useState({
    id: 0,
    owner: {
      username: user.username,
      email: user.email,
      imgUrl: user.imgUrl,
    },
    content: '',
    likes: 0,
    comments: 0,
    shares: 0,
    time: 0,
    postImageUrl: '',
    hasLiked: false,
    code: '',
  })
  const handleCreate = async (e) => {
    e.preventDefault()
    try {
      const res = await fetch('/api/posts', {
        method: 'POST',
        body: JSON.stringify({
          username: user.username,
          content: post.content,
          imgUrl: post.postImageUrl,
          code: post.code,
        }),
      })
      if (!res.ok) {
        throw new Error('ERROR')
      } else {
        console.log('success')
        router.refresh()
        router.push('/me')
      }
    } catch (err) {
      console.error(err)
    }
  }
  const isEmpty = () => {
    return imgUrl === '' && post.content === '' && post.code === ''
  }
  return (
    <main className='mb-5 mt-20 flex justify-center'>
      <section className='flex w-full flex-col justify-center gap-5 px-5 md:h-[70vh] lg:w-[1024px]'>
        <div className='relative h-[200px] w-full'>
          <Textarea
            onChange={(e) => setPost({ ...post, content: e.target.value })}
            placeholder='Place your content here'
            className='h-full border-primary text-lg focus-visible:ring-1 focus-visible:ring-ring focus-visible:ring-offset-1 md:h-full'
            ref={textRef}
          />
          {imgUrl.length > 0 && (
            <div className='absolute bottom-4 right-8 flex items-end gap-1 rounded-lg bg-secondary py-2 pl-5 pr-2'>
              <p className='text-xs text-foreground'>Attached Image:</p>
              <Image
                src={imgUrl}
                width={40}
                height={40}
                className='object-cover'
              />
            </div>
          )}
          <div className='absolute -right-14 top-[40%] rotate-90'>
            <Dialog>
              <DialogTrigger
                disabled={isEmpty()}
                onClick={() => {
                  setPost({
                    ...post,
                    content: textRef.current?.value,
                    postImageUrl: imgUrl,
                  })
                }}
                className={cn(
                  buttonVariants({ variant: 'default' }),
                  'h-8 w-full bg-secondary/20 dark:text-white',
                )}
              >
                Preview
              </DialogTrigger>
              <DialogContent className='bottom-0 left-[50%] top-auto flex h-fit max-h-[90%] max-w-2xl translate-x-[-50%] translate-y-0 flex-col border-2 border-primary p-3 sm:left-[50%] sm:top-[50%] sm:max-h-[80%] sm:translate-x-[-50%] sm:translate-y-[-50%]'>
                <ScrollArea className='flex h-full flex-col gap-3 pr-8'>
                  <PostCard post={post} isPreview={true} />
                </ScrollArea>
              </DialogContent>
            </Dialog>
          </div>
        </div>
        <div className='code-img justify-between gap-5'>
          <div className='flex w-full flex-col items-center justify-center rounded-lg text-background gap-3 md:h-full'>
            <PostTag setTagList={setTagList} className="flex flex-row"/>
            <div className='flex h-0 w-full flex-row items-center justify-center rounded-lg bg-stone-500 text-background md:h-3/4'>
            <CodeEditor
              code={code}
              setCode={setCode}
              post={post}
              setPost={setPost}
            />
            </div>
          </div>
          <UploadDnD setImgUrl={setImgUrl} />
        </div>
        <Button className='bg-accent text-background' onClick={handleCreate}>
          Upload
        </Button>
      </section>
    </main>
  )
}

export default CreatePost
