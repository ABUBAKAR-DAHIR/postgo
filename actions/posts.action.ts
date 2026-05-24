"use server"
import { prisma } from "@/lib/prisma";
import { CreatePostT } from "@/types/types";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";

export async function createPostAction(
{
    title,
    description,
    metaTag,
    metaDescription,
    metaKeywords,
    categories,
    status,
    url,
    thumbnail
} : CreatePostT
){
    try {
        const {getUser} = getKindeServerSession()
        const kindeUser = await getUser()
    
        if(!kindeUser) return {success: false, error: "User not found"}
        const user = await prisma.user.findUnique({
            where: {kindeId: kindeUser.id}
        })
        if(!user) return {success: false, error: "User not found"}

        const newUrl = await getUrl(url);
    
        const newPost = await prisma.post.create({
            data: {
                title: title,
                description: description,
                metaTag: metaTag,
                metaDescription: metaDescription,
                metaKeywords: metaKeywords,
                status: status,
                url: newUrl,
                thumbnail: thumbnail,
                categories: categories,
                userId: user?.id
            }
        })
    
        return {success: true, newPost}
        
    } catch (error: any) {
        console.log("SERVER ACTION ERROR: ", error)
        return {success: false, error: "Something went wrong"}
    }
}

let count = 1;

async function getUrl(url: string){
    const isUrl = await prisma.post.findUnique({
        where: {url}
    })

    if(!isUrl) return url
    
    const newUrl = `${url}-${count++}`
    return await getUrl(newUrl)
}