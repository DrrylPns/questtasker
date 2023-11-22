import Link from "next/link"
import { cn } from "@/lib/utils"
import localFont from "next/font/local"

const headingFont = localFont({
    src: "../../public/fonts/font.woff2"
})

export const Logo = () => {
    return (
        <Link href="/">
            <div className="hover:opacity-75 transition items-center gap-x-2 hidden md:flex">
                <p className={cn("text-lg text-neutral-700",
                    headingFont.className,
                )}>QuestTasker.</p>
            </div>
        </Link>
    )
}