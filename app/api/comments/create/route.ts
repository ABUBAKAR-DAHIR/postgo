import { prisma } from "@/lib/prisma"
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server"
import { NextRequest } from "next/server"

export async function POST(request: NextRequest){
    try {
        const {postId, content} = await request.json()
        const {getUser} = getKindeServerSession()
        const kindeUser = await getUser()
    
        if(!kindeUser) return {success: false, error: "User not found"}
        const user = await prisma.user.findUnique({
            where: {kindeId: kindeUser.id}
        })
        if(!user) return {success: false, error: "User not found"}

        const post = await prisma.post.findUnique({
            where: {id: postId}
        })

        if(!post) return {success: false, error: "No post found"}

        const newComment = await prisma.comment.create({
            data: {
                userId: user.id,
                postId,
                content
            }
        })

        return {success: true, newComment}

    } catch (error: any) {
        console.log("SERVER ACTION ERROR: ", error)
        return {success: false, error: "Something went wrong"}
    }
}