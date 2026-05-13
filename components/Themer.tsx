"use client"
import { Button } from './ui/button'
import { useTheme } from 'next-themes'
import {Moon, Sun} from "lucide-react"

export default function Themer() {
    const {theme, setTheme} = useTheme()
    console.log(theme)
    return (
        <Button onClick={() => setTheme(theme === 'light' ? 'dark' : 'light') } className='border-2 py-3 px-2 border-black bg-white text-black  dark:border-white dark:bg-black dark:text-white hover:bg-black hover:text-white dark:hover:bg-white hover:dark:text-black transition-all duration-500 ease-in-out  cursor-pointer'>
            {
                theme === 'light' ? <Moon /> : <Sun />
            }
        </Button>
    )
}
