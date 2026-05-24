"use client"
import { getTheme } from '@/hooks/theme'
import { cn } from '@/lib/utils'
import { Triangle } from 'lucide-react'
import Image from 'next/image'
import React from 'react'
import { Skeleton } from './ui/skeleton'

function DashComponent({
    image,
    count,
    title,
    rate,
    loading =true

}: {image: string, count: number, title: string, rate: number, loading?: boolean}) {
    const theme = getTheme()

    if(loading) return (
        <div className='w-64 h-24 ring-1 ring-foreground/20 rounded-md flex items-center hover:ring-postgo-sec duration-500'>
            <Skeleton className='mx-auto -mr-1 w-16 h-16'/>
            <div className='flex flex-col mx-auto gap-2'>
                <div className="w-full flex flex-1 justify-between items-center gap-6">
                    <Skeleton className='text-xl font-semibold w-full h-7' />
                </div>
                <Skeleton className='h-6 w-30' />
            </div>
        </div>
    )
        
    return (
        <div className='w-64 h-24 ring-1 ring-foreground/20 rounded-md flex items-center hover:ring-postgo-sec duration-500'>
            <Image src={theme === 'light' ? `/dashboard/${image}` : `/dashboard/${image}-dark`} width={48} height={48} alt='pos' className='mx-auto -mr-1'/>
            <div className='flex  flex-col mx-auto'>
                <div className="w-full flex flex-1 justify-between items-center gap-10">
                    <p className='text-xl font-semibold'>{count}</p>
                    <p className='text-sm font-bold flex gap-2'><Triangle className={cn("size-3", rate >= 0 ? 'text-green-500 fill-green-500' : 'text-red-500 fill-red-500')}/> <span className={cn("text-xs", rate >= 0? 'text-green-500' : 'text-red-500')}>{rate}%</span></p>
                </div>
                <p className='text-sm text-gray-600'>{title}</p>
            </div>
        </div>
    )
}

export default DashComponent