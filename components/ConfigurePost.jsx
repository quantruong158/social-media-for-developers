'use client'

import { Button } from './ui/button'
import { SlidersHorizontalIcon } from 'lucide-react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { DialogContent, DialogHeader, DialogTitle } from './ui/dialog'
import { useRouter } from 'next/navigation'
import { Dialog, DialogTrigger } from '@/components/ui/dialog'
import { cn } from '@/lib/utils'
import { buttonVariants } from './ui/button'
const ConfigurePost = ({ id, owner, me }) => {
  const router = useRouter()
  const handleDelete = async (e) => {
    e.preventDefault()
    try {
      const res = await fetch(`/api/posts/${id}`, {
        method: 'DELETE',
      })
      if (!res.ok) {
        throw new Error('ERROR')
      } else {
        console.log('success')
        router.refresh()
      }
    } catch (err) {
      console.error(err)
    }
  }
  return (
    <div className='absolute right-5 top-5'>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant='outline' size='icon' className='border-none'>
            <SlidersHorizontalIcon width={20} />
            <span className='sr-only'>Toggle theme</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align='end'>
          {owner.username == me ? (
            <>
              <DropdownMenuItem
                onClick={() => router.push(`update-post/${id}`)}
              >
                Edit
              </DropdownMenuItem>
              <Dialog>
                <DialogTrigger
                  className={cn(
                    buttonVariants({ variant: 'default' }),
                    'h-6 w-full gap-2 bg-destructive text-white hover:bg-red-700',
                  )}
                >
                  Delete
                </DialogTrigger>
                <DialogContent className='bottom-0 left-[50%] top-auto flex h-[90%] max-w-2xl translate-x-[-50%] translate-y-0 flex-col border-2 border-primary p-3 sm:left-[50%] sm:top-[50%] sm:h-[15%] sm:translate-x-[-50%] sm:translate-y-[-50%]'>
                  <DialogHeader>
                    <DialogTitle className='text-center text-destructive'>
                      Delete this post?
                    </DialogTitle>
                  </DialogHeader>
                  <Button
                    className='bg-destructive text-white hover:bg-red-700'
                    onClick={handleDelete}
                  >
                    Yes
                  </Button>
                </DialogContent>
              </Dialog>
            </>
          ) : (
            <>
              <DropdownMenuItem>Report</DropdownMenuItem>
            </>
          )}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}

export default ConfigurePost
