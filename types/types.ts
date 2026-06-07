import { Status } from "@/app/generated/prisma/enums"
import { ReactNode } from "react"

type Props = {
    placeholder?: string
} & React.InputHTMLAttributes<HTMLInputElement | HTMLTextAreaElement>



export type InputType = {
    className?: string
    label?: string
    icon?: ReactNode
    labelClassName?: string
    inputClassName?: string
    textArea?: boolean
    props?: Props
    value?: string
    onChange?: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void 
}

export type CreatePostT = {
    title: string
    description: string
    metaTag: string
    metaDescription: string
    metaKeywords: string[]
    categories: string[]
    status: Status
    url: string
    thumbnail: string
}


export type TopPostCardT = {
    thumbnail?: string
    title?: string
    id?: string
    url?: string
    timeAgo?: string
    comments?: string
    shares?: string
    className?: string
    loading?: boolean
}

export type TopCommentsCardT = {
    id?: string
    image?: string,
    fullName?: string,
    postUrl?: string,
    timeAgo?: string,
    content?: string
    commentLikes?: number
    loading?: boolean
    likeLoading?: boolean
    liked?: boolean
    likeFn?: () => void
}

export type PostCardT = {
    url: string
    count: string | number
    authorImage: string
    authorName: string
    postTitle: string
    postContent: string
    published: string | number
    comments: string | number 
    shares: string | number 
    impressions: string | number 
    loading?: boolean
}

export type PostTypeT = "all" | "trash" | "published"