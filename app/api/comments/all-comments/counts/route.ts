import { prisma } from "@/lib/prisma";
import { PostTypeT } from "@/types/types";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest){
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

        // counts
        const [allCount, draftCount, trashCount] = await Promise.all([
            prisma.comment.count({
                where: { post: {userId: user.id} }
            }),

            prisma.comment.count({
                where: {
                    post: {userId: user.id},
                    deletedAt: null 
                }
            }),

            prisma.comment.count({
                where: {
                    post: {userId: user.id},
                    deletedAt: {not: null}
                }
            })
        ])

        const counts = {
            allCount,
            draftCount,
            trashCount
        }

        return NextResponse.json({success: true, counts}, {status: 201})

    } catch (error: any) {
        console.log("SERVER ERROR: ", error.message)
        return NextResponse.json(
            {error: "Server error", message: "An unexpected error ocurred in the server"},
            {status: 500}
        )
    }
}