'use client'

import TagTicket from "./ui/tag-ticket";
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
            <div className='flex h-10 w-full flex-col items-left justify-center gap-5 
        border-primary text-lg rounded-lg bg-stone-500 text-background md:h-20'>
            <TagTicket tag={"C++"} onClick={() => {removeTag("C++")}} ></TagTicket>
        </div>
        </>
    )
}

export default PostTag