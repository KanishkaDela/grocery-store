'use client'
import { Button } from '@/components/ui/button'
import { ShoppingBasket } from 'lucide-react'
import Image from 'next/image'
import React, { use, useState } from 'react'

export default function ProductItemDetail({product}) {

    const [productTotalPrice,serProductTotalPrice] = useState(
        product.sellingPrice?
        product.sellingPrice:
        product.mrp
    )

    const [quantity,setQuantity]=useState(1);

  return (
    <div className='grid grid-cols-1 md:grid-cols-2 p-7 bg-white text-black'>
      <Image src={process.env.NEXT_PUBLIC_BACKEND_BASE_URL+product?.images?.[0]?.url} 
      alt='image'
      width={300}
      height={300}
      className='bg-slate-200 p-5 h-[320px] w-[320px] 
      rounded-lg object-contain'
      />
      <div className='flex flex-col gap-3'>
        <h2 className='text-2xl font-bold'>{product.name}</h2>
        <h2 className='text-sm text-gray-500'>{product.description}</h2>
        <div className='flex gap-3'>
            {product.sellingPrice&& 
            <h2 className='font-bold text-3xl'>Rs.{product.sellingPrice}</h2>}
            <h2 className={`font-bold text-3xl ${product.sellingPrice&&'line-through text-gray-500'}`}>Rs.{product.mrp}</h2>
        </div>
        <h2 className='font-bold text-lg'>Quantity {product.itemQuantityType}</h2>
        <div className='flex flex-col items-baseline gap-3'>
            <div className='flex gap-3 items-center'>
                <div className='p-2 border flex gap-10 items-center px-5'>
                    <button disabled={quantity==1} onClick={()=>setQuantity(quantity-1)}>-</button>
                    <h2>{quantity}</h2>
                    <button onClick={()=>setQuantity(quantity+1)}>+</button>
                </div>
                <h2 className='text-lg font-bold'> = Rs.{(quantity*productTotalPrice).toFixed(2)}</h2>
            </div>
            <Button className="flex gap-3">
                <ShoppingBasket/>
                Add to Cart
            </Button>
        </div>
        <h2> <span className='font-bold'>Category: </span>{product.categories?.[0]?.name}</h2>
      </div>
    </div>
  )
}
