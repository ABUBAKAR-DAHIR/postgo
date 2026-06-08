"use client"
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { cn } from '@/lib/utils'
import { ChevronDown } from 'lucide-react'
import  { useEffect, useState } from 'react'
import CommentCard from './CommentCard'
import { useInfiniteQuery, useQuery } from '@tanstack/react-query'
import axios from 'axios'
import {useInViewport} from "@mantine/hooks"
import { CommentCardT } from '@/types/types'
import CommentLoading from './CommentLoading'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { Checkbox } from '@/components/ui/checkbox'
import { Skeleton } from '@/components/ui/skeleton'

function AllPosts() {
    const [commentType, setCommentType] = useState<"all" | "drafts" | "trash">("all")
    const {ref, inViewport} = useInViewport()
    const [filters, setFilters] = useState({
        read: false,
        unread: false,
        approved: false,
        unapproved: false,
        followed: false,
        unfollowed: false,
    })

    const {data: commentsPages, isLoading: commentsLoading, error: commentsError, isFetchingNextPage, fetchNextPage, hasNextPage, isFetchNextPageError} = useInfiniteQuery({
        queryKey: ["comments", commentType],
        queryFn: async ({pageParam}) => {
            const res = await axios.get(`/api/comments/all-comments?type=${commentType}&&page=${pageParam}`)
            return res.data
        },
        initialPageParam: 0,
        getNextPageParam: (lastPage) => lastPage.nextPage ?? undefined
    })

    const {data: counts, isLoading: countLoading, isError: countError} = useQuery({
        queryKey: ["counts"],
        queryFn: async () => {
            const res = await axios.get("/api/comments/all-comments/counts")
            return res.data.counts
        }
    })  

    useEffect(() => {
        if(inViewport && !commentsLoading && !isFetchingNextPage && !isFetchNextPageError){
            fetchNextPage()
        }

    }, [inViewport, isFetchingNextPage, hasNextPage, fetchNextPage, isFetchNextPageError])

    const comments = commentsPages?.pages.flatMap((comms) => comms.comments ?? []) ?? []
    
    const toggle = (key: keyof typeof filters) => {
        setFilters((prev => ({
            ...prev,
            [key] : !prev[key]
        })))
    }

    return (
        <div className='py-4'>
            <h1 className='font-bold capitalize text-2xl py-4 block'>comments</h1>

            <Card className='py-2 pr-4'>
                <CardHeader className='flex gap-2 justify-between p-0 flex-wrap'>
                    <div className='flex min-w-max'>
                        <p className={cn('flex gap-2 p-2 border-b-[3.5px] capitalize font-bold w-fit px-4 cursor-pointer', commentType === "all" ? "border-b-current" : "border-b-transparent text-gray-300 dark:text-gray-600")} onClick={() => setCommentType("all")}>all {countLoading ? <Skeleton className='size-5 aspect-square'/> : !countError && counts ? `(${counts.allCount})` : ""}</p>
                        <p className={cn('flex gap-2 p-2 border-b-[3.5px] capitalize font-bold w-fit px-4 cursor-pointer', commentType === "drafts" ? "border-b-current" : "border-b-transparent text-gray-300 dark:text-gray-600")} onClick={() => setCommentType("drafts")}>drafts {countLoading ? <Skeleton className='size-5 aspect-square'/> : !countError && counts ? `(${counts.draftCount})` : ""}</p>
                        <p className={cn('flex gap-2 p-2 border-b-[3.5px] capitalize font-bold w-fit px-4 cursor-pointer', commentType === "trash" ? "border-b-current" : "border-b-transparent text-gray-300 dark:text-gray-600")} onClick={() => setCommentType("trash")}>trash {countLoading ? <Skeleton className='size-5 aspect-square'/> : !countError && counts ? `(${counts.trashCount})` : ""}</p>
                    </div>
                    
                    <Popover>
                        <PopoverTrigger asChild>
                            <Button className='cursor-pointer duration-500 border-2 border-transparent dark:text-black hover:bg-transparent hover:text-black dark:hover:text-white hover:border-black dark:hover:border-white'>categories <ChevronDown /></Button>
                        </PopoverTrigger>

                        <PopoverContent className='mr-8 w-fit px-6'>
                            <div className="flex gap-2 items-cente cursor-pointer" onClick={() => toggle("read")}>
                                <Checkbox checked = {filters.read} className='cursor-pointer'/>
                                <p className='capitalize'>read</p>
                            </div>
                            <div className="flex gap-2 items-cente cursor-pointer" onClick={() => toggle("unread")}>
                                <Checkbox checked = {filters.unread} />
                                <p className='capitalize'>unread</p>
                            </div>
                            <hr className='bg-gray-400'/>
                            <div className="flex gap-2 items-cente cursor-pointer" onClick={() => toggle("approved")}>
                                <Checkbox checked = {filters.approved} />
                                <p className='capitalize'>approved</p>
                            </div>
                            <div className="flex gap-2 items-cente cursor-pointer" onClick={() => toggle("unapproved")}>
                                <Checkbox checked = {filters.unapproved} />
                                <p className='capitalize'>unapproved</p>
                            </div>
                            <hr className='bg-gray-400'/>
                            <div className="flex gap-2 items-cente cursor-pointer" onClick={() => toggle("followed")}>
                                <Checkbox checked = {filters.followed} />
                                <p className='capitalize'>followed</p>
                            </div>
                            <div className="flex gap-2 items-cente cursor-pointer" onClick={() => toggle("unfollowed")}>
                                <Checkbox checked = {filters.unfollowed} />
                                <p className='capitalize'>unfollowed</p>
                            </div>
                        </PopoverContent>
                    </Popover>
                </CardHeader>

                <CardContent>
                    <div>
                        {   commentsLoading ? Array.from({length: 6}).map((_,i) => <CommentLoading key={i}/>)
                            :
                            commentsError? <p className='w-full py-4 text-center text-postgo-sec'>{commentsError.message}</p>
                            :
                            !comments || comments.length < 1? <p className='w-full py-4 text-center font-semibold'>No comments to show</p>
                            :
                            comments?.map((comment: CommentCardT, i) => (
                                <CommentCard
                                    key={i}
                                    commentAuthorImage = {comment.commentAuthorImage}
                                    commentAthorName = {comment.commentAthorName}
                                    commentDate = {comment.commentDate}
                                    commentContent = {comment.commentContent}
                                    likes = {comment.likes}
                                    replies = {comment.replies}
                                    postUrl = {comment.postUrl}
                                />
                            ))
                        }
                    </div>
                    {isFetchingNextPage && <CommentLoading />}
                    <div ref={ref}/>
                </CardContent>
            </Card>

        </div>
    )
}

export default AllPosts