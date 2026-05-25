"use client"
import CustomInput from '@/components/CustomInput'
import Editor from '@/components/Editor'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Checkbox } from '@/components/ui/checkbox'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { cn } from '@/lib/utils'
import { ChevronDown, Eye, EyeClosed, EyeIcon, EyeOff, EyeOffIcon, X } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { Uploader } from './Uploader'
import { useMutation } from '@tanstack/react-query'
import { createPostAction } from '@/actions/posts.action'
import { Spinner } from '@/components/ui/spinner'
import { toast } from 'sonner'
import { da } from 'zod/v4/locales'
import { Status } from '@/app/generated/prisma/enums'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import {useWebHaptics} from "web-haptics/react"


function createPost() {
    const [visibility, setVisibility] = useState<boolean>(false)
    const [status, setStatus] = useState<Status>("PUBLISHED")
    const [category, setCategory] = useState<"all categories" | "most used">("all categories")

    const [title, setTitle] = useState<string>("")
    const [description, setDescription] = useState<string>("")
    const [metaTag, setMetaTag] = useState<string>("")
    const [metaDescription, setMetaDescription] = useState<string>("")
    const [url, setUrl] = useState<string>("")
    const [thumbnail, setThumbnail] = useState<string>("")


    // const [metaKeywords, setMetakeywords] = useState<string[]>([])
    const [selectedMetaKeywords, setSelectedMetakeywords] = useState<string[]>([])
    const [selectedCategories, setSelectedCategories] = useState<string[]>([])

    const [newCategory, setNewCategory] = useState<string>("")

    const [metaKeywords, setMetakeywords] = useState<string[]>([
        "AI",
        "Machine Learning",
        "Digital Marketing",
        "BD"
    ])

    const [clearContent, setClearContent] = useState<boolean>(false)
    const [clearThumbnailPreview, setClearThumbnailPreview] = useState<boolean>(false)
    

    const [categories, setCategories] = useState([
        {
            name: "development blog",
            category: "mostUsed"
        },
        {
            name: "business blog",
            category: "mostUsed"
        },
        {
            name: "digital marketing blog",
            category: "marketing"
        }
    ])

    console.log("meta keywords: " ,selectedMetaKeywords)
    console.log("selected meta keywords: " ,metaKeywords)
    console.log("Selected categories", selectedCategories)

    useEffect(() => {
        setUrl(title.toLowerCase().trim().replace(/\s+/g, "-"))
    }, [title])

    const mutation = useMutation({
        mutationKey: ["create-post"],
        mutationFn: createPostAction,
        onSuccess: (data) => {
            if(data.success){
                toast.success("Post created successfully!")
                setTitle("")
                setDescription("")
                setMetaDescription("")
                setMetaTag("")
                setUrl("")
                setThumbnail("")
                setSelectedMetakeywords([])
                setSelectedCategories([])
                setClearContent(true)
                setClearThumbnailPreview(true)
                trigger("success")
            }
            else{
                toast.error(data.error)
                console.log(data)
                window.location.reload()
            }
        },
        onError: (data) => {
            toast.error("post couldn't be created!")
            trigger("error")
            console.log(data)
        }
    })

    const handleCreatePost = () => {
        if(!title || !description || !metaTag || !metaDescription || !status || !url || !thumbnail){
            toast.error("please fill all the fields")
            trigger("error")
            return
        }
        mutation.mutate({
            title,
            description,
            metaTag,
            metaDescription,
            metaKeywords: selectedMetaKeywords,
            categories: selectedCategories,
            status,
            url,
            thumbnail
        })

        

    }

    const {trigger} = useWebHaptics()

    const handleAddNewCategory = () => {
        if(!newCategory){
            toast.error("please enter a category!")
            trigger("error")
            return
        }

        // if(categories.includes(newCategory)){
        //     toast.error("Category is already there!")
        //     trigger("error")
        //     return
        // }
        
        setCategories((prev) => [...prev, {category: "custom", name: newCategory}])
        toast.success("Category added successfully")
        setNewCategory("")
        trigger("success")
    }

    const handleCategoryChange = (category: string, checked: boolean) => {
        if(checked){
            setSelectedCategories((prev) => [...prev, category])
        }
        else {
            setSelectedCategories((prev) => prev.filter(p => p!== category))
        }
    }

    

  return (
    <div className='w-full flex justify-between gap-x-4 max-lg:flex-col'>
        <div className='lg:flex-2'>
            {/* heading */}
            <h1 className='font-bold capitalize text-2xl py-4 block'>add new post</h1>
            <Card className='w-full mb-4'>
                <CardHeader>
                    <h1 className='font-bold capitalize text-2xl'>description</h1>
                </CardHeader>

                <CardContent className='w-full flex flex-col gap-y-6'> 
                    {/* title input */}
                    <div className='flex flex-col gap-y-1'>
                        <label className='font-semibold '>Add title</label>
                        <CustomInput 
                            className='border-2 rounded-md'
                            inputClassName='dark:bg-transparent'
                            labelClassName='dark:bg-[#171717] dark:text-white'
                            label='title'
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                        />
                    </div>

                    {/* description input */}
                    <div className='flex flex-col gap-y-1'>
                        <label className='font-semibold '>Add description</label>
                        <Editor onChange={setDescription} clearTrigger={clearContent}/>
                    </div>

                    {/* meta input */}
                    <div className='flex flex-col gap-y-1'>
                        <label className='font-semibold '>Meta tag</label>
                        <CustomInput 
                            className='border-2 rounded-md'
                            inputClassName='dark:bg-transparent'
                            labelClassName='dark:bg-[#171717] dark:text-white'
                            label='meta tag'
                            value={metaTag}
                            onChange={(e) => setMetaTag(e.target.value)}
                        />
                    </div>

                    {/* meta keywords */}
                    <div className='flex flex-col gap-y-1'>
                        <label className='font-semibold '>Meta keywords</label>
                        <div className={cn('border rounded-md w-full p-4 flex gap-x-4 gap-y-2 flex-wrap', selectedMetaKeywords.length === 0 && "py-5")}>
                            {
                                selectedMetaKeywords.map((metaKeyword) => (
                                    <div key={metaKeyword} className='relative text-white bg-black dark:text-black dark:bg-white px-3 py-1.5 rounded-sm'>
                                        {metaKeyword}
                                        <div className='absolute top-0 right-0 h-fit w-fit translate-x-1 -translate-y-1 bg-white text-black border border-black rounded-full p-[1px]' onClick={() => {setSelectedMetakeywords((prev) => prev.filter((curr) => curr !== metaKeyword)); setMetakeywords((prev) => [...prev, metaKeyword])}}>
                                            <X className='size-2 cursor-pointer'/>    
                                        </div>
                                    </div>
                                ))
                            }
                        </div>

                        <div className="flex gap-x-3 flex-wrap">
                            {
                                metaKeywords.map((metaKeyword) => (
                                    <Button key={metaKeyword} variant="secondary" onClick={() => {setSelectedMetakeywords((prev) => [...prev, metaKeyword]); setMetakeywords(metaKeywords.filter((curr) => curr !== metaKeyword))}} className='text-xs cursor-pointer'>{metaKeyword}</Button>
                                ))
                            }
                        </div>


                    </div>

                    {/* meta description input */}
                    <div className='flex flex-col gap-y-1'>
                        <label className='font-semibold '>Meta description</label>
                        <CustomInput 
                            className='border-2 rounded-md'
                            inputClassName='dark:bg-transparent'
                            labelClassName='dark:bg-[#171717] dark:text-white'
                            label='meta description'
                            textArea = {true}
                            value={metaDescription}
                            onChange={(e) => setMetaDescription(e.target.value)}
                        />
                    </div>

                    {/* URL input */}
                    <div className='flex flex-col gap-y-1'>
                        <label className='font-semibold '>URL</label>
                        <CustomInput 
                            className='border-2 rounded-md'
                            inputClassName='dark:bg-transparent'
                            labelClassName='dark:bg-[#171717] dark:text-white'
                            label='URL'
                            value={url}
                            onChange={(e) => setUrl(e.target.value)}
                        />
                    </div>

                    {/* thumbnail uploader */}
                    <Uploader setThumbnail={setThumbnail} clearTrigger={clearThumbnailPreview}/>
                    {/* <div className='h-100'></div> */}

                </CardContent>
            </Card>
        </div>

        {/* publish */}
        <div className='lg:flex-1 pt-16 max-lg:mb-8'>
            <Card>
                <CardHeader>
                    <div className="flex justify-between items-center">
                        <h1 className='font-bold capitalize md:text-lg'>publish</h1>
                        <Button variant="link" className="text-gray-500 cursor-pointer capitalize text-xs">save as draft</Button>
                    </div>
                </CardHeader>

                <CardContent className='-mt-4'>
                    {/* visibility */}
                    <div className="flex items-center font-semibold border-b pb-5 border-gray-400">
                        <Button variant="ghost" className='w-fit cursor-pointer text-xl' onClick={() => setVisibility((prev) => !prev)}>
                            {
                                visibility ? <EyeOffIcon /> : <EyeIcon />
                            }
                        </Button>
                        <span> Visibility : </span>

                         <DropdownMenu>
                            <DropdownMenuTrigger asChild className="border px-2 py-2 rounded-md cursor-pointer ml-2 capitalize text-xs">
                                <Button className='capitalize'>{status === 'PUBLISHED' ? "public" : status.toLowerCase()} <ChevronDown /></Button>
                            </DropdownMenuTrigger>

                            <DropdownMenuContent>
                                <DropdownMenuItem className='cursor-pointer' onClick={() => setStatus("PUBLISHED")}>Public</DropdownMenuItem>
                                <DropdownMenuItem className='cursor-pointer' onClick={() => setStatus("DRAFT")}>Draft</DropdownMenuItem>
                                <DropdownMenuItem className='cursor-pointer' onClick={() => setStatus("SCHEDULED")}>Schedule</DropdownMenuItem>
                            </DropdownMenuContent>
                            
                        </DropdownMenu>
                    </div>

                    {/* categories */}
                    <div>
                        <div className="flex items-center justify-between font-semibold border-b py-5 border-gray-400">
                            <h1 className='font-bold capitalize md:text-lg '>categories</h1>

                            {/* add new category  */}
                            <Popover>
                                <PopoverTrigger asChild>
                                    <Button variant="link" className="text-gray-500 cursor-pointer capitalize text-xs">add new +</Button>
                                </PopoverTrigger>

                                <PopoverContent className='flex gap-2'>
                                    <CustomInput 
                                        className='border-2 rounded-md'
                                        inputClassName='dark:bg-transparent'
                                        labelClassName='dark:bg-[#171717] dark:text-white'
                                        label='meta description'
                                        textArea = {false}
                                        value={newCategory}
                                        onChange={(e) => setNewCategory(e.target.value)}
                                    />
                                    <Button onClick={handleAddNewCategory} className='cursor-pointer'>Add</Button>
                                </PopoverContent>
                            </Popover>
                        </div>
                        
                        <div className="flex w-full items-center justify-center py-4">
                            <p className={cn('flex-1 border-b-2 border-b-transparent hover:text-postgo-sec text-center capitalize cursor-pointer py-4 font-semibold', category === "all categories" ? "border-b-postgo-sec text-postgo-sec" : "border-b-transparent hover:text-postgo-sec")} onClick={() => setCategory("all categories")}>all categories</p>
                            <p className={cn('flex-1 border-b-2 border-b-transparent hover:text-postgo-sec text-center capitalize cursor-pointer py-4 font-semibold', category === "most used" ? "border-b-postgo-sec text-postgo-sec" : "border-b-transparent hover:text-postgo-sec")} onClick={() => setCategory("most used")}>most used</p>
                        </div>

                        <div className="flex flex-col gap-y-3">
                            {
                                category === "all categories" ? 
                                categories.map((category) => (
                                    <div key={category.name} className='flex gap-x-2'>
                                        <Checkbox className='cursor-pointer' checked={selectedCategories.includes(category.name)} onCheckedChange={(checked) => handleCategoryChange(category.name, checked as boolean)}/>
                                        <p className='capitalize'>{category.name}</p>
                                    </div>
                                ))
                                 : 
                                categories.map((category) => category.category === "mostUsed" && (
                                    <div key={category.name} className='flex gap-x-2'>
                                        <Checkbox className='cursor-pointer' checked={selectedCategories.includes(category.name)} onCheckedChange={(checked) => handleCategoryChange(category.name, checked as boolean)}/>
                                        <p className='capitalize'>{category.name}</p>
                                    </div>
                                ))
                            }
                        </div>
                    </div>

                    {/* preview/publish */}

                    <div className="flex justify-end gap-x-4 max-xl:justify-center">
                        <Button variant="secondary" className='capitalize cursor-pointer max-xl:flex-1/3 max-xl:py-5 max-xl:my-4'>preview</Button>
                        <Button className='capitalize cursor-pointer max-xl:flex-1/3 max-xl:py-5 max-xl:my-4' onClick={handleCreatePost}>{mutation.isPending ? <Spinner className='size-5'/> : 'publish'}</Button>
                    </div>


                </CardContent>
            </Card>
        </div>
    </div>
  )
}

export default createPost