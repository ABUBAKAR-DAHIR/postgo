import { prisma } from "@/lib/prisma";
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
        
        const page = Number(request.nextUrl.searchParams.get("page") || 0)
        const type = request.nextUrl.searchParams.get("type") || "all"
        const LIMIT = 6

        const now = new Date()

        const whereClause = 
            type === "drafts" 
                ? {post: {userId: user.id}, deletedAt: null}
                : type === "trash"
                ? {post: {userId: user.id}, deletedAt: {not: null}}
                : {post: {userId: user.id}}

        const allComments = await prisma.comment.findMany({
            where: whereClause,
            select: {
                user: true,
                post: true,
                content: true,
                commentLikes: true,
                replies: true,
                createdAt: true,
                deletedAt: true,
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
                        }
                    }
                }
            },
            skip: page * LIMIT,
            take: LIMIT
        })

        const comments = allComments.map((allComment, i) => {
            const formattedDate = new Intl.DateTimeFormat("en-GB", {
                day: "2-digit",
                month: "long",
                year: "numeric"
            })
            
            const comment = {
                commentAuthorImage: allComment.user.image,
                commentAthorName: `${allComment.user.firstName} ${allComment.user.lastName}`,
                commentDate: formattedDate.format(allComment.createdAt).toString(),
                commentContent: allComment.content,
                likes: allComment._count.commentLikes,
                replies: allComment._count.replies,
                // likes: allComment.commentLikes.filter((commentLike) => commentLike.commentId === allComment.id).length,
                postUrl: allComment.post.url
            }

            console.log(allComment.commentLikes)

            return comment;
        })
        
        return NextResponse.json({success: true, comments, nextPage: comments.length < LIMIT ? null : page + 1})
        
    } catch (error: any) {
        console.log("SERVER ERROR: ", error.message)
        return NextResponse.json(
            {error: "Server error", message: "An unexpected error ocurred in the server"},
            {status: 500}
        )
    }
}