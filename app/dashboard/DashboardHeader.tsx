"use client"
import CustomInput from "@/components/CustomInput"
import ProfileCard from "@/components/ProfileCard"
import Themer from "@/components/Themer"
import { Input } from "@/components/ui/input"
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip"
import { Bell, Search } from "lucide-react"
import { useTheme } from "next-themes"
import Image from "next/image"

function DashboardHeader() {
  const {theme} = useTheme()
  return (
    <div className='flex justify-between p-4 border-b border-b-gray-300 max-md:flex-col max-md:gap-y-1'>
        <CustomInput 
          icon={<Search className="!text-gray-900! dark:text-gray-800 absolute top-3 left-3 size-4 peer-focus:hidden peer-not-placeholder-shown:hidden pointer-events-none"/>}
          className="md:w-90 max-md:ml-8"
          inputClassName="text-gray-700!"
        />

        <div className="flex gap-2 items-center justify-center">
          <Themer />

          <Tooltip delayDuration={100}>
              <TooltipTrigger asChild>
                  {
                      theme === "light" ?
                      <Image src="/dashboard/help.svg" alt="help" width={23} height={23} className="cursor-pointer"/>
                      :
                      <Image src="/dashboard/help-dark.svg" alt="help" width={23} height={23} className="cursor-pointer"/>
                  }
              </TooltipTrigger>

              <TooltipContent>
                  <p>help</p>
              </TooltipContent>
          </Tooltip>

          <Tooltip delayDuration={100}>
              <TooltipTrigger asChild>
                <Bell className="text-black fill-black dark:fill-white dark:text-white size-5 cursor-pointer"/>                  
              </TooltipTrigger>

              <TooltipContent>
                  <p>Notifications</p>
              </TooltipContent>
          </Tooltip>

          <Tooltip delayDuration={300}>
              <TooltipTrigger>
                <ProfileCard />                  
              </TooltipTrigger>

              <TooltipContent>
                  <p>Profile</p>
              </TooltipContent>
          </Tooltip>
        </div>
    </div>
  )
}

export default DashboardHeader