"use client"
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { cn } from '@/lib/utils'
import { ChevronDown } from 'lucide-react'
import  { useState } from 'react'
import CommentCard from './CommentCard'

function AllPosts() {
    const [postType, setPostType] = useState<"all" | "trash" | "published">("all")
    return (
        <div className='py-4'>
            <h1 className='font-bold capitalize text-2xl py-4 block'>posts</h1>

            <Card className='py-2 pr-4'>
                <CardHeader className='flex gap-2 justify-between p-0'>
                    <div className='flex'>
                        <p className={cn('p-2 border-b-[3.5px] capitalize font-bold w-fit px-4 cursor-pointer', postType === "all" ? "border-b-current" : "border-b-transparent text-gray-300 dark:text-gray-600")} onClick={() => setPostType("all")}>all (10)</p>
                        <p className={cn('p-2 border-b-[3.5px] capitalize font-bold w-fit px-4 cursor-pointer', postType === "trash" ? "border-b-current" : "border-b-transparent text-gray-300 dark:text-gray-600")} onClick={() => setPostType("trash")}>trash (3)</p>
                        <p className={cn('p-2 border-b-[3.5px] capitalize font-bold w-fit px-4 cursor-pointer', postType === "published" ? "border-b-current" : "border-b-transparent text-gray-300 dark:text-gray-600")} onClick={() => setPostType("published")}>published (7)</p>
                    </div>

                <Button className='cursor-pointer duration-500 border-2 border-transparent dark:text-black hover:bg-transparent hover:text-black dark:hover:text-white hover:border-black dark:hover:border-white'>categories <ChevronDown /></Button>
                </CardHeader>

                <CardContent>
                    {/* <AllPostComponent /> */}
                    <CommentCard />
                    <CommentCard />
                    <CommentCard />
                    <CommentCard />
                    <CommentCard />
                    <CommentCard />
                    <CommentCard />
                    <CommentCard />
                    <CommentCard />
                    {/* <PosttCard /> */}
                </CardContent>
            </Card>

        </div>
    )
}

export default AllPosts