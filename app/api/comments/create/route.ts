import { prisma } from "@/lib/prisma"
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server"
import { NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest){
    try {
        const {postId, content} = await request.json()
        const {getUser} = getKindeServerSession()
        const kindeUser = await getUser()
    
        if(!kindeUser) return NextResponse.json({success: false, error: "User not found"})
        const user = await prisma.user.findUnique({
            where: {kindeId: kindeUser.id}
        })
        if(!user) return NextResponse.json({success: false, error: "User not found"})

        const post = await prisma.post.findUnique({
            where: {id: postId}
        })

        if(!post) return NextResponse.json({success: false, error: "No post found"})

        const newComment = await prisma.comment.create({
            data: {
                userId: user.id,
                postId,
                content
            }
        })

        return NextResponse.json({success: true, newComment})
        // return NextResponse.json({succesS: true})

    } catch (error: any) {
        console.log("SERVER ACTION ERROR: ", error)
        return NextResponse.json({success: false, error: "Something went wrong"})
    }
}