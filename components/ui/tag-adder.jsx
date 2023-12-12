import * as React from "react"

import { cn } from "@/lib/utils"
import { Button } from "./button"
import { ArrowDownNarrowWide, PlusCircle } from "lucide-react"
import { DropdownMenu,
        DropdownMenuItem,
        DropdownMenuTrigger,
        DropdownMenuContent
}from '@/components/ui/dropdown-menu'

import {Input} from "@/components/ui/input"
const TagAdder = ({addClickHandle, existedTagList}) => { 
    const [tagName, setTagName] = React.useState();
    const renderExistedTagList = existedTagList.map(
        renderExistedTag => (
            <DropdownMenuItem textValue={renderExistedTag} onClick={e => setTagName(e.target.textContent)}>
                {renderExistedTag}
            </DropdownMenuItem>
        )
    )
    return (
        <>
            <div className="flex w-[200px] h-8 relative m-1 items-center justify-center 
            rounded-2xl border-2 bg-amber-600 
            border-primary focus-visible:ring-1 focus-visible:ring-ring focus-visible:ring-offset-1 ">
                <Button className="flex w-1/4 flex-col" variant="ghost" size="h-5" onClick={e => addClickHandle(tagName)}>
                    <PlusCircle className="h-5"/>
                </Button>
                <Input
                    value = {tagName}
                    placeholder='Custom tag'
                    className='h-5 border-0 border-primary focus:outline-none bg-transparent'
                    onChange={e => setTagName(e.target.value)}>
                </Input>
                <DropdownMenu className="flex w-3/4 flex-col bg-transparent">
                    <DropdownMenuTrigger asChild>
                        <button className="IconButton" aria-label="Customise options">
                            <ArrowDownNarrowWide></ArrowDownNarrowWide>
                        </button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align='end'>
                        {renderExistedTagList}
                    </DropdownMenuContent>
                    
                </DropdownMenu>
            </div>
        </>
    )
}

export default TagAdder