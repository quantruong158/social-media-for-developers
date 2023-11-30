import * as React from "react"

import { cn } from "@/lib/utils"
import { Button } from "./button"

const TagTicket = ({tag, onClick}) => { 
    return (
        <div className="flex w-14 h-6 relative items-center justify-center
        rounded-md border-2 border-input bg-background
        border-primary focus-visible:ring-1 focus-visible:ring-ring focus-visible:ring-offset-1 bg-amber-600">
                <div className="flex w-2/4 flex-col text-white text-xs font-semibold font-['Inter']">{tag}</div>
                <Button className="flex w-1/4 flex-col" variant="ghost" size="h-5" onClick={onClick}>
                    <svg class="h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </Button>
        </div>
    )
}

export default TagTicket