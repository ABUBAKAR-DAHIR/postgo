"use client"
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { cn } from '@/lib/utils'
import { ChevronDown } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import AllPostComponent from './AllPostComponent'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import PostCard from './PostCard'
import PosttHeader from './PostHeader'
import { useInfiniteQuery, useQuery } from '@tanstack/react-query'
import axios from 'axios'
import { PostCardT, PostTypeT } from '@/types/types'
import AllPostsLoading from './AllPostsLoading'
import {useInViewport} from "@mantine/hooks"
import { Skeleton } from '@/components/ui/skeleton'


function AllPosts() {
    const [postType, setPostType] = useState<PostTypeT>("all")
    const {ref, inViewport} = useInViewport()
    
    // all posts
    const {data: allPosts, isLoading: allPostsLoading, isError: allPostsError, isFetchingNextPage, hasNextPage,  isFetchNextPageError: nextPageError, fetchNextPage} = useInfiniteQuery({
        queryKey: ["allPosts", postType],
        queryFn: async ({pageParam}) => {
            const res = await axios.get(`/api/posts/all-posts?type=${postType}&&page=${pageParam}`)
            return res.data
        },
        initialPageParam: 0,
        getNextPageParam: (lastPage) => {
            return lastPage.nextPage ?? undefined
        }
    })

    const {data: counts, isLoading: countLoading, isError: countError} = useQuery({
        queryKey: ["counts"],
        queryFn: async () => {
            const res = await axios.get("/api/posts/all-posts/counts")
            return res.data.counts
        }
    })  

    useEffect(() => {
        if(inViewport && !isFetchingNextPage && hasNextPage){
            console.log("viewport")
            fetchNextPage()
        }
        console.log(allPosts)
    }, [inViewport, isFetchingNextPage, hasNextPage, fetchNextPage])

    const posts = allPosts?.pages.flatMap((page) => page.posts ?? []) ?? []

    if(allPostsError) console.log(allPostsError)
        console.log("all posts: ", allPosts)
    console.log("counts ", counts)
    return (
        <div className='py-4 max-sm:px-0'>
            <h1 className='font-bold capitalize text-2xl py-4 block'>posts</h1>

            <Card className='py-2'>
                <CardHeader className='flex gap-2 justify-between p-0 flex-wrap max-[555px]:flex-col '>
                    <div className='flex flex-3'>
                        <p className={cn('flex gap-1 p-2 border-b-[3.5px] capitalize font-bold w-fit px-4 cursor-pointer', postType === "all" ? "border-b-postgo-sec" : "border-b-transparent text-gray-300 dark:text-gray-600")} onClick={() => setPostType("all")}>all {countLoading ? <Skeleton className='size-5 aspect-square'/> : !countError && counts ? `(${counts.allCount})` : ""}</p>
                        <p className={cn('flex gap-1 p-2 border-b-[3.5px] capitalize font-bold w-fit px-4 cursor-pointer', postType === "trash" ? "border-b-postgo-sec" : "border-b-transparent text-gray-300 dark:text-gray-600")} onClick={() => setPostType("trash")}>trash {countLoading ? <Skeleton className='size-5 aspect-square'/> : !countError && counts ? `(${counts.trashCount})` : ""}</p>
                        <p className={cn('flex gap-1 p-2 border-b-[3.5px] capitalize font-bold w-fit px-4 cursor-pointer', postType === "published" ? "border-b-postgo-sec" : "border-b-transparent text-gray-300 dark:text-gray-600")} onClick={() => setPostType("published")}>published {countLoading ? <Skeleton className='size-5 aspect-square'/> : !countError && counts ? `(${counts.publishedCount})` : ""}</p>
                    </div>

                    <div className='flex gap-x-4 flex-1'>
                        {/* ccategories */}
                        <Popover>
                            <PopoverTrigger asChild>
                                <Button className='bg-postgo-sec cursor-pointer hover:bg-transparent hover:text-postgo-sec duration-500 border-2 border-transparent hover:border-postgo-sec dark:text-gray-300'>categories <ChevronDown /></Button>
                            </PopoverTrigger>

                            <PopoverContent className='ml-4 gap-y-1'>
                                <Button variant="ghost" className='cursor-pointer capitalize'>published</Button>
                                <Button variant="ghost" className='cursor-pointer capitalize'>draft</Button>
                            </PopoverContent>
                        </Popover>
                        
                        {/* filter */}
                        {/* ccategories */}
                        <Popover>
                            <PopoverTrigger asChild>
                                <Button className='bg-postgo-sec cursor-pointer hover:bg-transparent hover:text-postgo-sec duration-500 border-2 border-transparent hover:border-postgo-sec dark:text-gray-300'>filters <ChevronDown /></Button>
                            </PopoverTrigger>

                            <PopoverContent className='mr-8 gap-y-1'>
                                <Button variant="ghost" className='cursor-pointer capitalize'>published</Button>
                                <Button variant="ghost" className='cursor-pointer capitalize'>draft</Button>
                            </PopoverContent>
                        </Popover>

                    </div>
                </CardHeader>

                <CardContent className='max-[300px]:px-1'>
                    {/* <AllPostComponent /> */}
                    <PosttHeader />
                    <div>
                        {
                            allPostsLoading ? 
                            Array.from({length: 4}).map((_) => <AllPostsLoading />)
                            :
                            allPostsError ? <p className='text-center text-postgo-sec'>An error occured</p>
                            :
                            posts.length < 1 ? <p className='py-4 w-full text-center'>No posts to show</p>
                            :
                            posts.map((post: PostCardT) => (
                                <PostCard 
                                    key={post.url}
                                    url= {post.url}
                                    count = {post.count}
                                    authorImage = {post.authorImage}
                                    authorName = {post.authorName}
                                    postTitle = {post.postTitle}
                                    postContent = {post.postContent}
                                    published = {post.published}
                                    comments = {post.comments}
                                    shares = {post.shares}
                                    impressions = {post.impressions}
                                />
                            ))
                        }
                    </div>

                    {
                        isFetchingNextPage && !nextPageError && <AllPostsLoading />
                    }
                    
                    <div ref={ref}/>
                </CardContent>
            </Card>

        </div>
    )
}

export default AllPosts