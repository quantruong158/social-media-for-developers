import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

const LoadingSkeleton = () => {
  return (
    <div className='flex h-screen w-[650px] flex-col items-center gap-6 rounded-xl p-4 md:p-10 opacity-70'>
    <Card className='h-fit w-full border-none bg-secondary/20'>
      <CardHeader className='flex-row gap-2 p-3'>
        <div className='h-[50px] w-[50px] rounded-full bg-gray-200' />
        <div>
          <CardTitle className='w-[150px] bg-gray-200 h-3 rounded-full'></CardTitle>
          <CardDescription className='mt-3 w-[220px] bg-gray-200 h-3 rounded-full'>
          </CardDescription>
        </div>
      </CardHeader>

      <CardContent className='h-[300px] w-full'>
        <div className='flex h-full w-full items-center justify-center bg-gray-200 text-white'>
          Loading...
        </div>
      </CardContent>
    </Card>
    <Card className='h-fit w-[600px] border-none bg-secondary/20'>
      <CardHeader className='flex-row gap-2 p-3'>
        <div className='h-[50px] w-[50px] rounded-full bg-gray-200' />
        <div>
          <CardTitle className='w-[150px] bg-gray-200 h-3 rounded-full'></CardTitle>
          <CardDescription className='mt-3 w-[220px] bg-gray-200 h-3 rounded-full'>
          </CardDescription>
        </div>
      </CardHeader>

      <CardContent className='h-[300px] w-full'>
        <div className='flex h-full w-full items-center justify-center bg-gray-200 text-white'>
          Loading...
        </div>
      </CardContent>
    </Card>
    </div>
  )
}

export default LoadingSkeleton
