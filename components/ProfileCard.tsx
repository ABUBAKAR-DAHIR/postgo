"use client"
import { useKindeBrowserClient } from '@kinde-oss/kinde-auth-nextjs'
import { useQuery } from '@tanstack/react-query'
import Image from 'next/image'
import React from 'react'
import { Skeleton } from './ui/skeleton'

function ProfileCard() {
  const {getUser, isLoading} = useKindeBrowserClient()
  const user = getUser()

  console.log("user: ", user)
  // const isLoading = true

  if(isLoading) return (
    <div className='flex gap-1 items-center justify-center border p-1 rounded-md border-transparent hover:border-black dark:hover:border-white cursor-pointer flex-wrap'>
        <Skeleton className='size-8 rounded-full'/>
        <div className='flex flex-col gap-y-2'>
            <Skeleton className='w-10 h-3'/>
            <Skeleton className="w-full h-3" />
        </div>
    </div>  
  )
  

  return (
    <div className='flex gap-1 items-center justify-center border p-1 rounded-md border-transparent hover:border-black dark:hover:border-white cursor-pointer flex-wrap'>
        <div className="relative size-8 rounded-full overflow-clip">
            <Image src={user?.picture || ""} alt='profile' fill  sizes='7'/>
        </div>
        <div>
            <p className='capitalize text-[13px]'>{user?.given_name ?? "user"}</p>
            <p className="text-gray-600 text-[11px]">Admin</p>
        </div>
    </div>
  )
}

export default ProfileCard