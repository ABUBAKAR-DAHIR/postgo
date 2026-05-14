"use client"
import { cn } from '@/lib/utils'
import { useTheme } from 'next-themes'
import Image from 'next/image'

export type SideElementT = {
    title: string
    icon: string
    icon_dark: string
    sideClassName?: string
    titleClassName?: string
}
function SideElement({title, icon, icon_dark, titleClassName, sideClassName} : SideElementT) {
    const {theme} = useTheme()
  return (
    <div className={cn('flex gap-2 py-3.5 px-2 pl-4 w-full hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black capitalize text-[13.5px] cursor-pointer rounded-md group ease-in-out transition-all duration-500', sideClassName)}>
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
    </div>
  )
}

export default SideElement
// {
//     theme === "light" ? 
//     <Image src={icon} width={15} height={20} alt={title} />
//     :
//     <Image src={icon} width={20} height={20} alt={title} />
// }