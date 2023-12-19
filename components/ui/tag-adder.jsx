import { useEffect, useState } from 'react'

import { useDebounce } from 'use-debounce'
import { Button } from './button'
import { ArrowDownNarrowWide, PlusCircle } from 'lucide-react'
import {
  DropdownMenu,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
} from '@/components/ui/dropdown-menu'

import { Input } from '@/components/ui/input'

const TagAdder = ({ addClickHandle, existedTagList }) => {
  const [currentTag, setCurrentTag] = useState(null)
  const [query, setQuery] = useState('')
  const [searchedTags, setSearchedTags] = useState([])
  const [debouncedValue] = useDebounce(query, 300)
  const [isSearching, setIsSearching] = useState(false)
  const [isAdding, setIsAdding] = useState(false)
  useEffect(() => {
    const fetchSearchResults = async () => {
      try {
        const encodedQuery = encodeURIComponent(query)
        const res = await fetch(`/api/tags?q=${encodedQuery}`)
        if (!res.ok) {
          throw Error('error fetch tags')
        }
        const data = await res.json()
        if (query === '') {
          setIsSearching(false)
          setSearchedTags([])
          return
        }
        setSearchedTags(data)
        setIsSearching(false)
      } catch (error) {
        console.error('Error fetching search results:', error)
      }
    }
    fetchSearchResults()
  }, [debouncedValue])

  const handleInputChange = (e) => {
    const inputValue = e.target.value
    setIsSearching(true)
    setQuery(inputValue)
  }

  const handleAddTag = async () => {
    try {
      setIsAdding(true)
      const res = await fetch(`/api/tags`, {
        method: 'POST',
        body: JSON.stringify({
          tagName: query.trim(),
        }),
      })
      if (!res.ok) {
        throw Error('error adding tags')
      }
      const data = await res.json()
      console.log(data)
      setSearchedTags([...searchedTags, data])
      setIsAdding(false)
    } catch (error) {
      console.error('Error fetching search results:', error)
    }
  }

  const renderExistedTagList =
    !isSearching &&
    existedTagList.map((renderExistedTag) => (
      <DropdownMenuItem
        key={renderExistedTag.value}
        textValue={renderExistedTag.value}
        onClick={() => setCurrentTag(renderExistedTag)}
      >
        {renderExistedTag.value}
      </DropdownMenuItem>
    ))

  const renderSearchedTagList =
    searchedTags.length === 0 && !isSearching ? (
      <>
        <p className='mt-1 text-center text-sm'>No result found!</p>
        <Button
          className='mt-1 w-full text-white'
          disabled={isAdding}
          onClick={handleAddTag}
        >
          Add &#39;{query.trim()}&#39;
        </Button>
      </>
    ) : (
      searchedTags.map((tag) => (
        <DropdownMenuItem
          key={tag.value}
          textValue={tag.value}
          onClick={() => setCurrentTag(tag)}
        >
          {tag.value}
        </DropdownMenuItem>
      ))
    )

  return (
    <>
      <div
        className='relative m-1 flex h-8 max-w-[200px] items-center justify-center
            rounded-2xl border-2 border-primary
            bg-primary focus-visible:ring-1 focus-visible:ring-ring focus-visible:ring-offset-1 '
      >
        <Button
          className='ml-2 flex flex-col rounded-full'
          variant='ghost'
          size='h-5'
          onClick={() => {
            setQuery('')
            setSearchedTags([])
            setCurrentTag({ value: '' })
            addClickHandle(currentTag)
          }}
        >
          <PlusCircle className='h-5' />
        </Button>
        <p className='w-full border-0 border-primary bg-transparent px-2 text-sm focus:outline-none'>
          {currentTag?.value}
        </p>
        <DropdownMenu className='flex w-3/4 flex-col bg-transparent'>
          <DropdownMenuTrigger asChild>
            <button className='mr-2' aria-label='Customise options'>
              <ArrowDownNarrowWide />
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className='w-[150px] p-2' align='end'>
            <p className='mx-1 text-center text-sm font-bold text-primary'>
              Popular Tags
            </p>
            {isSearching && <p className='px-2 text-sm'>Searching...</p>}
            {query.length > 0 ? renderSearchedTagList : renderExistedTagList}
            <DropdownMenuLabel onKeyDown={(e) => e.stopPropagation()}>
              <Input
                placeholder='Search Tags'
                className='mt-2 h-7 w-full'
                onChange={handleInputChange}
              />
            </DropdownMenuLabel>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </>
  )
}

export default TagAdder
