import Image from 'next/image'
import React from 'react'

function ProfileCard() {
  return (
    <div className='flex gap-1 items-center justify-center border p-1 rounded-md border-transparent hover:border-black dark:hover:border-white cursor-pointer flex-wrap'>
        <div className="relative size-7">
            <Image src="/dashboard/profile-placeholder.png" alt='profile' fill  sizes='7'/>
        </div>
        <div>
            <p className='capitalize text-[13px]'>katie pena</p>
            <p className="text-gray-600 text-[11px]">Admin</p>
        </div>
    </div>
  )
}

export default ProfileCard