import * as React from "react"

import { cn } from "@/lib/utils"
import { Button } from "./button"
import { X } from "lucide-react"

const TagTicket = ({tagName, removeClickHandle}) => { 
    return (
        <div className="flex w-20 h-8 relative items-center justify-center 
        rounded-2xl border-2 bg-amber-600 border-primary focus-visible:ring-1 focus-visible:ring-ring focus-visible:ring-offset-1">
                <div className="flex w-2/4 flex-col text-white text-xs font-inter">{tagName}</div>
                <Button className="flex rounded-full flex-col" variant="ghost" size="h-5" onClick={e => removeClickHandle(tagName)}>
                    <X className="h-6"/>
                </Button>
        </div>
    )
}

export default TagTicket