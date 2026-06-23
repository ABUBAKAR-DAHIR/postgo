"use client"
import { Button } from '@/components/ui/button'
import { PostCardT } from '@/types/types'
import { Clock, EyeIcon, PenLine, StretchHorizontal, Trash2 } from 'lucide-react'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import DOMpurify from "dompurify"
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { deletePostAction } from '@/actions/posts.action'
import { toast } from 'sonner'
import { analytics } from '@/lib/analytics'

function PostCard({
    url,
    count,
    authorImage,
    authorName,
    postTitle,
    postContent,
    published,
    comments,
    shares,
    impressions,
}: PostCardT ) {
    const stats = [
        { label: 'Published', value: published},
        { label: 'Comments', value: comments },
        { label: 'Shares', value: shares },
        { label: 'Impressions', value: impressions }
    ]
    const [open, setOpen] = useState<boolean>(false)
    const queryClient = useQueryClient()

    const deletePostMutation = useMutation({
        mutationKey: ["deletePost"],
        mutationFn: deletePostAction,
        onSuccess: (data) => {
            if(data.success){
                toast.success("Post deleted successfully!")
                analytics.postDeletedSuccess()
                setOpen(false)
                queryClient.invalidateQueries({
                    queryKey: ["allPosts"]
                })
                queryClient.invalidateQueries({
                    queryKey: ["counts"]
                })
            }
            else{
                toast.error(data.error)
                console.log(data)
                analytics.postDeletedFailed()
                setOpen(false)
            }
        },
        onError: (data) => {
            toast.error("post couldn't be deleted!")
            console.log(data)
            analytics.postDeletedFailed()
            setOpen(false)
        },
        onSettled: () => {
            setOpen(false)
        }
    })

    const handlePostDeletion = () => {
        deletePostMutation.mutate({
            url
        })
    }

    useEffect(()=>{
        if(!deletePostMutation.isPending) return
        toast.loading("Deleting The post...")

    }, [deletePostMutation.isPending])

    return (
        <div className='flex max-[1125px]:flex-col max-md:flex-row max-sm:flex-col gap-x-2 p-4 border-t border-t-postgo-sec rounded-2xl w-full group hover:bg-black dark:hover:bg-gray-300 cursor-pointer duration-500 ease-in-out transition-all mb-2'>
            {/* post info */}
            <div className='flex flex-3 gap-4 items-center max-[391px]:flex-wrap'>

                <p className='font-semibold text-gray-600 dark:text-gray-300 group-hover:text-gray-300 dark:group-hover:text-gray-600 text-sm transition-all duration-500'>{count}</p>
                {/* Author */}
                <div className='flex flex-col items-center justify-center gap-y-2 min-w-max'>
                    <div className="relative size-20 max-md:size-18 rounded-full overflow-clip">
                        {/* <Image src="/dashboard/profile-placeholder.png" fill alt='Thumbnail image' className='object-contain'/> */}
                        {/* <div className='absolute w-full h-full bg-gray-300 group-hover:bg-gray-700 rounded-full'/> */}
                        <Image src={authorImage} fill alt='author_image' />
                    </div>
                    <p className='font-semibold text-gray-600 dark:text-gray-300 text-sm group-hover:text-gray-300 dark:group-hover:text-gray-700 ease-in-out transition-all duration-500 text-center capitalize truncate'>{authorName}</p>
                </div>

                {/* Post Info */}
                <div className='w-full bg-red min-w-0'>
                    <p className='capitalize font-semibold  text-[16.5px] group-hover:text-gray-300 dark:group-hover:text-black text-sm transition-all duration-500 truncate'>{postTitle.length < 50 ? postTitle : `${postTitle.slice(50)}...`}</p>
                    <div className="flex gap-y-1 gap-x-4 my-1 flex-wrap">
                        <p className='flex gap-x-1 text-xs items-center justify-center text-[13px] dark:text-gray-300 dark:group-hover:text-gray-900 group-hover:text-gray-400 transition-all duration-500'><Clock className='size-3.5'/> 10 mint read</p>
                        <p className='flex gap-x-1 text-xs items-center justify-center text-[13px] dark:text-gray-300 dark:group-hover:text-gray-900 group-hover:text-gray-400 transition-all duration-500'><StretchHorizontal className='size-3.5'/> category name</p>
                    </div>

                    {/* <p className='max-w-lg text-sm group-hover:text-white/80 dark:group-hover:text-gray-600 transition-all duration-500'>{post.length < 100 ? post : `${post.slice(0, 120)}...`}</p> */}
                    <p className='line-clamp-2 sm:line-clamp-3 text-sm dark:text-gray-300 group-hover:text-white/80 dark:group-hover:text-black transition-all duration-500'
                        dangerouslySetInnerHTML={{__html: DOMpurify.sanitize(postContent)}}
                    />


                    {/* buttons */}
                    <div className="flex gap-3 max-sm:my-2">
                        <Button asChild variant="ghost" className='w-fit cursor-pointer text-xl text-postgo-sec hover:text-postgo-sec' onClick={() => {}}>
                            <Link href={`/posts/${url}`} target='_blank'><EyeIcon /></Link>
                        </Button>
                        <Button variant="ghost" asChild className='w-fit cursor-pointer text-xl text-postgo-sec hover:text-postgo-sec' onClick={() => {}}><Link href={`/dashboard/create-post?edit=true&&slug=${url}`}><PenLine /></Link></Button>
                        
                        <Popover open={open} onOpenChange={() => setOpen(!open)}>
                            <PopoverTrigger>
                                <Button variant="ghost" className='w-fit cursor-pointer text-xl text-postgo-sec hover:text-postgo-sec' onClick={() => {}}><Trash2 /></Button> 
                            </PopoverTrigger>

                            <PopoverContent className='w-80 h-40'>
                                <h1 className='font-semibold text-center'>Are you sure you want to delete this post?</h1>
                                <p><strong>Note:</strong> This will permanently delete the post</p>

                                <div className="flex w-full gap-2">
                                    <Button variant="secondary" className='flex-1 cursor-pointer border border-transparent hover:border-black' onClick={() => setOpen(false)}>back</Button>
                                    <Button disabled={deletePostMutation.isPending} variant="destructive" className='flex-1 cursor-pointer border border-transparent hover:border-postgo-sec' onClick={handlePostDeletion}>{deletePostMutation.isPending ? "deleting..." : "delete"}</Button>    
                                </div>
                            </PopoverContent>
                        </Popover>
                    </div>
                    {/* <p className='max-w-xl'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptas omnis, doloribus autem dolore, inventore officia laborum voluptate quos officiis sit nisi nesciunt aut natus esse unde. Ipsum eos et nostrum!</p> */}
                </div>

            </div>

            {/* stats */}
            <div className="w-full border-t-gray-300 group-hover:border-t-gray-200 max-[1125px]:border-t max-md:border-t-0 max-sm:border-t transition-all duration-500 ease-in-out my-2 py-2 flex flex-wrap flex-2 gap-4 md:gap-14 justify-between items-center ">
                {
                    stats.map((stat) => (
                        <div key={stat.label+stat.value}>
                            <p className='hidden max-[1125px]:block max-md:hidden max-sm:block text-gray-400 text-[13px] max-sm:text-xs group-hover:text-gray-600 dark:group-hover:text-gray-600 transition-all duration-500 tracking-wider uppercase'>{stat.label}</p>
                            <p className='text-gray-600 dark:text-gray-300 text-[13px] max-sm:text-xs group-hover:text-gray-400 dark:group-hover:text-gray-950 transition-all duration-500'>{stat.value}</p>
                        </div>
                    ))
                }
            </div>

        </div>
    )
}

export default PostCard