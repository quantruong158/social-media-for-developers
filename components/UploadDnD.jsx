'use client'
import '@uploadthing/react/styles.css'

import { UploadDropzone } from '@uploadthing/react'
import { useState } from 'react'
import Link from 'next/link'

export default function UploadDnD({ setImgUrl }) {
  return (
    <>
      <UploadDropzone
        className='mt-0 h-full border-2 border-primary'
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
