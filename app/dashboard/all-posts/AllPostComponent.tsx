"use client"
import { Button } from '@/components/ui/button'
import { Clock, Eye, EyeIcon, EyeOffIcon, PenLine, StretchHorizontal, Trash2 } from 'lucide-react'
import Image from 'next/image'
import React, { useState } from 'react'

function AllPostComponent() {
    const [visibility, setVisibility] = useState<boolean>(false) 
    const post = "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Illum incidunt quam voluptatum rerum voluptate ut, doloremque ab, in dicta ducimus nulla commodi tempore illo sint soluta! In aut sapiente distinctio."       
    return (
        <div className='border-t border-t-postgo-sec rounded-2xl py-2 px-3 flex justify-around gap-x-4 items-center'>
            <p className='font-semibold text-gray-600 text-sm'>01</p>

            {/* Thumbnail image */}
            <div className='flex flex-col items-center justify-center gap-y-2'>
                <div className="relative size-15 rounded-full">
                    <Image src="/dashboard/profile-placeholder.png" fill alt='Thumbnail image' className='object-contain'/>
                </div>
                <p className='font-semibold text-gray-600 text-sm'>Author Name</p>

            </div>

            {/* Post Info */}
            <div className='w-2/5'>
                <p className='capitalize font-semibold py-2 text-[16.5px]'>post title</p>
                <div className="flex gap-4">
                    <p className='flex gap-x-1 text-sm items-center justify-center text-[13px]'><Clock className='size-3.5'/> 10 mint read</p>
                    <p className='flex gap-x-1 text-sm items-center justify-center text-[13px]'><StretchHorizontal className='size-3.5'/> category name</p>
                </div>

                <p className='w-4/5 text-[13px]'>{post.length < 100 ? post : `${post.slice(0, 100)}...`}</p>
                {/* buttons */}
                <div className="flex gap-3">
                    <Button variant="ghost" className='w-fit cursor-pointer text-xl' onClick={() => setVisibility((prev) => !prev)}>
                        {
                            visibility ? <EyeOffIcon  className="text-postgo-sec"/> : <EyeIcon className="text-postgo-sec" />
                        }
                    </Button>
                    <Button variant="ghost" className='w-fit cursor-pointer text-xl text-postgo-sec hover:text-postgo-sec' onClick={() => {}}><PenLine /></Button>
                    <Button variant="ghost" className='w-fit cursor-pointer text-xl text-postgo-sec hover:text-postgo-sec' onClick={() => {}}><Trash2 /></Button>
                    
                </div>
            </div>

            <div className="flex w-42/100 justify-between">
                {/* Time */}
                <p className='text-gray-600 text-[13px]'>25 mins ago</p>

                {/* Comments */}
                <p className='text-gray-600 text-[13px]'>215</p>
                
                {/* Shares */}
                <p className='text-gray-600 text-[13px]'>215</p>

                {/* Impressions */}
                <p className='text-gray-600 text-[13px]'>215</p>

            </div>


        </div>
    )
}

export default AllPostComponent