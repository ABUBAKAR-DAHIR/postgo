import "dotenv/config"
import { S3 } from "@/lib/S3Client";
import { DeleteObjectCommand } from "@aws-sdk/client-s3";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(request: NextRequest){
    try {
        const { key } = await request.json()
    
        if(!key) return NextResponse.json(
            {error: "Missing item", message: "key is missing"},
            {status: 400}
        )

        const deleteCommand = new DeleteObjectCommand({
            Bucket: process.env.S3_BUCKET_NAME!,
            Key: key
        })

        const del = await S3.send(deleteCommand)

        console.log("del : ", del)

        return NextResponse.json(
            {message: "File deleted successfully"},
            {status: 200}
        )
        
    } catch (error: any) {
        console.log("SERVER ERROR: ", error)
        return NextResponse.json(
            {error: "Unexpected server side error"},
            {status: 500}
        )
    }
}