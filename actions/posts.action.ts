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
        const now = new Date()
    
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
                userId: user?.id,
                publishedAt: now
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


export async function editPostAction(
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

        const post = await prisma.post.findUnique({
            where: {url}
        })

        if(!post) return {success: false, error: "Post not found!"}
    
        const newPost = await prisma.post.update({
            where: {url},
            data: {
                title: title,
                description: description,
                metaTag: metaTag,
                metaDescription: metaDescription,
                metaKeywords: metaKeywords,
                status: status,
                url,
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

export async function deletePostAction(
    {
        url
    }:
    {
        url: string
    }
)
{
    try {
        const {getUser} = getKindeServerSession()
        const kindeUser = await getUser()
    
        if(!kindeUser) return {success: false, error: "User not found"}
        const user = await prisma.user.findUnique({
            where: {kindeId: kindeUser.id}
        })
        if(!user) return {success: false, error: "User not found"}

        const post = await prisma.post.findFirst({
            where: {
                url,
                userId: user.id,
                deletedAt: null
            }
        })

        if(!post) return {success: false, error: "Post not found!"}

        const now = new Date()
        let delPost;
        if(!post.trashedAt){
            delPost = await prisma.post.update({
                where: {id: post.id},
                data: {
                    trashedAt: now
                }
            })
        }
        else {
            delPost = await prisma.post.update({
                where: {id: post.id},
                data: {deletedAt: now}
            })
        }

        
        return {success: true, delPost}
        
    } catch (error: any) {
        console.log("SERVER ACTION ERROR: ", error)
        return {success: false, error: "Something went wrong"}
    }
}

export async function restorePostAction ({
    url
}: {url: string}) {
    try {
        const {getUser} = getKindeServerSession()
        const kindeUser = await getUser()
    
        if(!kindeUser) return {success: false, error: "User not found"}
        const user = await prisma.user.findUnique({
            where: {kindeId: kindeUser.id}
        })
        if(!user) return {success: false, error: "User not found"}

        const post = await prisma.post.findFirst({
            where: {
                url,
                userId: user.id,
                deletedAt: null,
                trashedAt: {not: null}
            }
        })

        if(!post) return {success: false, error: "Post not found!"}

        const now = new Date()
        let delPost;
        
        const restorePost = await prisma.post.update({
            where: {id: post.id},
            data: {
                trashedAt: null
            }
        })
        
        return {success: true, restorePost}
        
    } catch (error: any) {
        console.log("SERVER ACTION ERROR: ", error)
        return {success: false, error: "Something went wrong"}
    }
}