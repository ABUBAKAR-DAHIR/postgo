import React, { ReactNode } from 'react'
import Sidebar from './Sidebar'

export default function DashboardLayout({children} : {children: ReactNode}) {
  return (
    <div className='w-screen h-screen flex'>
        <Sidebar />
        {children}
    </div>
  )
}
