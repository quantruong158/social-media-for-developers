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
  useEffect(() => {
    const fetchSearchResults = async () => {
      try {
        console.log(query)
        if (query === '') {
          setIsSearching(false)
          setSearchedTags([])
          return
        }
        const res = await fetch(`http://localhost:3000/api/tags?q=${query}`)
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
  const renderExistedTagList = isSearching ? (
    <p className='px-2 text-sm'>Searching...</p>
  ) : (
    existedTagList.map((renderExistedTag) => (
      <DropdownMenuItem
        key={renderExistedTag.value}
        textValue={renderExistedTag.value}
        onClick={(e) => setCurrentTag(renderExistedTag)}
      >
        {renderExistedTag.value}
      </DropdownMenuItem>
    ))
  )

  const renderSearchedTagList = searchedTags.map((tag) => (
    <DropdownMenuItem
      key={tag.value}
      textValue={tag.value}
      onClick={() => setCurrentTag(tag)}
    >
      {tag.value}
    </DropdownMenuItem>
  ))

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
          onClick={(e) => {
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
            {searchedTags.length > 0
              ? renderSearchedTagList
              : renderExistedTagList}
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
