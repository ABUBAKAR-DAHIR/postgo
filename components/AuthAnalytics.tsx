"use client"
import { analytics } from '@/lib/analytics'
import { useEffect } from 'react'

function AuthAnalytics({isNewUser} : {isNewUser: boolean}) {
    useEffect(() => {
        if(isNewUser) analytics.register()
        else analytics.login()
    }, [isNewUser])
    return null
}

export default AuthAnalytics