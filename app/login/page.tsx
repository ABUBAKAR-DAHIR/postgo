import {RegisterLink, LoginLink} from "@kinde-oss/kinde-auth-nextjs/components";

import React from 'react'

export default function page() {
  return (
    <div>
        <LoginLink>Sign in</LoginLink>

        <RegisterLink>Sign up</RegisterLink>
    </div>
  )
}
