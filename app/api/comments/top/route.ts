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

        const topCommentsAll = await prisma.comment.findMany({
            select: {
                id: true,
                post: true,
                content: true,
                commentLikes: true,
                replies: true,
                createdAt: true,

                _count: {
                    select: {
                        commentLikes: true,
                        replies: true
                    }
                }
            },
            
            orderBy: [
                {
                    commentLikes: {
                        _count: "desc"
                    }
                },

                {
                    replies: {
                        _count: "desc"
                    }
                }
            ],
            take: 6
        })

        const now = new Date()

        const topComments = topCommentsAll.map((topComment) => {
            let timeAgo = ""

            const diffMs = now.getTime() - topComment.createdAt.getTime()
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

            return { 
                ...topComment,
                timeAgo
            }

        })

        return NextResponse.json(
            {success: true, topComments},
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