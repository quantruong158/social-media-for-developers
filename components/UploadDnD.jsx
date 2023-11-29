'use client'
import '@uploadthing/react/styles.css'

import { UploadDropzone } from '@uploadthing/react'
import { useState } from 'react'
import Link from 'next/link'

export default function UploadDnD({ setImgUrl }) {
  const [images, setImages] = useState([])
  const title = images.length ? (
    <>
      <p>Upload Complete</p>
      <p className='mt-2'>{images.length} files</p>
    </>
  ) : null
  const imgList = (
    <>
      {title}
      <ul>
        {images.map((image) => (
          <li key={image.fileUrl} className='mt-2'>
            <Link href={image.fileUrl} target='_blank'>
              {image.fileUrl}
            </Link>
          </li>
        ))}
      </ul>
    </>
  )
  return (
    <>
      <UploadDropzone
        className='mt-0 h-[200px] border-2 border-primary'
        appearance={{
          label: 'text-secondary hover:text-primary',
          button:
            'ut-ready:bg-green-500 ut-uploading:cursor-not-allowed rounded-r-none bg-secondary after:bg-primary',
          uploading: 'bg-primary',
        }}
        endpoint='mediaPost'
        onClientUploadComplete={(res) => {
          if (res) {
            setImgUrl(res[0].fileUrl)
          }
        }}
        onUploadError={(error) => {
          // Do something with the error.
          alert(`ERROR! ${error.message}`)
        }}
        config={{ mode: 'auto' }}
      />
      {/* {imgList} */}
    </>
  )
}
