import { cn } from "@/lib/utils"
import { InputType } from "@/types/types"
import {Search} from "lucide-react"
/*
    This component displays a custom placeholder.
    The "placeholder" is in reality a label. when the input is focused, it goes up, when the
    placeholder is not there, the label is hidden.
*/
export default function CustomInput({className, label, icon, labelClassName, inputClassName, textArea, value, onChange, props} : InputType) {
  return (
    <div className={cn(`relative text-gray-800 dark:text-gray-100`, className)}>
        {
            textArea ? 
            <textarea {...props} required value={value} onChange={onChange} cols={10} rows={8} name="input" id="input" placeholder="" className={cn("w-full px-4 py-3 text-xs bg-gray-100 dark:bg-gray-200 text-gray-800 rounded-md peer outline-none resize-none", inputClassName)}/>
            :
            <input {...props} required value={value} onChange={onChange} type="text" name="input" id="input" placeholder="" className={cn("w-full px-4 py-3 text-xs bg-gray-100 dark:bg-gray-200 text-gray-800 rounded-md peer outline-none dark:text-white", inputClassName)}/>
        }
        {icon}
        {/* <Search className="text-gray-800 dark:text-gray-400 absolute top-3 left-3 size-4 peer-focus:hidden peer-not-placeholder-shown:hidden pointer-events-none"/> */}
        <label htmlFor="input" className={cn("absolute top-3 left-7.5 text-xs bg-gray-100 px-2 rounded-md opacity-0 peer-focus:-top-2.5 peer-focus:opacity-100 peer-placeholder-shown:opacity-100 ease-in-out  duration-500 dark:text-black dark:bg-gray-200 pointer-events-none capitalize", !icon && "left-3", labelClassName)}>{label? label :"search..."}</label>
    </div>
    )
}
