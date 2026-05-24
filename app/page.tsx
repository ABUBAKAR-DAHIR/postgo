import { syncUserAction } from '@/actions/auth.action'
import { prisma } from '@/lib/prisma'
import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server'
import Link from 'next/link'
import { redirect } from 'next/navigation'
import React from 'react'
import { toast } from 'sonner'

export default async function Home() {
  const { isAuthenticated } = getKindeServerSession()
  
  const auth = await isAuthenticated()

  if(!auth) redirect("/login")

  const user = await syncUserAction()

  if(!user) {
    toast.error("failed to log in. please try again")
    redirect("/login")
  }
  
  redirect("/dashboard")

}
