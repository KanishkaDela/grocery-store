import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ArrowBigRight } from 'lucide-react';
import React from 'react'

function Checkout() {
  return (
    <div>
      <h2 className='p-3 bg-primary text-xl font-bold text-center text-white'>Checkout</h2>
      <div className='p-5 px-5 md:px-10 grid grid-cols-1 md:grid-cols-3 py-8'>
        <div className='col-span-2 mx-20'>
            <h2 className='font-bold text-3xl'>Billing Details</h2>
            <div className='grid grid-cols-2 gap-10 mt-3'>
                <Input placeholder='Name' />
                <Input placeholder='Email' />
            </div>
            <div className='grid grid-cols-2 gap-10 mt-3'>
                <Input placeholder='Phone' />
                <Input placeholder='Zip' />
            </div>
            <div className='mt-3'>
                <Input placeholder='Address' />
            </div>
        </div>
        <div className='mx-10 border'>
            <h2 className='p-3 bg-gray-200 font-bold text-center'>Total Cart (03)</h2>
            <div className='p-4 flex flex-col gap-2'>
                <h2 className='font-bold flex justify-between'>Subtotal : <span>Rs.25000.00</span></h2>
                <hr></hr>
                <h2 className='flex justify-between'>
                    Delivery : <span>Rs.1500.00</span>
                </h2>
                <h2 className='flex justify-between'>
                    Tax : <span>Rs.25000.00</span>
                </h2>
                <hr></hr>
                <h2 className='font-bold flex justify-between'>Total : <span>Rs.35000.00</span></h2>
                <Button>Payment <ArrowBigRight /> </Button>
            </div>
        </div>
      </div>
    </div>
  )
}

export default Checkout;
