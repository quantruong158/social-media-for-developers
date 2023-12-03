import * as React from "react"

import { cn } from "@/lib/utils"
import { Button } from "./button"
import { X } from "lucide-react"

const TagTicket = ({tag, onClick}) => { 
    return (
        <div className="flex w-20 h-8 relative m-2 items-center justify-center 
        rounded-2xl border-2 bg-amber-600 
        border-primary focus-visible:ring-1 focus-visible:ring-ring focus-visible:ring-offset-1 ">
                <div className="flex w-2/4 flex-col text-white text-xs font-semibold font-['Inter']">{tag}</div>
                <Button className="flex w-1/4 flex-col" variant="ghost" size="h-5" onClick={onClick}>
                    <X className="h-6"/>
                </Button>
        </div>
    )
}

export default TagTicket