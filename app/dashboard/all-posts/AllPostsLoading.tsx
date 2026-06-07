"use client"
import { Button } from '@/components/ui/button'
import { Skeleton } from '@/components/ui/skeleton'
import { PostCardT } from '@/types/types'
import { Clock, EyeIcon, PenLine, StretchHorizontal, Trash2 } from 'lucide-react'
import Image from 'next/image'
import React, { useState } from 'react'

function AllPostsLoading() {
  return (
    <div className='flex max-[1125px]:flex-col max-md:flex-row max-sm:flex-col gap-x-2 p-4 border-t border-t-postgo-sec rounded-2xl w-full cursor-pointer duration-500 ease-in-out transition-all'>
        {/* post info */}
        <div className='flex flex-3 gap-4 items-center max-[391px]:flex-wrap'>

            <Skeleton className='size-7 max-md:size-6 aspect-square'/>
            {/* Author */}
            <div className='flex flex-col items-center justify-center gap-y-2 min-w-max'>
                <div className="relative size-20 max-md:size-18 rounded-full overflow-clip">
                    {/* <Image src="/dashboard/profile-placeholder.png" fill alt='Thumbnail image' className='object-contain'/> */}
                    {/* <div className='absolute w-full h-full bg-gray-300 group-hover:bg-gray-700 rounded-full'/> */}
                    <Skeleton className='size-full' />
                </div>
                <Skeleton className='w-full h-5'/>

            </div>

            {/* Post Info */}
            <div className='flex flex-col w-full bg-red min-w-0 gap-y-1'>
                <Skeleton className='w-full h-6'/>
                <div className="flex gap-y-1 gap-x-4 my-1 flex-wrap">
                    <Skeleton className='w-30 h-3'/>
                    <Skeleton className='w-30 h-3'/>
                </div>

                {/* <p className='max-w-lg text-sm group-hover:text-white/80 dark:group-hover:text-gray-600 transition-all duration-500'>{post.length < 100 ? post : `${post.slice(0, 120)}...`}</p> */}
                <Skeleton className='w-full h-10'/>
                {/* buttons */}
                <div className="flex gap-3 max-sm:my-2">
                    <Skeleton className='size-7.5 aspect-square'/>
                    <Skeleton className='size-7.5 aspect-square'/>
                    <Skeleton className='size-7.5 aspect-square'/>
                </div>
                {/* <p className='max-w-xl'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptas omnis, doloribus autem dolore, inventore officia laborum voluptate quos officiis sit nisi nesciunt aut natus esse unde. Ipsum eos et nostrum!</p> */}
            </div>

        </div>

        {/* stats */}
        <div className="w-full border-t-gray-300 group-hover:border-t-gray-200 max-[1125px]:border-t max-md:border-t-0 max-sm:border-t transition-all duration-500 ease-in-out my-2 py-2 flex flex-wrap flex-2 gap-4 md:gap-14 justify-between items-center ">
            {
                Array.from({length: 3}).map((stat, i) => (
                    <div key={i} className='flex flex-col gap-y-2'>
                        <Skeleton className='hidden max-[1125px]:block max-md:hidden max-sm:block text-gray-400 text-[13px] max-sm:text-xs group-hover:text-gray-600 dark:group-hover:text-gray-600 transition-all duration-500 tracking-wider uppercase w-20 h-6' />
                        <Skeleton className='text-gray-600 dark:text-gray-300 text-[13px] max-sm:text-xs group-hover:text-gray-400 dark:group-hover:text-gray-950 transition-all duration-500 w-20 h-6' />
                    </div>
                ))
            }
        </div>

    </div>
  )
}

export default AllPostsLoading