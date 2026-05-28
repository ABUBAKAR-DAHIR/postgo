"use client"
import { EditorContent, useEditor } from "@tiptap/react"
import StarterKit from "@tiptap/starter-kit"
import { AlignLeft, ArrowLeft, Bold, ChevronDown, Code, Code2Icon, ImageIcon, Italic, LinkIcon, List, ListOrdered, LucideAlignLeft, LucideRedo2, LucideStrikethrough, LucideUndo2, Strikethrough, StrikethroughIcon, Underline, Undo, Undo2, Undo2Icon } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select"
import Image from "next/image"
import Color from "@tiptap/extension-color"
import { TextStyle } from "@tiptap/extension-text-style"
import { cn } from "@/lib/utils"
import Link from "@tiptap/extension-link"
import { useEffect, useState } from "react"
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover"
import { Button } from "./ui/button"
import { Input } from "./ui/input"
import TiptapImage from "@tiptap/extension-image"
import { toast } from "sonner"
import { getTheme } from "@/hooks/theme"

export default function Editor({onChange, clearTrigger} : {onChange: (value: string) => void, clearTrigger: boolean}) {
    const [url, setUrl] = useState<string>("")
    const [image, setImage] = useState<File | null>(null)
    const theme = getTheme()
    
    const applyLink = () => {

        if (!url) return
            editor
                .chain()
                .focus()
                .setLink({
                    href: url,
                    })
                .run()

    }

    const uploadImage = () => {

        if (!image) {
            toast.error("Please select a file")
            return
        }

        const imageUrl = URL.createObjectURL(image)
            editor
                .chain()
                .focus()
                .setImage({
                        src: imageUrl,
                    })
                .run()

    }

  const editor = useEditor({
    extensions: [
        StarterKit.configure({
            heading: {
                levels: [1, 2, 3, 4, 5, 6]
            }
        }),
        Color,
        TextStyle,
        Link,
        TiptapImage
    ],

    onUpdate({editor}){
        onChange(editor.getHTML())
    }
    
    
  })
  useEffect(() => {
      if(editor && clearTrigger){
          editor.commands.clearContent()
      }
  }, [clearTrigger])

  if (!editor) return null


  return (
    <div className="border-2 rounded-xl pb-6" >

      <div className="flex gap-2 mb-4 border-b-2 py-2.5 px-1 flex-wrap">

        <button
          className="btn"
          onClick={() =>
            editor.chain().focus().undo().run()
          }
        >
          <LucideUndo2 className="size-5.5" strokeWidth={1.5}/>
        </button>

        <button
          className="btn"
          onClick={() =>
            editor.chain().focus().redo().run()
          }
        >
          <LucideRedo2 className="size-5.5" strokeWidth={1.5} />
        </button>

        {/* normal text */}
        <Select
            onValueChange={(value) => {

                if (value === "paragraph") {
                    editor.chain().focus().setParagraph().run()
                }

                if (value === "h1") {
                    editor.chain().focus().setHeading({
                        level: 1,
                    }).run()
                }

                if (value === "h2") {
                    editor.chain().focus().setHeading({
                        level: 2,
                    }).run()
                }

            }}
        >
            <SelectTrigger className="w-fit border-transparent text-black cursor-pointer placeholder:text-black dark:text-gray-300">
                <SelectValue placeholder="Normal Text" className="placeholder:text-black dark:placeholder:text-gray-200 cursor-pointer text-xs"/>
            </SelectTrigger>

            <SelectContent className="text-white">
                <SelectItem value="paragraph" className="dark:text-gray-200 text-gray-900"> Normal Text </SelectItem>
                <SelectItem value="h1" className="dark:text-gray-200 text-gray-900"> Heading 1 </SelectItem>
                <SelectItem value="h2" className="dark:text-gray-200 text-gray-900"> Heading 2 </SelectItem>
            </SelectContent>
        </Select> 

          

        <Select
            onValueChange={(value) => {
                if(value === "paragraph"){
                    editor.chain().focus().setParagraph().run()
                }

                if(value === "h1"){
                    editor.chain().focus().setHeading({level: 1}).run()
                }

                if(value === "h2"){
                    editor.chain().focus().setHeading({level: 2}).run()
                }

                if(value === "h3"){
                    editor.chain().focus().setHeading({level: 3}).run()
                }

                if(value === "h4"){
                    editor.chain().focus().setHeading({level: 4}).run()
                }

                if(value === "h5"){
                    editor.chain().focus().setHeading({level: 5}).run()
                }

                if(value === "h6"){
                    editor.chain().focus().setHeading({level: 6}).run()
                }
            }}
        >
            <SelectTrigger className="btn flex items-center gap-2 border-none border-transparent dark:text-gray-300 text-sm"> 
                    {/* <Image src="/icons/select.svg" width={15} height={15} alt="select-icon"/> */}
                    <SelectValue placeholder={<Image src="/icons/select.svg" width={20} height={20} alt="select-icon"/>} className="border-none border-transparent"/>    
            </SelectTrigger>  

            <SelectContent className="relative border-transparent">
                <SelectItem value="paragraph"> Normal Text </SelectItem>
                <SelectItem value="h1"> Heading 1 </SelectItem>
                <SelectItem value="h2"> Heading 2 </SelectItem>
                <SelectItem value="h3"> Heading 3 </SelectItem>
                <SelectItem value="h4"> Heading 4 </SelectItem>
                <SelectItem value="h5"> Heading 5 </SelectItem>
                <SelectItem value="h6"> Heading 6 </SelectItem>
            </SelectContent>
        </Select>    

        
        {/* colors */}
        <Select
            onValueChange={(value) => {
                if(value === "black"){
                    editor.chain().focus().setColor("black").run()
                }

                if(value === "red"){
                    editor.chain().focus().setColor("red").run()
                }

                if(value === "green"){
                    editor.chain().focus().setColor("green").run()
                }

                if(value === "blue"){
                    editor.chain().focus().setColor("blue").run()
                }

                if(value === "purple"){
                    editor.chain().focus().setColor("purple").run()
                }
            }}
        >
            <SelectTrigger className="btn flex items-center gap-2 border-none border-transparent"> 
                    {/* <Image src="/icons/select.svg" width={15} height={15} alt="select-icon"/> */}
                    <SelectValue placeholder={ <ColorBlock /> } className="border-none border-transparent"/>    
            </SelectTrigger>  

            <SelectContent className="relative border-transparent py-3 px-1.5">
                <SelectItem value="black" className="cursor-pointer"> <ColorBlock bg="bg-black" /> Black </SelectItem>
                <SelectItem value="red" className="cursor-pointer">  <ColorBlock bg="bg-red-500" /> Red </SelectItem>
                <SelectItem value="green" className="cursor-pointer">  <ColorBlock bg="bg-green-500" /> Green </SelectItem>
                <SelectItem value="blue" className="cursor-pointer">  <ColorBlock bg="bg-blue-500" /> Blue </SelectItem>
                <SelectItem value="purple" className="cursor-pointer">  <ColorBlock bg="bg-purple-500" /> Purple </SelectItem>
            </SelectContent>
        </Select> 

        {/* Link */}
        <Popover>

            <PopoverTrigger asChild>

                <Button variant="ghost" size="icon" className="cursor-pointer">

                    <LinkIcon className="size-4" />

                </Button>

            </PopoverTrigger>

            <PopoverContent className="w-72">

                    <div className="flex gap-2">

                        <Input
                            placeholder="https://example.com"
                            value={url}
                            onChange={(e) =>
                                setUrl(e.target.value)
                            }
                        />

                        <Button onClick={applyLink} className="cursor-pointer">
                            Apply
                        </Button>

                    </div>

                </PopoverContent>

        </Popover>
            
            {/* bold */}
            <button
                className="btn"
                onClick={() =>
                    editor.chain().focus().toggleBold().run()
                }
            >
                <Bold className="size-5.5" strokeWidth={3}/>
            </button>
            
            {/* italic */}
            <button
                className="btn"
                onClick={() =>
                    editor.chain().focus().toggleItalic().run()
                }
            >
                <Italic className="size-5.5" strokeWidth={1.75}/>
            </button>

            {/* underline */}
            <button
                className="btn"
                onClick={() =>
                    editor.chain().focus().toggleUnderline().run()
                }
            >
                <Underline className="size-5.5" strokeWidth={2}/>
            </button>

            {/* cross */}
            <button
                className="btn"
                onClick={() =>
                    editor.chain().focus().toggleStrike().run()
                }
            >
                <LucideStrikethrough className="size-5.5" strokeWidth={2}/>
            </button>

            {/* Bullet List */}
            <button
                className="btn"
                onClick={() =>
                    editor.chain().focus().toggleBulletList().run()
                }
            >
                <List  className="size-5.5" strokeWidth={2}/>
            </button>

            {/* Ordered List */}
            <button
                className="btn"
                onClick={() =>
                    editor.chain().focus().toggleOrderedList().run()
                }
            >
                <ListOrdered className="size-5.5" strokeWidth={2}/>
            </button>

            {/* Link */}
        <Popover>

            <PopoverTrigger asChild>

                <Button variant="ghost" size="icon" className="cursor-pointer">

                    <LinkIcon className="size-4" />

                </Button>

            </PopoverTrigger>

            <PopoverContent className="w-72">

                    <div className="flex gap-2">

                        <Input
                            placeholder="https://example.com"
                            value={url}
                            onChange={(e) =>
                                setUrl(e.target.value)
                            }
                        />

                        <Button onClick={applyLink} className="cursor-pointer">
                            Apply
                        </Button>

                    </div>

                </PopoverContent>

        </Popover>

        {/* code */}
        <button
            className="btn"
            onClick={() =>
                editor.chain().focus().toggleCode().run()
            }
        >
            <Code2Icon className="size-6" strokeWidth={2}/>
        </button>
        
        {/* Image */}
        <Popover>

            <PopoverTrigger asChild>

                <Button variant="ghost" size="icon" className="cursor-pointer">

                    <ImageIcon className="size-5.5" />

                </Button>

            </PopoverTrigger>

            <PopoverContent className="w-72">

                    <div className="flex gap-2">

                        <Input
                            type="file"
                            // value={image}
                            onChange={(e) =>
                                setImage(e.target.files? e.target.files[0] : null)
                            }
                        />

                        <Button onClick={uploadImage} className="cursor-pointer">
                            Upload
                        </Button>

                    </div>

                </PopoverContent>

            </Popover>

            

      </div>
      <EditorContent editor={editor} className="px-4 ease-in-out duration-500" placeholder="I am your research Editor"/>
    </div>
  )
}

const ColorBlock = ({bg, text} : {bg?: string, text?: string}) => (
    <div className="flex gap-x-3">
        <div className={cn("size-5 rounded-[3px]", bg ? `${bg}` : "bg-black")}/>
        {/* {
            bg && <p className="capitalize">{text}</p>
        } */}
    </div>
)