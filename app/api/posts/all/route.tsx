import { prisma } from "@/lib/prisma";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest){
    try{
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

        const postCount = await prisma.post.count()

        const now = new Date()

        const sevenDaysAgo = new Date()
        sevenDaysAgo.setDate(now.getDate()-7)        
        const fourteenDaysAgo = new Date()
        fourteenDaysAgo.setDate(now.getDate()-14)

        const sevenDaysAgoPosts = await prisma.post.count({
            where: {
                createdAt: {
                    gte: sevenDaysAgo
                }
            }
        })

        const fourteenDaysAgoPosts = await prisma.post.count({
            where: {
                createdAt: {
                    gte: fourteenDaysAgo,
                    lt: sevenDaysAgo
                }
            }
        })

        const rate = fourteenDaysAgoPosts === 0 ? 100 : Math.round(((sevenDaysAgoPosts - fourteenDaysAgoPosts)/fourteenDaysAgoPosts) * 100)

        return NextResponse.json(
            {success: true, postCount, rate},
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