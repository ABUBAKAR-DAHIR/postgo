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
import Indent from "@weiruo/tiptap-extension-indent"
import { Tooltip, TooltipContent, TooltipTrigger } from "./ui/tooltip"

export default function Editor({onChange, clearTrigger, value} : {onChange: (value: string) => void, clearTrigger: boolean, value: string}) {
    const [url, setUrl] = useState<string>("")
    const [image, setImage] = useState<File | null>(null)
    const theme = getTheme()
    const [color, setColor] = useState<string | null>(null)
    const [customColor, setCustomColor] = useState<string>()
    
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
        TiptapImage,
        Indent.configure({
            types: ["paragraph", "heading"]
        })
    ],
    content: value,

    onUpdate({editor}){
        // console.log("editor: ", editor.getHTML())
        onChange(editor.getHTML())
    }
    
    
  })
  useEffect(() => {
      if(editor && clearTrigger){
          editor.commands.clearContent()
      }
  }, [clearTrigger])

  
  useEffect(()=>{
      if(!editor) return
      editor.commands.setContent(value)
    }, [editor, value])
    
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
            <Tooltip>
                <TooltipTrigger>
                    <LucideUndo2 className="size-5.5" strokeWidth={1.5}/>
                </TooltipTrigger>

                <TooltipContent>Undo</TooltipContent>
            </Tooltip>
        </button>

        <button
          className="btn"
          onClick={() =>
            editor.chain().focus().redo().run()
          }
        >
            <Tooltip>
                <TooltipTrigger>
                    <LucideRedo2 className="size-5.5" strokeWidth={1.5} />
                </TooltipTrigger>

                <TooltipContent>Redo</TooltipContent>
            </Tooltip>
        </button>

        {/* Text */}
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
                    <Tooltip>
                        <TooltipTrigger>
                            <SelectValue placeholder="Normal Text" className="placeholder:text-black dark:placeholder:text-gray-200 cursor-pointer text-xs"/>
                        </TooltipTrigger>
                        
                        <TooltipContent>
                            Change text sizes
                        </TooltipContent>
                    </Tooltip>
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
        {/* normal text */}


        <Select
            onValueChange={(value) => {
                if (value === "0") {
                 editor.chain().focus().indent().run()
                }

                if (value === "1") {
                editor.chain().focus().indent().run()
                }

                if (value === "2") {
                editor.chain().focus().indent().indent().run()
                }

                if (value === "3") {
                editor.chain().focus().indent().indent().indent().run()
                }
            }}
            >
                <SelectTrigger className="w-fit">
                    <Tooltip>
                        <TooltipTrigger>
                            <SelectValue placeholder="Indent" />
                        </TooltipTrigger>
                        
                        <TooltipContent>
                            Change indentation
                        </TooltipContent>
                    </Tooltip>
                </SelectTrigger>

                <SelectContent>
                    <SelectItem value="0">No Indent</SelectItem>
                    <SelectItem value="1">Level 1</SelectItem>
                    <SelectItem value="2">Level 2</SelectItem>
                    <SelectItem value="3">Level 3</SelectItem>
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
                    <Tooltip>
                        <TooltipTrigger>
                            <SelectValue placeholder={ <ColorBlock /> } className="border-none border-transparent"/>    
                        </TooltipTrigger>
                        
                        <TooltipContent>
                            Change text color
                        </TooltipContent>
                    </Tooltip>
            </SelectTrigger>  

            <SelectContent className="relative border-transparent py-3 px-1.5">
                <SelectItem value="black" className="cursor-pointer"> <ColorBlock bg="bg-black" /> Black </SelectItem>
                <SelectItem value="red" className="cursor-pointer">  <ColorBlock bg="bg-red-500" /> Red </SelectItem>
                <SelectItem value="green" className="cursor-pointer">  <ColorBlock bg="bg-green-500" /> Green </SelectItem>
                <SelectItem value="blue" className="cursor-pointer">  <ColorBlock bg="bg-blue-500" /> Blue </SelectItem>
                <SelectItem value="purple" className="cursor-pointer">  <ColorBlock bg="bg-purple-500" /> Purple </SelectItem>
                {
                    customColor && <SelectItem value={customColor} className="cursor-pointer"><ColorBlock color={customColor} /> Custom </SelectItem> 
                }
                {/* custom color */}
                <Popover>
                    <PopoverTrigger>
                        <Button variant="link" className="mt-2 text-gray-500 cursor-pointer capitalize text-xs">add new +</Button>
                    </PopoverTrigger>

                    <PopoverContent>
                        <input type="color" onChange={(e) => setColor(e.currentTarget.value)} className="w-full cursor-pointer rounded-xl" value={color ?? "#7ad110"}/>
                        <Button onClick={() => setCustomColor(color ?? "#7ad110")} className='cursor-pointer'>Add</Button>
                        
                    </PopoverContent>
                </Popover>
            </SelectContent>
        </Select> 

        {/* Link */}
        <Popover>

            <PopoverTrigger asChild>

                <Button variant="ghost" size="icon" className="cursor-pointer">
                    <Tooltip>
                        <TooltipTrigger>
                                <LinkIcon className="size-4" />
                        </TooltipTrigger>
                            
                        <TooltipContent>
                            Create a link
                        </TooltipContent>
                        
                    </Tooltip>

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
                <Tooltip>
                    <TooltipTrigger>
                        <Bold className="size-5.5" strokeWidth={3}/>
                    </TooltipTrigger>
                        
                    <TooltipContent>
                        Bold
                    </TooltipContent>
                    
                </Tooltip>
            </button>
            
            {/* italic */}
            <button
                className="btn"
                onClick={() =>
                    editor.chain().focus().toggleItalic().run()
                }
            >
                <Tooltip>
                    <TooltipTrigger>
                        <Italic className="size-5.5" strokeWidth={1.75}/>
                    </TooltipTrigger>
                        
                    <TooltipContent>
                        Italic
                    </TooltipContent>
                    
                </Tooltip>
            </button>

            {/* underline */}
            <button
                className="btn"
                onClick={() =>
                    editor.chain().focus().toggleUnderline().run()
                }
            >
                <Tooltip>
                    <TooltipTrigger>
                        <Underline className="size-5.5" strokeWidth={2}/>
                    </TooltipTrigger>
                        
                    <TooltipContent>
                        Underline
                    </TooltipContent>
                    
                </Tooltip>
            </button>

            {/* cross */}
            <button
                className="btn"
                onClick={() =>
                    editor.chain().focus().toggleStrike().run()
                }
            >
                <Tooltip>
                    <TooltipTrigger>
                        <LucideStrikethrough className="size-5.5" strokeWidth={2}/>
                    </TooltipTrigger>
                        
                    <TooltipContent>
                        Cross
                    </TooltipContent>
                    
                </Tooltip>
            </button>

            {/* Bullet List */}
            <button
                className="btn"
                onClick={() =>
                    editor.chain().focus().toggleBulletList().run()
                }
            >
                <Tooltip>
                    <TooltipTrigger>
                        <List  className="size-5.5" strokeWidth={2}/>
                    </TooltipTrigger>
                        
                    <TooltipContent>
                        Unordered list
                    </TooltipContent>
                    
                </Tooltip>
            </button>

            {/* Ordered List */}
            <button
                className="btn"
                onClick={() =>
                    editor.chain().focus().toggleOrderedList().run()
                }
            >
                <Tooltip>
                    <TooltipTrigger>
                        <ListOrdered className="size-5.5" strokeWidth={2}/>
                    </TooltipTrigger>
                        
                    <TooltipContent>
                        Ordered list
                    </TooltipContent>
                    
                </Tooltip>
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
                editor.chain().focus().toggleCodeBlock().run()
            }
        >
            <Tooltip>
                    <TooltipTrigger>
                        <Code2Icon className="size-6" strokeWidth={2}/>
                    </TooltipTrigger>
                        
                    <TooltipContent>
                        Code
                    </TooltipContent>
                    
                </Tooltip>
        </button>
        
        {/* Image */}
        <Popover>

            <PopoverTrigger asChild>

                <Button variant="ghost" size="icon" className="cursor-pointer">

                    <Tooltip>
                        <TooltipTrigger>
                            <ImageIcon className="size-5.5" />
                        </TooltipTrigger>
                            
                        <TooltipContent>
                            Upload image
                        </TooltipContent>
                        
                    </Tooltip>

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

const ColorBlock = ({bg, text, color} : {bg?: string, text?: string, color?: string}) => (
    <div className="flex gap-x-3">
        <div className={cn("size-5 rounded-[3px]", bg ? `${bg}` : "bg-black")} style={color ? {backgroundColor: color}: undefined}/>
        {/* {
            bg && <p className="capitalize">{text}</p>
        } */}
    </div>
)