'use client'

import { Textarea } from "./ui/textarea"

export default function AddPostTag({ TagToAdd }) {
    //* 1:Use text area use get list of tags
    //* (maybe we can use something else)
    //* 2:Handle tags string (assume using a configure. i.e: #c++ #meme )
    //* 3: setPost call with onChange callback (post, tagList: current list) 
    return (
        <>
        <div>
            <Textarea
            /*onChange={(e) => setPost({ ...post, content: e.target.value })} 
            placeholder='Add your tags'
            className='h-full border-primary text-lg focus-visible:ring-1 focus-visible:ring-ring focus-visible:ring-offset-1 md:h-full'
            ref={textRef}
            */>
            </Textarea>
        </div>
        </>
    )
}