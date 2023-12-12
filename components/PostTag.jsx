'use client'

import TagAdder from "./ui/tag-adder";
import TagTicket from "./ui/tag-ticket";
import { useState } from "react"


const PostTag = ({setTagList, tagList}) => {
    //* 1:Use tag adder component to create a tag list of tags
    //* 2:Tag added to post will be store in tagList with userState to update
    //* 2: Handle display tagList by tag-ticket
    //* existedTagList is existed common tag from database to choose form, hard code 3 value

    const [existedTagList, setExistTagList] = useState(["C++", "Meme", "React"])

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
        //*call parent setTagList
        setTagList([...tagList, {name: tagName}])
    };
    const removeTag = (tagName) => { 
        const modifiedTagList = tagList.filter((tagItem) => {
            return tagItem.name !== tagName;
        })
        //*call parent setTagList
        setTagList(modifiedTagList)
    }
    const renderTagList = tagList.map(
        renderTag => (<TagTicket className="flex flex-col" tagName={renderTag.name} removeClickHandle={removeTag}></TagTicket>)
    )

    return (
        <>
            <div className='flex h-12 w-full flex-row items-center justify-left gap-1 
            border-primary text-lg rounded-lg bg-stone-500 text-background md:h-20'>
                {renderTagList}
                <TagAdder className="flex flex-col" existedTagList = {existedTagList} addClickHandle={addTag}></TagAdder>
            </div>
        </>
    )
}

export default PostTag