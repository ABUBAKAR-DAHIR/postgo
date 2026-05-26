import { cn } from '@/lib/utils'
import { TopPostCardT } from '@/types/types'
import { PortalLink } from '@kinde-oss/kinde-auth-nextjs/components'
import { ArrowUpDown, Clock, LinkIcon, LucideSquareArrowOutUpRight, MessageCircleIcon, MessageCircleMore, Reply, Send, SquareArrowOutUpRight, Timer } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { Skeleton } from './ui/skeleton'

function TopPostCard({
  thumbnail,
  title,
  url,
  timeAgo,
  comments,
  shares,
  loading,
  className

}: TopPostCardT) {
  if(loading) return ( 
    <div className={cn('w-80 h-82 max-[350px]:h-95 rounded-md', className)}>
        <Skeleton className='h-50 w-full' />

      <div className="flex py-2 gap-4">
        <Skeleton className='h-8 flex-1' />
        <Skeleton className='size-8' />
      </div>

      <Skeleton className='flex gap-2 mb-2 h-4 w-2/3' />

      <div className="flex justify-between">
        <Skeleton className='size-8' />
        <Skeleton className='size-8' />
        <Skeleton className='size-8' />
      </div>
    </div>
  )
  return (
    <div className={cn('w-80 h-82 max-[350px]:h-95 rounded-md', className)}>
      <div className="relative h-50 w-full">
        <Image src={`${thumbnail!}`} fill alt='image' className='rounded-md'/>
        {/* <Image src="/img.png"  fill alt='image' /> */}
      </div>

      <div className="flex py-2">
        <p className='font-bold text-[15px] flex-1'>{title}</p>
        <Link href={`/posts/${url}`} className='size-9 p-2 bg-postgo-sec rounded-md cursor-pointer'>
          <LucideSquareArrowOutUpRight className='size-5 text-white font-bold cursor-pointer'/>
        </Link>
      </div>

      <p className='flex gap-2 mb-2'><Clock className='size-4.5 cursor-pointer'/> <span className='text-gray-500'>{timeAgo}</span></p>

      <div className="flex justify-between">
        <p className='flex gap-2'><MessageCircleMore className='size-4.5 cursor-pointer'/> <span>{comments}</span></p>
        <p className='flex gap-2'><ArrowUpDown className='size-4.5 cursor-pointer'/> <span>{shares}</span></p>
        <p className='flex gap-2'><Send className='size-4.5 cursor-pointer'/> <span>{shares}</span></p>
      </div>
    </div>
  )
}

export default TopPostCard