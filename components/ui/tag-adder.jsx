import * as React from "react"

import { cn } from "@/lib/utils"
import { Button } from "./button"
import { PlusCircle } from "lucide-react"

const TagAdder = (onClick ) => { 
    return (
        <>
            <div className="flex w-40 h-8 relative m-2 items-center justify-center 
            rounded-2xl border-2 border-input bg-amber-600 
            border-primary focus-visible:ring-1 focus-visible:ring-ring focus-visible:ring-offset-1 ">
                <Button className="flex w-1/4 flex-col" variant="ghost" size="h-5" onClick={onClick}>
                    <PlusCircle className="h-5"/>
                </Button>
                <div className="flex w-2/4 flex-col text-white text-x font-semibold font-['Inter']">tag to add</div>
                    
            </div>
        </>
    )
}

export default TagAdder