import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server'
import Link from 'next/link'
import { redirect } from 'next/navigation'
import React from 'react'

export default async function Home() {
  const { getUser, isAuthenticated } = getKindeServerSession()
  
  const user = await getUser()
  const auth = await isAuthenticated()

  if(!auth) redirect("/login")

  else redirect("/dashboard")
}
