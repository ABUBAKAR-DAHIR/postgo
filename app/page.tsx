import Link from 'next/link'
import React from 'react'

export default function Home() {
  return (
    <main>
      <div>Home</div>
      <Link href="/login">login</Link>
    </main>
  )
}
