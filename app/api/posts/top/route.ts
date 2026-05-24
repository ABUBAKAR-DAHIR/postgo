import { prisma } from "@/lib/prisma"
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server"
import { NextResponse } from "next/server"

export async function GET(){
    try {

        const {getUser} = getKindeServerSession()
    
        const kindeUser = await getUser()
        if(!kindeUser) return NextResponse.json(
            {error: "Missing items"},
            {status: 400}
        )

        const user = await prisma.user.findUnique({
            where: {kindeId: kindeUser.id}
        })

        if(!user) return NextResponse.json(
            {error: "User not found"},
            {status: 400}
        )

        const topPostsAll = await prisma.post.findMany({
            select: {
                id: true,
                thumbnail: true,
                title: true,
                createdAt: true,
                comments: true,
                shares: true,
                url: true,

                _count: {
                    select: {
                        likes: true,
                        comments: true
                    }
                }
            },

            orderBy: [
                {
                    likes: {
                        _count: "desc"
                    }
                },
                {
                    comments: {
                        _count: "desc"
                    }
                }
            ]

        })
        const now = new Date()

        const topPosts = topPostsAll.map((topPost) => {
            let timeAgo = ""

            const diffMs = now.getTime() - topPost.createdAt.getTime()
            const diffSeconds = Math.floor(diffMs/1000)
            const diffMinutes = Math.floor(diffMs/(1000 * 60))
            const diffHours = Math.floor(diffMs/(1000 * 60 * 60))
            const diffDays = Math.floor(diffMs/(1000 * 60 * 60 * 24))

            if(diffSeconds < 60){
                timeAgo = `${diffSeconds} seconds ago`
            }
            else if(diffMinutes < 60){
                timeAgo = `${diffMinutes} minutes ago`
            }
            else if(diffHours < 24){
                timeAgo = `${diffHours} hours ago`
            }
            else if(diffDays < 2) {
                timeAgo = `${diffDays} day ago`
            }
            else {
                timeAgo = `${diffDays} days ago`
            }

            // const commentsCount = topPost.comments.length

            return {
                ...topPost,
                timeAgo,
                comments: topPost.comments.length,
                shares: topPost.shares.length
            }


        })


        return NextResponse.json(
            {success: true, topPosts},
            {status: 200}
        )
        
    }
    catch (error: any) {
        console.log("SERVER ERROR: ", error.message)
        return NextResponse.json(
            {error: "Server error", message: "An unexpected error ocurred in the server"},
            {status: 500}
        )
    }
}