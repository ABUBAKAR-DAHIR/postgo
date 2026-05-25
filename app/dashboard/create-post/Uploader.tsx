"use client"
import { Card } from '@/components/ui/card'
import { cn } from '@/lib/utils'
import Image from 'next/image'
import React, {useCallback, useEffect, useState} from 'react'
import {FileRejection, useDropzone} from 'react-dropzone'
import { toast } from 'sonner'
import { v4 as uuidv4 } from 'uuid'
import axios from "axios"
import { X } from 'lucide-react'
import { Spinner } from '@/components/ui/spinner'

export function Uploader({setThumbnail,  clearTrigger} : {clearTrigger: boolean, setThumbnail: (thumbnail: string) => void}) {
    const [files, setFiles] = useState<Array<{
        id: string
        key?: string
        file: File
        uploading: boolean
        progress: number
        isDeleting: boolean
        objectUrl: string
    }>>([])

    useEffect(()=>{
        if(clearTrigger){
            setFiles([])
        }
    }, [clearTrigger])

    const removeFile = async(file: File) => {
        try {
            console.log("Delting file... ", file.name)
            setFiles((prevFiles) => (
                prevFiles.map((f) => f.file === file ? {...f, isDeleting: true} : f)
            ))

            const deleteFileRes = await fetch("/api/s3/delete", {
                method: "DELETE",
                headers: {"Content-Type" : "application/json"},
                body: JSON.stringify({
                    key: files.find((f) => f.file === file)?.key
                })
            })

            if(!deleteFileRes.ok){
                toast.error("Failed to delete the File")
                console.log({error: "couldnt generate presignedUrl", message: deleteFileRes.body})
                setFiles((prevFiles) => (
                    prevFiles.map((f) => f.file === file ? {...f, isDeleting: false, error: true} : f)
                ))
                return
            }

            
            toast.success("File deleted successfully!")
            setFiles((prevFiles) => (
                prevFiles.filter((f) => f.file !== file )
            ))
            setThumbnail("")
            

        } catch (error: any) {
            console.log("Frontend fetch error: ", error.message)
            setFiles((prevFiles) => (
                prevFiles.map((f) => f.file === file ? {...f, isDeleting: false, error: true} : f)
            ))
            toast.error("Failed to delete the File")
        }
    }

    const uploadFile = async(file: File) => {
        console.log("uploading...: ", file.name)

        setFiles((prev) => (
            prev.map((f) => f.file === file ? {...f, uploading: true} : f)
        ))

        try {
            const presignedUrlRes = await fetch("/api/s3/upload", {
                method: "POST",
                headers: {"Content-Type" : "application/json"},
                body: JSON.stringify({
                    fileName: file.name,
                    contentType: file.type,
                    size: file.size
                })
            })

            if(!presignedUrlRes.ok){
                toast.error("Failed to Upload the File")
                console.log({error: "couldnt generate presignedUrl", message: presignedUrlRes})
            }

            const {presignedUrl, key} = await presignedUrlRes.json()

            setFiles((prevFiles) => (
                prevFiles.map((f) => f.file === file ? {...f, key} : f)
            ))


            try {
                const upload = await axios.put(presignedUrl, file, {
                    headers: {"Content-Type" : file.type},

                    onUploadProgress(progressEvent) {
                        const progress = Math.round(((progressEvent.loaded) / (progressEvent.total || 1) * 100))

                        setFiles((prevFiles) => (
                            prevFiles.map((f) => f.file === file ? {...f, progress} : f)
                        ))
                    },
                })

                if(upload.status === 200 || upload.status === 204){
                    toast.success("File uploaded successfully!")
                    setFiles((prevFiles) => (
                        prevFiles.map((f) => f.file === file ? {...f, uploading: false, error: false} : f)
                    ))
                    setThumbnail(`https://postgo-bucket.t3.tigrisfiles.io/${key}`)
                    return
                }
                else{
                    toast.error("Failed to upload file")
                    console.log(upload.data)
                    setFiles((prevFiles) => (
                        prevFiles.map((f) => f.file === file ? {...f, uploading: false, progress: 0, error: true} : f)
                    ))
                    return
                }
            } catch (error: any) {
                console.log("Frontend fetch error: ", error.message)
                toast.error("Failed to upload file!")
                setFiles((prevFiles) => (
                    prevFiles.map((f) => f.file === file ? {...f, uploading: false, progress: 0, error: true} : f)
                ))
            }

        } catch (error: any) {
            console.log("Frontend fetch error: ", error.message)
            toast.error("Failed to upload file!")
            setFiles((prevFiles) => (
                prevFiles.map((f) => f.file === file ? {...f, uploading: false, progress: 0, error: true} : f)
            ))
        }




    }
    
    const onDrop = useCallback((acceptedFiles: File[]) => {
        // Do something with the files
        console.log("accepted files: ", acceptedFiles)

        setFiles((prev) => ([
            ...prev,
            ...acceptedFiles.map((file) => ({
                id: uuidv4(),
                file: file,
                uploading: false,
                progress: 0,
                isDeleting: false,
                objectUrl: URL.createObjectURL(file)
            }))
        ]))

        acceptedFiles.forEach(uploadFile)
    }, [])

    const onDropRejected = useCallback((fileRejections: FileRejection[]) => {
        // Do something with the files
        console.log("rejected files: ", fileRejections)

        if(!fileRejections || fileRejections.length <= 0) return

        const tooManyFiles = fileRejections.find(fileRejection => fileRejection.errors[0].code === 'too-many-files')
        const tooBigFile = fileRejections.find(fileRejection => fileRejection.errors[0].code === "file-too-large")
        const invalidFile = fileRejections.find(fileRejection => fileRejection.errors[0].code === "file-invalid-type")

        if(tooManyFiles){
            toast.error("You can only upload one Image!")
            return
        }

        if(tooBigFile){
            toast.error("Image file size should be less than 25 MB!")
            return
        }

        if(invalidFile){
            toast.error("You can only upload Images!")
            return
        }

        fileRejections.map((fileRejection) => (
            setFiles((prevFiles) => [
                ...prevFiles.map((prev) => prev.file === fileRejection.file ? {...prev, error: true} : prev)
            ])
        ))

        
    }, [])

    const {getRootProps, getInputProps, isDragActive} = useDropzone({
        onDrop,
        onDropRejected,
        maxFiles: 1,
        maxSize: 1024 * 1024 * 24,
        accept: {
            "image/*": []
        }
    })

    return (
        <div>
            <Card {...getRootProps()} className={cn('h-60 w-full flex flex-col items-center justify-center gap-y-4 duration-500', isDragActive ? "border-2 border-postgo-sec bg-postgo-sec/10" : "border-2 border-gray-400 border-dashed hover:border-postgo-sec")}>
                <input {...getInputProps()} hidden className='w-full h-80'/>
                {
                    isDragActive ?
                    <p>Drop the files here ...</p> : 
                    <div>
                        <div className='flex flex-col gap-y-2 items-center justify-center text-center'>
                            <Image src="/icons/upload.svg" width={70} height={70} alt='upload_icon' />
                            <p className='font-semibold'>Drag & drop some files <span className='capitalize underline text-postgo-sec font-semibold cursor-pointer'>browse</span></p>
                            <p className='capitalize text-gray-400 text-xs'>max file size: 24 MB</p>
                        </div>
                    </div>
                }

            </Card>
            
            <div className=' w-full py-4 my-2 grid grid-cols-4 max-[350px]:grid-cols-2 max-[450px]:grid-cols-3 md:grid-cols-3 xl:grid-cols-4 gap-2 gap-y-4'>
                {
                    files.map((file) => (
                        <div key={file.id} className='relative '>
                            <div key={file.id} className='relative size-20 md:size-24 xl:size-28 rounded-md border'>
                                <Image src={file.objectUrl} alt={file.file.name} fill className='rounded-md z-1'/>
                                {file.uploading && <div className='absolute inset-0 w-full bg-gray-900 z-2 rounded-md'/>}
                                {file.uploading && <p className='absolute inset-0 flex items-center justify-center text-center z-99 text-xs text-white'>{file.progress}%</p>}
                                {file.progress === 100 && (
                                    <div className={cn('absolute top-0 right-0 translate-x-1 -translate-y-1 bg-white border  rounded-full p-1 z-99', file.isDeleting ? "cursor-progress" : "hover:text-red-600 hover:cursor-pointer")} onClick={() => removeFile(file.file)}>
                                        {file.isDeleting ? <Spinner className='size-2.5'/> : <X className='size-2.5'/>}
                                    </div>
                                )}
                            </div>

                        </div>
                    ))
                }
            </div>
        </div>
    )
}