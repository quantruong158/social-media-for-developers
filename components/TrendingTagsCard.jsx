/**
 * v0 by Vercel.
 * @see https://v0.dev/t/hojt9CSc0fV
 */
import { CardHeader, CardContent, Card } from '@/components/ui/card'
import Link from 'next/link'
import { Button } from '@/components/ui/button'

export default function TrendingTagsCard() {
  return (
    <Card className='mx-auto w-full min-w-[300px] max-w-[350px] border-2 border-primary'>
      <CardHeader>
        <h1 className='text-2xl font-bold text-primary'>Trending Tags</h1>
      </CardHeader>
      <CardContent className='p-4'>
        <section className='grid grid-cols-1 gap-4'>
          <div className='group relative overflow-hidden rounded-lg'>
            <Link className='absolute inset-0 z-10' href='#'>
              <span className='sr-only'>View</span>
            </Link>
            <div className='bg-secondary p-3 group-hover:bg-secondary/90'>
              <h3 className='text-lg font-semibold md:text-xl'>#meme</h3>
              <Button variant='link'>See more</Button>
            </div>
          </div>
          <div className='group relative overflow-hidden rounded-lg'>
            <Link className='absolute inset-0 z-10' href='#'>
              <span className='sr-only'>View</span>
            </Link>
            <div className='bg-secondary p-3 group-hover:bg-secondary/90'>
              <h3 className='text-lg font-semibold md:text-xl'>#javascript</h3>
              <Button variant='link'>See more</Button>
            </div>
          </div>
          <div className='group relative overflow-hidden rounded-lg'>
            <Link className='absolute inset-0 z-10' href='#'>
              <span className='sr-only'>View</span>
            </Link>
            <div className='bg-secondary p-3 group-hover:bg-secondary/90'>
              <h3 className='text-lg font-semibold md:text-xl'>#tech</h3>
              <Button variant='link'>See more</Button>
            </div>
          </div>
          <div className='group relative overflow-hidden rounded-lg'>
            <Link className='absolute inset-0 z-10' href='#'>
              <span className='sr-only'>View</span>
            </Link>
            <div className='bg-secondary p-3 group-hover:bg-secondary/90'>
              <h3 className='text-lg font-semibold md:text-xl'>#news</h3>
              <Button variant='link'>See more</Button>
            </div>
          </div>
        </section>
      </CardContent>
    </Card>
  )
}
