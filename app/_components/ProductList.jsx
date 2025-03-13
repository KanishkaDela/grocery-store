import React from 'react'
import ProductItem from './ProductItem'

export default function ProductList({productList}) {
  return (
    <div className='m-10'>
      <h2 className='text-green-600 font-bold text-2xl'>Our Popular Products</h2>
      <div className='grid grid-cols-2 md:grid-cols-3 
      lg:grid-cols-4 gap-5 mt-6'>
        {productList.map((product,index)=>index<8&&(
            <ProductItem product={product}/>
        ))}
      </div>
    </div>
  )
}
