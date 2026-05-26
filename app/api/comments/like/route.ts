import { prisma } from "@/lib/prisma"
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server"
import { NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest){
    try {
        const {getUser} = getKindeServerSession()
        const kindeUser = await getUser()
    
        if(!kindeUser) return NextResponse.json({success: false, error: "User not found"})
        const user = await prisma.user.findUnique({
            where: {kindeId: kindeUser.id}
        })
        if(!user) return NextResponse.json({success: false, error: "User not found"})

        const {commentId} = await request.json()
        if(!commentId) return NextResponse.json({success: false, error: "Missing items"}, {status: 400})

        const comment = await prisma.comment.findUnique({
            where: {id: commentId}
        })

        if(!comment) return NextResponse.json({success: false, error: "No comment found"})
        
        const userId = user.id
        const now = new Date()

        const existingLike = await prisma.commentLike.findUnique({
            where:{userId_commentId: {userId, commentId}}
        })

        if(existingLike){
            if(!existingLike.deletedAt){
                const newUnlike = await prisma.commentLike.update({
                    where:{userId_commentId: {userId, commentId}},
                    data: {
                        deletedAt: now
                    }
                })
                
                return NextResponse.json({success: true, newUnlike}, {status: 200})

                
            }
            else{
                const newlike = await prisma.commentLike.update({
                    where:{userId_commentId: {userId, commentId}},
                    data: {
                        deletedAt: null
                    }
                })

                return NextResponse.json({success: true, newlike}, {status: 200})

            }
        }
        
        const newLike = await prisma.commentLike.create({
            data: {
                userId: user.id,
                commentId: comment.id
            }
        })

        return NextResponse.json({success: true, newLike}, {status: 200})

    } catch (error: any) {
        console.log("SERVER ACTION ERROR: ", error)
        return NextResponse.json({success: false, error: "Something went wrong"})
    }
}