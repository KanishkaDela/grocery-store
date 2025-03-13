import React from 'react'
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
  } from "@/components/ui/carousel"
import Image from 'next/image'

export default function Slider({sliderList}) {

    
  return (
    <div>
      <Carousel>
        <CarouselContent>
            {sliderList.map((slider,index)=>(
                <CarouselItem key={index}>
                    <Image src={process.env.NEXT_PUBLIC_BACKEND_BASE_URL+slider.image?.[0]?.url}
                    width={1000}
                    height={370}
                    alt='slider'
                    className='w-full h-[200px] md:h-[500px] object-cover rounded-2xl '
                    
                    />
                    
                </CarouselItem>
                
            ))}
            
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>

    </div>
  )
}
