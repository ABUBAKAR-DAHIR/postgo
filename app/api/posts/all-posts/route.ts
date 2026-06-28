import { prisma } from "@/lib/prisma";
import { PostTypeT } from "@/types/types";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { NextRequest, NextResponse } from "next/server";

interface AllPostsProps {
    page?: number
}

export async function GET(request: NextRequest){
    try {
        console.log("Backend hit============")
        const {getUser} = getKindeServerSession()
        
        const kindeUser = await getUser()
        if(!kindeUser) return NextResponse.json(
            {error: "Missing items"},
            {status: 400}
        )
        
        console.log("before kinde")
        const user = await prisma.user.findUnique({
            where: {kindeId: kindeUser.id}
        })
        
        console.log("after kinde")
        console.log("DB User: ", user)
        console.log("Kinde User: ", kindeUser)
        if(!user) return NextResponse.json(
            {error: "User not found"},
            {status: 400}
        )
        console.log("no user=========")
        
        const page = Number(request.nextUrl.searchParams.get("page") || 0)
        const type = request.nextUrl.searchParams.get("type") || "all"
        const LIMIT = 4

        const now = new Date()

        const whereClause = 
            type === "published" 
                ? {userId: user.id, publishedAt: {not: null}, trashedAt: null, deletedAt: null}
                : type === "trash"
                ? {userId: user.id, trashedAt: {not: null}, deletedAt: null}
                : {userId: user.id, deletedAt: null, trashedAt: null};

        // const whereClause = 
        //     type === "published" 
        //         ? {userId: user.id, publishedAt: {not: null}}
        //         : type === "trash"
        //         ? {userId: user.id, deletedAt: {not: null}}
        //         : {userId: user.id}

        console.log("where clause=====")
        const allPosts = await prisma.post.findMany({
            where: whereClause,
            include: {
                user: true,
                comments: true,
                shares: true,
            },
            skip: page * LIMIT,
            take: LIMIT
        })

        console.log("backend AllPosts: ============ ", allPosts)
        
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

            const count = page * LIMIT + i + 1
            const post = {
                url: allPost.url,
                count: count < 8 ? `0${count}`: count,
                authorImage: allPost.user.image,
                authorName: `${allPost.user.firstName} ${allPost.user.lastName}`,
                postTitle: allPost.title,
                postContent: allPost.description,
                published: timeAgo,
                comments: allPost.comments.length,
                shares: allPost.shares.length,
                impressions: allPost.views,
                trashedAt: allPost.trashedAt ?? null
            }

            return post
        })

        console.log("backend posts: ============ ", posts)


        return NextResponse.json({success: true, posts, nextPage: posts.length < LIMIT ? null : page + 1}, {status: 201})

    } catch (error: any) {
        console.log("SERVER ERROR: ", error.message)
        return NextResponse.json(
            {error: "Server error", message: "An unexpected error ocurred in the server"},
            {status: 500}
        )
    }
}