"use client"

import Image from "next/image";

import { Alegreya_Sans_SC } from "next/font/google";
import { cn } from "@/lib/utils";

const alegreya = Alegreya_Sans_SC({weight: "800", subsets: ["latin"]})

type LogoAttributes = {
    version?: 'short' | 'completed',
    image?: {
        width?: number,
        height?: number,
        className?: string
    },
    className?: string
}

export default function Logo({version, image, className}: LogoAttributes) {
    return (
        <>
            {
                version === 'completed' ?
                <div className={cn(alegreya.className, 'flex items-center gap-2 text-stockGreen', className)}>
                    <Image 
                        src='/ShortStockWiseLogo.svg' 
                        height={image?.height ?? 50} 
                        width={image?.width ?? 50} 
                        className={cn('', image?.className)}
                        alt="S" 
                    />
                    <h1>StockWise</h1>
                </div> 
                
                :

                <div className={cn('', className)}>
                    <Image 
                        src='/ShortStockWiseLogo.svg' 
                        height={image?.height ?? 50} 
                        width={image?.width ?? 50} 
                        className={cn('', image?.className)}
                        alt="S" 
                    />
                </div>
            }
        </>
    )
}