import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { CommentCardT } from '@/types/types'
import { Bookmark, MailOpen, Trash2 } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

function CommentCard({
  commentAuthorImage,
  commentAthorName,
  commentDate,
  commentContent,
  likes,
  replies,
  postUrl
}: CommentCardT) {
  return (
    <div className='flex justify-center items-center mb-1 '>
        <div className="w-full flex gap-2 items-center">
          <Checkbox className='cursor-pointer size-6 max-md:size-5'/>
          
          <div className='w-full flex flex-1 items-center border-t border-t-gray-400 py-6 rounded-2xl justify-between px-2 group hover:bg-black dark:hover:bg-gray-300 cursor-pointer transition-all ease-in-out duration-500 max-sm:flex-col max-sm:gap-2 max-sm:py-4'>
              <div className="flex gap-4 flex-wrap">
                {/* AuthorImage */}
                <div className='relative size-16 w-16 h-16'>
                  <Image src={commentAuthorImage} fill alt='author_image' className='min-w-max size-full rounded-full bg-gray-400 dark:bg-gray-300'/>
                </div>

                {/* Name */}
                <div className='flex flex-col gap-1'>
                  <div className="flex items-center gap-4 flex-wrap">
                    <p className='flex flex-wrap font-semibold group-hover:text-white dark:group-hover:text-black'>{commentAthorName}</p>
                    <p className='flex flex-wrap text-xs text-gray-400'>{commentDate}</p>
                  </div>

                  {/* Content */}
                  <p className='max-w-lg text-xs text-gray-400 group-hover:text-white dark:group-hover:text-black line-clamp-1 max-md:line-clamp-2'>{commentContent}</p>

                  {/* stats */}
                  <div className="flex items-center flex-wrap">
                    <div className='flex'>
                      <p className='text-xs text-gray-400 pr-2'>Likes: <span className='text-black font-semibold text-xs border-r-2 border-r-black px-2 group-hover:text-white dark:group-hover:text-black'>{likes}</span></p>
                      <p className='text-xs text-gray-400'>Replies: <span className='text-black font-semibold text-xs px-2 group-hover:text-white dark:group-hover:text-black'>{replies}</span></p>
                    </div>

                    {/* Buttons */}
                    <div className='flex gap-2'>
                      <Link href={`/posts/${postUrl}`} className='text-postgo-sec text-[10px] underline capitalize cursor-pointer'>view post</Link>
                      <button className='text-postgo-sec text-[10px] underline capitalize cursor-pointer'>reply post</button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className='flex items-center'>
                <Button variant="ghost" className='cursor-pointer text-postgo-sec hover:text-red-900 group-hover:hover:bg-gray-300'><Bookmark className='font-extralight size-4.5' strokeWidth={1.2}/></Button>
                <Button variant="ghost" className='cursor-pointer text-postgo-sec hover:text-red-900 group-hover:hover:bg-gray-300'><MailOpen className='font-extralight size-4.5' strokeWidth={1.2}/></Button>
                <Button variant="ghost" className='cursor-pointer text-postgo-sec hover:text-red-900 group-hover:hover:bg-gray-300'><Trash2 className='font-extralight size-4.5' strokeWidth={1.2}/> </Button>
              </div>

          </div>
        </div>
        
    </div>
  )
}

export default CommentCard