import Image from 'next/image'

const Comment = ({ comment }) => {
  return (
    <div className='flex w-full gap-2 rounded-md bg-primary/10 px-2 py-2 text-foreground'>
      {comment.owner.imgUrl ? (
        <Image
          alt='post image'
          src={comment.owner.imgUrl}
          width={40}
          height={40}
          className='h-10 w-10 rounded-full'
        />
      ) : (
        <div className='h-10 w-10 shrink-0 rounded-full bg-white'></div>
      )}

      <div className='flex flex-col'>
        <p>
          <span className='text-sm font-semibold text-primary'>
            {comment.owner.username}
          </span>{' '}
          <span className='text-xs text-slate-500 dark:text-slate-400'>
            {comment.owner.email}
          </span>
        </p>
        <p>{comment.content}</p>
      </div>
    </div>
  )
}

export default Comment
