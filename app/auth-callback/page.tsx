import { syncUserAction } from '@/actions/auth.action'
import { Spinner } from '@/components/ui/spinner'
import Image from 'next/image'
import { redirect } from 'next/navigation'
import React from 'react'

async function page() {
    const user = await syncUserAction()

    if(!user) redirect("/login")
    if(user) redirect("/")
        
    return (
        <div className="w-full h-screen flex flex-col items-center justify-center">
            <div className="w-1/3 h-fit border-2 flex flex-col items-center justify-center rounded-md py-16 px-4 max-lg:py-8 max-lg:w-1/2 max-md:w-4/5">
                <div className="flex gap-2 items-center justify-center">
                    <Image src="/logo.svg" width={38} height={30} alt="logo"/>
                    <h2 className="text-lg font-semibold uppercase">postGo</h2>
                </div>
                <div className="mb-8 mt-10">
                    <p className="text-center capitalize">please login or signup to access the platform</p>
                </div>
                <div className="w-full flex flex-col gap-4 items-center justify-center">
                    <Spinner className="size-14" />
                    <p>Logging you in...</p>
                </div>
            
            </div>
        </div>
    )
}

export default page