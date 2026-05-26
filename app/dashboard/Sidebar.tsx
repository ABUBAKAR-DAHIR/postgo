"use client"
import SideElement, { SideElementT } from '@/components/SideElement'
import { cn } from '@/lib/utils'
import { X } from 'lucide-react'
import { useTheme } from 'next-themes'
import Image from 'next/image'
import React, { useState } from 'react'
import { useWebHaptics } from 'web-haptics/react'


// These are the basic details that every component in the sidebar has.
const sideElements = [
    {
        icon: "/dashboard/overview.svg",
        icon_dark: "/dashboard/overview-dark.svg",
        title: "overview",
        href: "/"
    },
    {
        icon: "/dashboard/create-post.svg",
        icon_dark: "/dashboard/create-post-dark.svg",
        title: "create post",
        href: "create-post/"
    },
    {
        icon: "/dashboard/all-posts.svg",
        icon_dark: "/dashboard/all-posts-dark.svg",
        title: "all posts",
        href: "all-posts"
    },
    {
        icon: "/dashboard/subscribers.svg",
        icon_dark: "/dashboard/subscribers-dark.svg",
        title: "subscribers",
        href: "subscribers/"
    },
    {
        icon: "/dashboard/service.svg",
        icon_dark: "/dashboard/service-dark.svg",
        title: "new service",
        href: "new-service/"
    },
    {
        icon: "/dashboard/comments.svg",
        icon_dark: "/dashboard/comments-dark.svg",
        title: "comments",
        href: "comments/"
    },
    {
        icon: "/dashboard/categories.svg",
        icon_dark: "/dashboard/categories-dark.svg",
        title: "category page",
        href: "category-page"
    },
    {
        icon: "/dashboard/contact.svg",
        icon_dark: "/dashboard/contact-dark.svg",
        title: "contact us",
        href: "contact-us"
    },
    {
        icon: "/dashboard/portfolio-post.svg",
        icon_dark: "/dashboard/portfolio-post-dark.svg",
        title: "portfolio post",
        href: "portfolio-post"
    },
    {
        icon: "/dashboard/tickets.svg",
        icon_dark: "/dashboard/tickets-dark.svg",
        title: "tickets",
        href: "tickets"
    },
    {
        icon: "/dashboard/settings.svg",
        icon_dark: "/dashboard/settings-dark.svg",
        title: "settings",
        href: "settings"
    },
    {
        icon: "/dashboard/all-page.svg",
        icon_dark: "/dashboard/all-page-dark.svg",
        title: "all page",
        href: "all-page"
    },
]

// This is the sidebar. Users can open it and close it 
/**
    For small devices, the screen is too small, so we hide the whole sidebar completely.
    For this, we use absolute positioning. we display the sidebar only when the user opens 
    it and is closed by default.

    Thus the ui for mobile devices is different from that of large screen devices

 */
export default function Sidebar() {
    const {theme} = useTheme()
    const [collapse, setCollapse] = useState<boolean>(false)
    const [mobileCollapse, setMobileCollapse] = useState<boolean>(true)
    const {trigger} = useWebHaptics()
    console.log(mobileCollapse)
    return (
        <div className={cn("max-md:h-fit")}>
            <div className={cn('border-r h-full border-r-gray-300 overflow-y-auto transition-all duration-500 ease-in-out max-md:hidden', collapse ? "w-17.5 transition-all duration-500 ease-in-out flex flex-col items-center" : "w-60")}>
                <div className="flex gap-2 items-center py-6 px-3">

                    <div className={cn("relative size-7.5 cursor-pointer border border-transparent rounded-md hover:border-black hover:dark:border-gray-400")} onClick={() => {setCollapse((prev) => !prev); trigger("success")}}>
                        {
                            theme === 'light' ?
                            <Image src="/dashboard/menu.svg" fill alt='menu_icon'  className='p-1'/>
                            :
                            <Image src="/dashboard/menu-dark.svg" fill alt='menu_icon' className='p-1' />
                        }
                    </div>
                    <Image src="/logo.svg" width={20} height={20} alt="logo" className={cn(collapse && "hidden")}/>
                    <h2 className={cn("text-[16px] font-bold uppercase", collapse && 'hidden')}>logo</h2>
                </div>


                {/* listing the sidebar element buttons*/}
                <div className='px-2'>
                    {
                        sideElements.map((sideElement: SideElementT) => (
                            <SideElement 
                                key={`${sideElement.title}-${sideElement.icon}`}
                                icon = {sideElement.icon}
                                icon_dark = {sideElement.icon_dark}
                                title = {sideElement.title}
                                titleClassName={cn(collapse && 'hidden')}
                                sideClassName={cn(collapse && 'flex items-center justify-center w-full pl-2 px-4')}
                                notificationClassName={cn(collapse && "hidden opacity-0" )}
                                href = {`/dashboard/${sideElement.href}`}
                            />
                        ))
                    }
                </div>
            </div>
            
            {/* Mobile devices */}
            <div className='hidden max-md:block'>
                <div className={cn("fixed top-0 z-99 left-0 right-0 h-10 w-screen bg-white dark:bg-black size-7.5 block my-6 mx-3 cursor-pointer border border-transparent rounded-md hover:border-black hover:dark:border-gray-400 ", mobileCollapse ? "opacity-100" : "opacity-0 pointer-events-none")} onClick={() => {setMobileCollapse((prev) => !prev); trigger("success")}}>
                    {
                        theme === 'light' ?
                        <Image src="/dashboard/menu.svg" fill alt='menu_icon'  className='p-1'/>
                        :
                        <Image src="/dashboard/menu-dark.svg" fill alt='menu_icon' className='p-1' />
                    }
                </div>
                <div className={cn('border-r border-r-gray-300 overflow-y-auto transition-all duration-500 ease-in-out fixed z-99 inset-0 bg-white dark:bg-black', mobileCollapse ? "w-0 transition-all duration-500 ease-in-out flex flex-col items-center" : "w-57.5")}>
                    <div className="flex gap-2 items-center py-6 px-3">

                        <X className={cn("size-7 cursor-pointer border border-transparent rounded-md p-1 hover:border-black dark:hover:border-white", theme === "light" ? "text-black" : "text-white")} onClick={() => {setMobileCollapse(true); trigger("success")}}/>

                        <Image src="/logo.svg" width={20} height={30} alt="logo" className={cn(mobileCollapse && "hidden")}/>
                        <h2 className={cn("text-[16px] font-bold uppercase", mobileCollapse && 'hidden')}>logo</h2>
                    </div>


                    {/* listing the sidebar element buttons */}
                    <div className='px-2'>
                        {
                            sideElements.map((sideElement: SideElementT) => (
                                <SideElement 
                                    key={`${sideElement.title}-${sideElement.icon}`}
                                    icon = {sideElement.icon}
                                    icon_dark = {sideElement.icon_dark}
                                    title = {sideElement.title}
                                    titleClassName={cn(mobileCollapse && 'hidden')}
                                    sideClassName={cn(mobileCollapse && 'flex items-center justify-center w-full pl-2 px-4')}
                                    href = {`/dashboard/${sideElement.href}`}
                                />
                            ))
                        }
                    </div>
                </div>
            </div>

        </div>
  )
}
