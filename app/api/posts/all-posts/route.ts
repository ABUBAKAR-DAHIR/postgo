import { prisma } from "@/lib/prisma";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { NextRequest, NextResponse } from "next/server";

interface AllPostsProps {
    page?: number
}

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
        
        const page = Number(request.nextUrl.searchParams.get("page") || 0)
        const LIMIT = 4

        const allPosts = await prisma.post.findMany({
            where: {userId: user.id},
            include: {
                user: true,
                comments: true,
                shares: true,
            },
            skip: page * LIMIT,
            take: LIMIT
        })
        const now = new Date()

        const posts = allPosts.map((allPost, i) => {
            let timeAgo = ""

            const diffMs = now.getTime() - allPost.createdAt.getTime()
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

            const post = {
                url: allPost.url,
                count: i < 8 ? `0${i+1}`: i + 1,
                authorImage: allPost.user.image,
                authorName: `${allPost.user.firstName} ${allPost.user.lastName}`,
                postTitle: allPost.title,
                postContent: allPost.description,
                published: timeAgo,
                comments: allPost.comments.length,
                shares: allPost.shares.length,
                impressions: allPost.views
            }

            return post
        })

        return NextResponse.json({success: true, posts, nextPage: posts.length < LIMIT ? null : page + 1}, {status: 201})

    } catch (error: any) {
        console.log("SERVER ERROR: ", error.message)
        return NextResponse.json(
            {error: "Server error", message: "An unexpected error ocurred in the server"},
            {status: 500}
        )
    }
}