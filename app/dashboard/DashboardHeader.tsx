"use client"
import CustomInput from "@/components/CustomInput"
import ProfileCard from "@/components/ProfileCard"
import Themer from "@/components/Themer"
import { Input } from "@/components/ui/input"
import { Bell, Search } from "lucide-react"
import { useTheme } from "next-themes"
import Image from "next/image"

function DashboardHeader() {
  const {theme} = useTheme()
  return (
    <div className='flex justify-between p-4 border-b border-b-gray-300 max-md:flex-col max-md:gap-y-1'>
        <CustomInput 
          icon={<Search className="text-gray-800 dark:text-gray-400 absolute top-3 left-3 size-4 peer-focus:hidden peer-not-placeholder-shown:hidden pointer-events-none"/>}
          className="md:w-90"
        />

        <div className="flex gap-2 items-center justify-center">
          <Themer />
            {
                theme === "light" ?
                <Image src="/dashboard/help.svg" alt="help" width={23} height={23} className="cursor-pointer"/>
                :
                <Image src="/dashboard/help-dark.svg" alt="help" width={23} height={23} className="cursor-pointer"/>
            }
            <Bell className="text-black fill-black dark:fill-white dark:text-white size-5 cursor-pointer"/>
            <ProfileCard />
        </div>
    </div>
  )
}

export default DashboardHeader