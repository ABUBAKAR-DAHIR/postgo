"use client"
import { cn } from '@/lib/utils'
import { useTheme } from 'next-themes'
import Image from 'next/image'
import Link from 'next/link'

export type SideElementT = {
    title: string
    icon: string
    icon_dark: string
    sideClassName?: string
    titleClassName?: string
    notification?: boolean
    notificationClassName?: string
    href: string
    onClick?: () => void
}
function SideElement({title, icon, icon_dark, titleClassName, sideClassName, notification, notificationClassName, href} : SideElementT) {
    const {theme} = useTheme()
  return (
    // <div className="w-full flex justify-between items-center ">
        <Link className={cn('flex w-full justify-between items-center gap-2 py-3.5 px-2 pl-4 max-md:text-[13px] hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black capitalize text-[13.5px] cursor-pointer rounded-md group ease-in-out transition-all duration-500', sideClassName)} href={href}>
            <span className='flex gap-2'>
                <div className="relative w-3.75 h-5">
                    {
                        theme === "light" 
                        ?
                        <>
                            <Image src={icon} fill alt={title} className='object-contain opacity-100 group-hover:object-contain group-hover:opacity-0 transition-all ease-in-out duration-500'/>
                            <Image src={icon_dark} fill alt={title} className='object-contain opacity-0 group-hover:object-contain group-hover:opacity-100 transition-all ease-in-out duration-500'/>
                        </>
                        :
                        <>
                            <Image src={icon_dark} fill alt={title} className='object-contain opacity-100 group-hover:object-contain group-hover:opacity-0 transition-all ease-in-out duration-500'/>
                            <Image src={icon} fill alt={title} className='object-contain opacity-0 group-hover:object-contain group-hover:opacity-100 transition-all ease-in-out duration-500'/>
                        </>

                    }
                </div>
                <p className={titleClassName} >{title}</p>

            </span>
            {
                notification &&  <p className={cn('bg-postgo-sec text-[9px] text-center text-white rounded-full flex size-5 items-center justify-center mr-2', notificationClassName)}>{notification}</p>        
            }
    </Link>
  )
}

export default SideElement
// {
//     theme === "light" ? 
//     <Image src={icon} width={15} height={20} alt={title} />
//     :
//     <Image src={icon} width={20} height={20} alt={title} />
// }