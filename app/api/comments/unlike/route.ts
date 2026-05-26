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
        const commentLike = await prisma.commentLike.findUnique({
            where: {userId_commentId: {userId, commentId}}
        })

        if(!commentLike) return NextResponse.json({success: false, error: "No comment Like found"})
        

        const now = new Date()

        const unlike = await prisma.commentLike.update({
            where: {userId_commentId: {userId, commentId}},
            data: {
                deletedAt: now
            }
        })

        return NextResponse.json({success: true, unlike}, {status: 200})

    } catch (error: any) {
        console.log("SERVER ACTION ERROR: ", error)
        return NextResponse.json({success: false, error: "Something went wrong"})
    }
}