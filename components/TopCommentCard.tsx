"use client"
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import { Button } from './ui/button'
import { Heart, LucideMove3D } from 'lucide-react'
import Link from 'next/link'
import { TopCommentsCardT } from '@/types/types'
import { Skeleton } from './ui/skeleton'
import { cn } from '@/lib/utils'
import { useMutation } from '@tanstack/react-query'
import axios from 'axios'
import { Spinner } from './ui/spinner'

function TopCommentCard({
    image,
    fullName,
    postUrl,
    timeAgo,
    content,
    commentLikes,
    loading,
    liked,
    likeFn,
    likeLoading
}: TopCommentsCardT ) {

    if(loading) return (
        <div className='flex gap-2 w-full max-w-80 pb-4 border-b'>
            <Skeleton className="h-10 w-12 rounded-full mt-2" />

            <div className='max-sm:px-2 w-full'>
                <div className="flex justify-between items-center w-full">
                    <Skeleton className="h-6 w-full capitalize" />
                    <Skeleton className='my-1 w-fit h-6' />
                    {/* <Button variant="ghost" className='cursor-pointer capitalize text-gray-500  bg-amber-500 p-0 py-0'>view post</Button> */}
                </div>

                <Skeleton className="mb-1 h-2 w-2/3" />
                <Skeleton className='h-20 w-full' />

                <div className="flex gap-2 my-1.5">
                    <Skeleton className='size-7 aspect-square' />
                    <Skeleton className='size-7 aspect-square' />
                </div>
            </div>

        </div>
    )
        
    return (
        <div className='flex gap-2 w-full max-w-80 py-1 border-b'>
            <div className="relative h-10 w-12 rounded-full mt-2 mr-2">
                <Image src={image!} fill alt='profile photo' className='rounded-full' />    
            </div>

            <div className='max-sm:px-2 w-full'>
                <div className="flex justify-between items-center w-full">
                    <p className="font-semibold truncate flex-1 w-full capitalize">{fullName}</p>
                    <Link href={`/posts/${postUrl}`} className='cursor-pointer capitalize text-gray-500 my-1 hover:underline text-xs font-medium w-fit'>view post</Link>
                    {/* <Button variant="ghost" className='cursor-pointer capitalize text-gray-500  bg-amber-500 p-0 py-0'>view post</Button> */}
                </div>

                <p className="text-black/50 dark:text-gray-400 font-light text-sm mb-1 max-sm:text-xs">{timeAgo}</p>
                <p className='max-sm:text-[13px]'>{content}</p>

                <div className="flex gap-2 my-1.5">
                    <Button variant="ghost" className='cursor-pointer' onClick={likeFn} >{likeLoading ? <Spinner className='sm:size-4.5 md:size-5'/> : <><Heart className={cn('cursor-pointer text-postgo-sec size-6', liked && "fill-postgo-sec")}/><span className='text-xs text-gray-600 dark:text-gray-300'>{commentLikes}</span></>}</Button>
                    <Button variant="link" className='font-semibold text-gray-500 capitalize p-0 m-0 flex items-center justify-center cursor-pointer'>reply</Button>
                </div>
            </div>

        </div>
    )
}

export default TopCommentCard