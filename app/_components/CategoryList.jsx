import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

export default function CategoryList({categoryList}) {
  return (
    <div className='m-2 mt-5'>
      <h2 className='text-green-600 font-bold text-2xl'>Shop by Category</h2>
      <div className='grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-7  gap-5 mt-2'>
        {categoryList.map((category,index) => (
            <Link href={'/products-category/'+category.name} className='flex flex-col items-center bg-green-50 gap-2 p-3 rounded-lg mt-2 group cursor-pointer
            hover:bg-green-200'>
                <Image src={process.env.NEXT_PUBLIC_BACKEND_BASE_URL+category?.icon?.[0]?.url} 
                width={50}
                height={50}
                alt='icon'
                className='group-hover:scale-125 transition-all ease-in-out'
                />
                <h2 className='text-green-800'>{category.name}</h2>
            </Link>
        ))}
      </div>
    </div>
  )
}
