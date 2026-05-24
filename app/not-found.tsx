"use client"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { ArrowLeft, FileQuestion } from "lucide-react"
import { useRouter } from "next/navigation"

export default function DashboardNotFound() {
    const router = useRouter()

    return (
        <div className="w-full min-h-screen flex items-center justify-center p-6 bg-background">
            <Card className="w-full max-w-lg border shadow-xl rounded-3xl px-8 py-12 flex flex-col items-center text-center gap-6">

                {/* Icon */}
                <div className="size-20 rounded-full bg-muted flex items-center justify-center">
                    <FileQuestion className="size-10 text-muted-foreground" />
                </div>

                {/* Text */}
                <div className="space-y-2">
                    <h1 className="text-4xl font-bold tracking-tight max-md:text-3xl">
                        404
                    </h1>

                    <h2 className="text-xl font-semibold max-md:text-[13.5px]">
                        Page not found
                    </h2>

                    <p className="text-sm text-muted-foreground max-w-sm max-md:text-[11px]">
                        The page you are looking for does not exist or may have been moved.
                    </p>
                </div>

                {/* Button */}
                <Button
                    className="mt-2 h-12 px-6 rounded-xl cursor-pointer max-md:text-xs"
                    onClick={() => router.back()}
                >
                    <ArrowLeft className="size-4" />
                    Go back
                </Button>

            </Card>
        </div>
    )
}