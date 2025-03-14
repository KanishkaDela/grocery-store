import { Button } from '@/components/ui/button'
import Image from 'next/image'
import React from 'react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import ProductItemDetail from './ProductItemDetail'

export default function ProductItem({product}) {
  return (
    <div className='p-2 md:p-6 flex flex-col 
    items-center justify-center gap-3 border rounded-lg
    hover:scale-110 hover:shadow-lg
    transition-all ease-in-out cursor-pointer'>
      <Image src={process.env.NEXT_PUBLIC_BACKEND_BASE_URL+product?.images?.[0]?.url}
      width={500}
      height={200}
      alt={product.name}
      className='h-[200px] w-[200px] object-contain'
      />
      <h2 className='font-bold text-lg'>{product.name}</h2>
      <div className='flex gap-3'>
      {product.sellingPrice&& 
      <h2 className='font-bold text-lg'>Rs.{product.sellingPrice}</h2>}
      <h2 className={`font-bold text-lg ${product.sellingPrice&&'line-through text-gray-500'}`}>Rs.{product.mrp}</h2>
      </div>

      <Dialog>
        <DialogTrigger asChild>
        <Button variant="outline"
      className="text-primary hover:text-white hover:bg-primary">Add to cart</Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogDescription>
              <ProductItemDetail product={product}/>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>

    </div>
  )
}
