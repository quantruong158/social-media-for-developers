'use client'

import TagAdder from './ui/tag-adder'
import TagTicket from './ui/tag-ticket'
import { useState, useEffect } from 'react'

const PostTag = ({ setTagList, tagList, post, setPost }) => {
  //* 1:Use tag adder component to create a tag list of tags
  //* 2:Tag added to post will be store in tagList with userState to update
  //* 2: Handle display tagList by tag-ticket
  //* existedTagList is existed common tag from database to choose form, hard code 3 value

  const [existedTagNameList, setExistTagNameList] = useState([])
  const [existedTagList, setExistTagList] = useState([])

  const addTag = (tag) => {
    if (!tag) {
      return
    }
    if (tag.value.length === 0) {
      return
    }
    if (!existedTagNameList.includes(tag.value)) {
      console.log(tag.value)
      setExistTagNameList([...existedTagNameList, tag.value])
    }
    const checkedTagList = tagList.filter((tagItem) => {
      return tagItem.value === tag.value
    })
    if (checkedTagList.length === 0) {
      //*call parent setTagList
      const newList = [...tagList, tag]
      setTagList(newList)
      const newListName = newList.map((tag) => tag.value)
      setPost({ ...post, tags: newListName })
    }
  }
  const removeTag = (tagName) => {
    const modifiedTagList = tagList.filter((tagItem) => {
      return tagItem.value !== tagName
    })
    //*call parent setTagList
    setTagList(modifiedTagList)
    const newListName = modifiedTagList.map((tag) => tag.value)
    setPost({ ...post, tags: newListName })
  }
  const renderTagList = tagList.map((renderTag, idx) => (
    <TagTicket
      key={idx}
      className='font-inter flex flex-col'
      tagName={renderTag.value}
      removeClickHandle={removeTag}
    ></TagTicket>
  ))

  useEffect(() => {
    const getTags = async () => {
      try {
        const res = await fetch(`/api/tags`)
        if (!res.ok) {
          throw new Error('Error')
        }
        const data = await res.json()
        setExistTagList(data)
      } catch (err) {
        console.error(err)
      }
    }
    getTags()
  }, [])
  return (
    <>
      <div
        className='justify-left flex h-12 w-full flex-row items-center gap-1 
            rounded-lg border-primary bg-stone-500 px-2 text-lg text-background md:h-20'
      >
        {renderTagList}
        <TagAdder
          className='flex flex-col'
          existedTagList={existedTagList}
          addClickHandle={addTag}
        ></TagAdder>
      </div>
    </>
  )
}

export default PostTag
