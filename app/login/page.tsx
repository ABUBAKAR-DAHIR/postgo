import {RegisterLink, LoginLink} from "@kinde-oss/kinde-auth-nextjs/components";
import Image from "next/image";

export default function page() {
  return (
    <div className="w-full h-screen flex flex-col items-center justify-center">
        <div className="w-1/3 h-fit border-2 flex flex-col items-center justify-center rounded-md py-16 px-4 max-lg:py-8 max-lg:w-1/2 max-md:w-4/5">
          <div className="flex gap-2 items-center justify-center">
            <Image src="/logo.svg" width={38} height={30} alt="logo"/>
            <h2 className="text-lg font-semibold uppercase">postGo</h2>
          </div>
          <div className="mb-8 mt-10">
            <p className="text-center capitalize">please login or signup to access the platform</p>
          </div>
          <div className="w-full flex flex-col gap-4">
            <LoginLink postLoginRedirectURL="/auth-callback" className="w-full text-center text-sm  uppercase border-2 border-black dark:border-black bg-none dark:bg-white text-black dark:text-black hover:text-white hover:bg-black hover:dark:bg-black hover:dark:text-white hover:dark:border-white transition-all duration-500 ease-in-out hover:tracking-widest hover:border-black py-3.5 px-6 rounded-md max-md:text-sm">Sign in</LoginLink>
            <RegisterLink postLoginRedirectURL="/auth-callback" className="w-full text-center  text-sm uppercase border-2 border-white dark:border-black bg-black dark:bg-white text-white dark:text-black hover:text-black hover:bg-white hover:dark:bg-black hover:dark:text-white hover:dark:border-white transition-all duration-500 ease-in-out hover:tracking-widest hover:border-black py-3.5 px-6 rounded-md max-md:text-sm">Sign up</RegisterLink>
          </div>
      
        </div>
    </div>
  )
}
