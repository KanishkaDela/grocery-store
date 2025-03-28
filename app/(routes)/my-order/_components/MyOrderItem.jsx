import Image from 'next/image'
import React from 'react'

function MyOrderItem({orderItem}) {
  return (
    <>
    <hr></hr>
    <div className='grid grid-cols-5 mt-3 items-center'>
      <Image src={process.env.NEXT_PUBLIC_BACKEND_BASE_URL+orderItem.product.images?.[0]?.url}
       width={80} 
       height={80} 
       alt='image'
       className='bg-gray-100  rounded-md border'
       />
      <div className='col-span-2'>
        <h2>{orderItem.product.name}</h2>
        <h2>Item Price: Rs.{orderItem.product.sellingPrice}</h2>
      </div>
      <h2>Quantity: {orderItem.quantity}</h2>
      <h2>Price:{orderItem.price}</h2>
      
    </div>
    <hr className='mt-3'></hr>
    </>
  )
}

export default MyOrderItem
