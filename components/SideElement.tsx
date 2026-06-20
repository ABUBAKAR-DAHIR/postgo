"use client"
import { cn } from '@/lib/utils'
import { SideElementT } from '@/types/types'
import { useTheme } from 'next-themes'
import Image from 'next/image'
import Link from 'next/link'
import { useEffect } from 'react'
import { useWebHaptics } from 'web-haptics/react'

function SideElement({
    title, 
    icon, 
    icon_dark, 
    titleClassName, 
    sideClassName, 
    notification, 
    notificationClassName, 
    active,
    href,
    tab,
    onClick
} : SideElementT) {
    const {theme} = useTheme()
    const {trigger} = useWebHaptics()
    // console.log("Active: ", active)
    // useEffect(() => {
    //     console.log("Tab: ", tab)
    //     console.log("href: ", href)
    // }, [href, tab])

    const isSelected = tab == href

    const userDarkIcon = (theme === "light" && isSelected) || (theme === "dark" && !isSelected);

    return (
        // <div className="w-full flex justify-between items-center ">
            <Link className={cn('flex w-full justify-between items-center gap-2 py-3.5 px-2 pl-4 max-md:text-[13px] hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black capitalize text-[13.5px] cursor-pointer rounded-md group ease-in-out transition-all duration-500', sideClassName, isSelected && "bg-black dark:bg-white text-white dark:text-black")} href={href} onClick={onClick}>
                <span className='flex gap-2'>
                    <div className="relative w-3.75 h-5">
                        {
                            userDarkIcon
                            ?
                            <>
                                <Image src={icon_dark} fill alt={title} className='object-contain opacity-100 group-hover:object-contain group-hover:opacity-0 transition-all ease-in-out duration-500'/>
                                <Image src={icon} fill alt={title} className='object-contain opacity-0 group-hover:object-contain group-hover:opacity-100 transition-all ease-in-out duration-500'/>
                            </>
                            :
                            <>
                                <Image src={icon} fill alt={title} className={cn('object-contain opacity-100 group-hover:object-contain transition-all ease-in-out duration-700', )}/>
                            </>

                            // <>
                            //     <Image src={icon} fill alt={title} className={cn('object-contain opacity-100 group-hover:object-contain group-hover:opacity-0 transition-all ease-in-out duration-500', )}/>
                            //     <Image src={icon_dark} fill alt={title} className={cn('object-contain opacity-0 group-hover:object-contain group-hover:opacity-100 transition-all ease-in-out duration-500', )}/>
                            // </>
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