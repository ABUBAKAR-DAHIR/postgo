"use server"
import { prisma } from "@/lib/prisma";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";

export async function syncUserAction(){
    console.log("syncUserAction Running...")
    const {getUser} = getKindeServerSession()
    const kindeUser = await getUser()

    if(!kindeUser) return null

    const existingUser = await prisma.user.findUnique({
        where:{kindeId: kindeUser.id}
    })

    if(existingUser) return existingUser

    const newUser = await prisma.user.create({
        data: {
            kindeId: kindeUser.id,
            email: kindeUser.email,
            firstName: kindeUser.given_name ?? null,
            middleName: kindeUser.properties?.middle_name??null,
            lastName: kindeUser.family_name??null,
            phoneNumber: kindeUser.phone_number,
            image: kindeUser.picture,
            address: kindeUser.properties?.street_address || "" + kindeUser.properties?.city + kindeUser.properties?.state_region 
        }
    })

    return newUser

}

export async function getCurrentUser(){
    
}

