import type { NodeKind, NodeMetaData } from "./CreateWorkFlow"
import { Button } from "@/components/ui/button"
import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetDescription,
    SheetFooter,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet"
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { useState } from "react"


const SUPORTED_TRIGGER =[{
    id:"timer",
    title: "Timer",
    description: "Run this trigger every x seconds/minutes"
},{
    id: "price-trigger",
    title: "Peice Trigger",
    description: "Runs whenev the price goes abpve or below a certain number for an asset"
}]

export const TriggerSheet = ({ onSelect }: {
    onSelect: (kind: NodeKind, metaData: NodeMetaData) => void
}) => {
    const [metadata, setMetadata] = useState({})

    return <Sheet open={true}>
        {/* <SheetTrigger asChild>
            <Button variant="outline">Open</Button>
        </SheetTrigger> */}
        <SheetContent>
            <SheetHeader>
                <SheetTitle>Sleect Trigger</SheetTitle>
                <SheetDescription>
                    Slect the tpe of trigger
                    <Select>
                        <SelectTrigger className="w-full">
                            <SelectValue placeholder="Select a fruit" />
                        </SelectTrigger> 
                        <SelectContent>
                            <SelectGroup>
                                {/* <SelectLabel>Fruits</SelectLabel> */}
                                {SUPORTED_TRIGGER.map(({id, title})=><>
                                    {/* <SelectLabel>{title}</SelectLabel> */}
                                    <SelectItem onSelect={()=>onSelect(
                                        id, 
                                        metadata
                                    )} value={id}>{title}</SelectItem>
                                </>)}
                            </SelectGroup>
                        </SelectContent>
                    </Select>
 
                </SheetDescription>
            </SheetHeader>

            <SheetFooter>
                <Button type="submit">Create Trigger</Button>
                <SheetClose asChild>
                    <Button variant="outline">Close</Button>
                </SheetClose>
            </SheetFooter>
        </SheetContent>
    </Sheet>

}