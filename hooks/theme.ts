"use client"
import { useTheme } from "next-themes"

export const getTheme = () => {
    const {theme} = useTheme()
    return theme
}