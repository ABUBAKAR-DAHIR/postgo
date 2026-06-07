"use client"
import { Button } from './ui/button'
import { useTheme } from 'next-themes'
import {Moon, Sun} from "lucide-react"
import { Tooltip, TooltipContent, TooltipTrigger } from './ui/tooltip'

export default function Themer() {
    const {theme, setTheme} = useTheme()
    // console.log(theme)
    return (
        <Tooltip delayDuration={300}>
            <TooltipTrigger asChild>
                <Button onClick={() => setTheme(theme === 'light' ? 'dark' : 'light') } className='ring py-3 px-2  bg-white text-black  dark:border-white dark:bg-black dark:text-white hover:bg-black hover:text-white dark:hover:bg-white hover:dark:text-black transition-all duration-500 ease-in-out  cursor-pointer'>
                    {
                        theme === 'light' ? <Moon /> : <Sun />
                    }
                </Button>
            </TooltipTrigger>

            <TooltipContent>
                <p>change the theme</p>
            </TooltipContent>
        </Tooltip>
    )
}

