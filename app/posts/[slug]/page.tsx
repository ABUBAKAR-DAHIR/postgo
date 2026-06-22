"use client"

import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useParams } from "next/navigation";
import DOMpurify from "dompurify"


function page() {
    const {slug} = useParams<{slug: string}>()
    
    console.log(slug)

    const URL = `/api/post/${slug}`

    const {data:post, isLoading, error } = useQuery({
        queryKey: ["post"],
        queryFn: async () => {
            const data = await axios.get(`/api/post/${slug}`)
            return data.data.post
        }
    })

    if(post) console.log(post)
    
    if(isLoading) return <p>loading...</p>

    // console.log(params)
    return (
        <div>
            <h1 className="font-semibold">{post?.title}</h1>
            <p className='line-clamp-2 sm:line-clamp-3 text-sm dark:text-gray-300 group-hover:text-white/80 dark:group-hover:text-black transition-all duration-500'
                dangerouslySetInnerHTML={{__html: DOMpurify.sanitize(post?.description)}}
            />
            {/* <p>{post}</p> */}
        </div>
    )
}

export default page