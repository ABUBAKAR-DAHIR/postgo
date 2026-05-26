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
        const now = new Date()

        const topCommentsAll = await prisma.comment.findMany({
            where: {post: {userId: user.id}, deletedAt: null},
            select: {
                id: true,
                post: true,
                content: true,
                createdAt: true,
                user: true,

                _count: {
                    select: {
                        commentLikes: {
                            where: {
                                deletedAt: null
                            }
                        },
                        replies: {
                            where: {
                                deletedAt: null
                            }
                        },
                    },
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
            take: 6,
        })


        const commentLikesAll = await prisma.commentLike.findMany({
            where: {
                userId: user.id,
                deletedAt: null
            }
        })

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

            const fullName = `${topComment.user.firstName} ${topComment.user.lastName ? topComment.user.lastName : ""}`
            const postUrl = topComment.post.url
            const image = topComment.user.image
            const commentLikes = topComment._count.commentLikes
            const replies = topComment._count.replies
            const liked = commentLikesAll.some((like) => like.commentId === topComment.id)

            return { 
                ...topComment,
                timeAgo,
                fullName,
                postUrl,
                image,
                commentLikes: commentLikes,
                replies: replies,
                liked: liked

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