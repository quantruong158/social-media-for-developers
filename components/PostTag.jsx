'use client'

import TagAdder from "./ui/tag-adder";
import TagTicket from "./ui/tag-ticket";
import { useState } from "react"


const PostTag = () => {
    //* 1:Use text area use get list of tags
    //* (maybe we can use something else)
    //* 2:Handle tags string (assume using a configure. i.e: #c++ #meme)
    const [existedTagList, setExistTagList] = useState(["C++", "Meme", "React"])// existed tag from database, hard code 3 value
    const [tagList, setTag] = useState([]);
    const addTag = (tagName) => {
        if (!existedTagList.includes(tagName))
        {
            setExistTagList([...existedTagList, tagName])
            //* Add new tag to existed tag list
            //*Implement for db later 
        }
        const checkedTagList = tagList.filter((tagItem) => {
            return tagItem.name === tagName;
        })
        if (checkedTagList.length === 0)
        setTag([...tagList, {name: tagName}])
    };
    const removeTag = (tagName) => { 
        const modifiedTagList = tagList.filter((tagItem) => {
            return tagItem.name !== tagName;
        })
        setTag(modifiedTagList)
    }
    const renderTagList = tagList.map(
        renderTag => (<TagTicket className="flex flex-col" tagName={renderTag.name} clickHandle={removeTag}></TagTicket>)
    )

    return (
        <>
            <div className='flex h-12 w-full flex-row items-center justify-left gap-1 
            border-primary text-lg rounded-lg bg-stone-500 text-background md:h-20'>
                {renderTagList}
                <TagAdder className="flex flex-col" existedTagList = {existedTagList} clickHandle={addTag}></TagAdder>
            </div>
        </>
    )
}

export default PostTag