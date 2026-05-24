import Image from 'next/image'
import React from 'react'
import { Button } from './ui/button'
import { Heart, LucideMove3D } from 'lucide-react'

function TopCommentCard() {
  return (
    <div className='flex gap-2 w-full max-w-80 pb-4 border-b'>
        <div className="relative size-10 h-12 w-18 max-sm:w-24 rounded-full mt-2">
            <Image src="/dashboard/profile-placeholder.png" fill alt='profile photo' />    
        </div>

        <div className='max-sm:px-2'>
            <div className="flex justify-between items-center">
                <p className="font-semibold">Esther Howard</p>
                <button className='cursor-pointer capitalize text-gray-500 my-1 hover:underline text-xs font-medium'>view post</button>
                {/* <Button variant="ghost" className='cursor-pointer capitalize text-gray-500  bg-amber-500 p-0 py-0'>view post</Button> */}
            </div>

            <p className="text-gray-400 font-light text-sm mb-1 max-sm:text-xs">25 minutes ago</p>
            <p className='max-sm:text-[13px]'>Lorem ipsum dolor sit amet, consectetur adipiscing elit sed do eiusmod.</p>

            <div className="flex gap-2 my-1.5">
                <Button variant="ghost" className='cursor-pointer'><Heart className='fill-postgo-sec cursor-pointer text-postgo-sec size-6' /></Button>
                <Button variant="link" className='font-semibold text-gray-500 capitalize p-0 m-0 flex items-center justify-center cursor-pointer'>reply</Button>
            </div>
        </div>

    </div>
  )
}

export default TopCommentCard