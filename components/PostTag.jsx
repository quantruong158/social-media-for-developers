'use client'

import { Textarea } from "./ui/textarea"
import { useRef, useState } from "react"


const PostTag = () => {
    //* 1:Use text area use get list of tags
    //* (maybe we can use something else)
    //* 2:Handle tags string (assume using a configure. i.e: #c++ #meme )
    const textRef = useRef();
    
    const [tagList, setTag] = useState([]);
    const addTag = (tag) => {
        setTag([...tagList, tag]);
    };
    const removeTag = (tag) => { 
        const modifiedTagList = tagList.filter((item, i) => {
            item != tag;
        })
        setTag(modifiedTagList)
    }
    return (
        <>
        <div className='flex h-10 w-full flex-col items-center justify-center rounded-lg bg-gray-500 text-background md:h-20'>
            <Textarea
            /*onChange={(e) => setPost({ ...post, content: e.target.value })} */
            placeholder='Add your tags'
            className='min-h-10 border-primary text-lg focus-visible:ring-1 focus-visible:ring-ring focus-visible:ring-offset-1 md:h-10'
            ref={textRef}
            >
            </Textarea>
        </div>
        </>
    )
}

export default PostTag