import { Button } from '@/components/ui/button'
import { Medal } from 'lucide-react'
import Link from 'next/link'
import React from 'react'
import localFont from "next/font/local"
import { cn } from '@/lib/utils'
import { Poppins } from 'next/font/google'

const headingFont = localFont({
    src: "../../../public/fonts/font.woff2"
})

const textFont = Poppins({
    subsets: ["latin"],
    weight: [
        "100",
        "200",
        "300",
        "400",
        "500",
        "600",
        "700",
        "800",
        "900",
    ]
})

const MarketingPage = () => {
  return (
    <div className='flex items-center justify-center flex-col'>
        <div className={cn('flex items-center justify-center flex-col',
            headingFont.className
        )}>
            <div className='mb-4 flex items-center border shadow-sm p-4 bg-amber-100 text-amber-700 rounded-full uppercase'>
                <Medal className='h-6 w-6 mr-2' />
                No 1 task management
            </div>
            <h1 className='text-3xl md:text-6xl text-center text-neutral-800 mb-6'>
                Embark on your tasks like never before, turning challenges into conquests 
            </h1>
            <div className='text-3xl md:text-6xl bg-gradient-to-r from-fuchsia-600 to-pink-600 text-white px-4 p-2 rounded-md w-fit'>
                with QuestTasker.
            </div>
        </div>

        <div className={cn('text-sm md:-text-xl text-neutral-400 mt-4 max-w-xs md:max-w-2xl text-center mx-auto',
            textFont.className,
        )}>
            QuestTasker: More than a tool—it's your productivity companion. Conquer tasks, turn challenges into triumphs, and embark on a journey to project success like never before!
        </div>
        <Button className='mt-6' size="lg" asChild>
            <Link href="/sign-up">
                Get QuestTaskmaster for free
            </Link>
        </Button>
    </div>
  )
}

export default MarketingPage