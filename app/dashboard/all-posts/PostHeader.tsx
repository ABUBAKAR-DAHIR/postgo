import React from 'react'

function PostHeader() {
  return (
    <div className='w-full flex max-[1125px]:hidden max-md:flex max-sm:hidden justify-between mb-4'>
        <div className='flex flex-3 gap-30'>
            <p className='font-semibold capitalize'>no.</p>
            <p className='font-semibold capitalize'>Post</p>
        </div>
        <div className='flex flex-2 justify-between gap-2'>
            <p className='font-semibold capitalize text-sm'>Published</p>
            <p className='font-semibold capitalize text-sm'>Comments</p>
            <p className='font-semibold capitalize text-sm'>Shares</p>
            <p className='font-semibold capitalize text-sm'>Impressions</p>
        </div>
    </div>
  )
}

export default PostHeader