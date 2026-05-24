import "dotenv/config"
import { NextRequest, NextResponse } from "next/server";
import z, { number, string } from "zod"
import {PutObjectCommand} from "@aws-sdk/client-s3"
import {getSignedUrl} from "@aws-sdk/s3-request-presigner"
import {v4 as uuidv4} from  "uuid"
import { S3 } from "@/lib/S3Client";


const uploadSchema = z.object({
    fileName: string(),
    contentType: string(),
    size: number()
})

export async function POST(request: NextRequest){
    try {
        const body = await request.json()

        const validation = uploadSchema.safeParse(body)

        if(!validation.success){
            return NextResponse.json(
                {error: "Missing items", message: validation.error},
                {status: 400}
            )
        }

        const {fileName, contentType, size} = validation.data

        const key = `${uuidv4()}-${fileName.replace(/\s/g, "-")}`

        console.log("key: ", key)

        const command = new PutObjectCommand({
            Bucket: process.env.S3_BUCKET_NAME!,
            Key: key,
            ContentType: contentType,
            ContentLength: size
        })

        const presignedUrl = await getSignedUrl(S3, command, {
            expiresIn: 300 // 5mins
        })

        console.log("presignedUrl: ", presignedUrl)

        return NextResponse.json(
            {presignedUrl, key},
            {status: 200}
        )

        
    } catch (error: any) {
        console.log("SERVER ERROR: ", error.message)
        return NextResponse.json(
            {error: "Server error", message: "An unexpected error ocurred in the server"},
            {status: 500}
        )
    }
}