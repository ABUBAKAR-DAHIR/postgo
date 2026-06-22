import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
    request: NextRequest,
    {params} : {params: Promise<{slug: string}>}
){
    try {
        const {slug} = await params
        if(!slug) return NextResponse.json(
            {error: "Slug is required"},
            {status: 400}
        )

        const post = await prisma.post.findUnique({
            where: {url: slug}
        });

        if(!post) return NextResponse.json(
            {error: "No post found"},
            {status: 400}
        )

        console.log("POST: ", post)

        return NextResponse.json(
            {post},
            {status: 200}
        )

    } catch (error: any) {
        console.error("SERVER ERROR: ", error.message);
        return NextResponse.json(
            {error: "Server error", message: "An unexpected error ocurred in the server"},
            {status: 500}
        )
    }
}