import { cn } from '@/lib/utils'

import Image from 'next/image'
import React from 'react'



export const InformationSection = () => {
    return (
        <div className='h-screen w-full mt-3 flex flex-col'>
            <div className='ml-4'>
                <p className={cn(
                    "text-base text-zinc-700 font-semibold mb-1")}>
                    QuestTasker 101</p>
                <h1 className='mb-3 text-xl text-sky-950 font-bold'>
                    A robust task management platform
                </h1>
                <p className='text-muted-foreground text-sm mb-3'>
                    Incorporating key elements such as organizations, boards, lists, and cards to enhance your productivity and project management capabilities.
                </p>
            </div>
            <div className='aspect-video flex items-center justify-center'>
                <Image
                    src="/scrumboard.svg"
                    alt='board icon'
                    className=''
                    width={300}
                    height={300}
                />
            </div>
        </div>
    )
}