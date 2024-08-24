import Image from "next/image";

import { Alegreya_Sans_SC } from "next/font/google";

const alegreya = Alegreya_Sans_SC({weight: "800", subsets: ["latin"]})

type LogoAttributes = {
    version?: 'short' | 'completed',
    image_size?: {
        width: number,
        height: number,
    },
    text_size_in_rem?: number
}

export default function Logo({version, image_size, text_size_in_rem}: LogoAttributes) {
    return (
        <>
            {
                version === 'completed' ?
                <div className={`${alegreya.className} flex items-center gap-2 text-stockGreen`}>
                    <Image 
                        src='/ShortStockWiseLogo.svg' 
                        height={image_size?.height ?? 50} 
                        width={image_size?.width ?? 50} 
                        alt="S" 
                    />
                    <h1 className={text_size_in_rem ? `text-[${text_size_in_rem}rem]` : 'text-base'}>StockWise</h1>
                </div> 
                
                :

                <Image 
                    src='/ShortStockWiseLogo.svg' 
                    height={image_size?.height ?? 50} 
                    width={image_size?.width ?? 50} 
                    alt="S" 
                />
            }
        </>
    )
}