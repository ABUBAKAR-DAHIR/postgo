import React, { ReactNode } from 'react'
import Sidebar from './Sidebar'
import DashboardHeader from './DashboardHeader'

export default function DashboardLayout({children} : {children: ReactNode}) {
  return (
    <div className='w-screen h-screen flex overflow-clip'>
        <Sidebar />

        <div className='flex flex-col overflow-hidden w-full'>
            <DashboardHeader />
            <div className="flex-1 overflow-y-auto w-full max-md:w-screen max-md:pt-4 h-full z-1 overflow-auto px-4">
                {children}
            </div>
        </div>
    </div>
  )
}
