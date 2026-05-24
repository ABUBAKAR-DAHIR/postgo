import { cn } from '@/lib/utils'
import { PortalLink } from '@kinde-oss/kinde-auth-nextjs/components'
import { ArrowUpDown, Clock, Link, Link2, LinkIcon, LucideSquareArrowOutUpRight, MessageCircleIcon, MessageCircleMore, Reply, Send, SquareArrowOutUpRight, Timer } from 'lucide-react'
import Image from 'next/image'
import React from 'react'

function TopPostCard({
  className
}: {className?: string}) {
  return (
    <div className={cn('w-80 h-82 rounded-md', className)}>
      <div className="relative h-50 w-full">
        <Image src={`/img.png`} fill alt='image' />
      </div>

      <div className="flex py-2">
        <p className='font-bold text-[15px]'>Star Sun Hotel & Apartment Star Sun Hotel & Apartment</p>
        <div className='size-9 p-2 bg-postgo-sec rounded-md cursor-pointer'>
          <LucideSquareArrowOutUpRight className='size-5 text-white font-bold cursor-pointer'/>
        </div>
      </div>

      <p className='flex gap-2 mb-2'><Clock className='size-4.5 cursor-pointer'/> <span className='text-gray-500'>2 hours ago</span></p>

      <div className="flex justify-between">
        <p className='flex gap-2'><MessageCircleMore className='size-4.5 cursor-pointer'/> <span>34</span></p>
        <p className='flex gap-2'><ArrowUpDown className='size-4.5 cursor-pointer'/> <span>567</span></p>
        <p className='flex gap-2'><Send className='size-4.5 cursor-pointer'/> <span>567</span></p>
      </div>
    </div>
  )
}

export default TopPostCard