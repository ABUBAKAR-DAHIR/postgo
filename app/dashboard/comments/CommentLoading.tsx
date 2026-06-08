import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { Skeleton } from '@/components/ui/skeleton'
import { CommentCardT } from '@/types/types'
import { Bookmark, MailOpen, Trash2 } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

function CommentLoading(){
  return (
    <div className='flex justify-center items-center mb-1 '>
        <div className="w-full flex gap-4 items-center">
          <Skeleton className='size-6 max-md:size-5 aspect-square'/>
          
          <div className='w-full flex flex-1 items-center border-t border-t-gray-400 py-6 rounded-2xl justify-between px-2 cursor-pointer transition-all ease-in-out duration-500 max-sm:flex-col max-sm:gap-2 max-sm:py-4'>
              <div className="flex gap-4 flex-wrap">
                {/* AuthorImage */}
                <Skeleton className='sm:size-16 max-sm:size-14 max-[310px]:size-4 rounded-full  max-[310px]:mx-auto ' />

                {/* Name */}
                <div className='flex flex-col gap-1 flex-wrap'>
                  <div className="flex items-center gap-4 flex-wrap  max-[310px]:justify-center  max-[310px]:w-full">
                    <Skeleton className='w-16 h-4  max-[310px]:w-13'/>
                    <Skeleton className='w-16 h-4  max-[310px]:w-13'/>
                    </div>

                  {/* Content */}
                   <Skeleton className='flex-1 xl:w-80 w-50 min-w-50 h-16 max-sm:w-20 max-[310px]:w-4'/>

                  {/* stats */}
                  <div className="flex items-center flex-wrap">
                    <div className='flex flex-wrap'>
                        <Skeleton className='w-8 h-4 max-[310px]:w-6 max-[310px]:h-4'/>
                        <Skeleton className='w-8 h-4 max-[310px]:w-6 max-[310px]:h-4'/>                        
                    </div>

                    {/* Buttons */}
                    <div className='flex gap-2 flex-wrap'>
                        <Skeleton className='w-8 h-4'/>                        
                        <Skeleton className='w-8 h-4'/>                        
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className='flex items-center gap-2'>
                <Skeleton className='size-7.5 aspect-square'/>                        
                <Skeleton className='size-7.5 aspect-square'/>                        
                <Skeleton className='size-7.5 aspect-square'/>    
              </div>

          </div>
        </div>
        
    </div>
  )
}

export default CommentLoading