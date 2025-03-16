"use client"
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import Image from 'next/image'
import Link from 'next/link'
import React, { useState } from 'react'

function CreateAccount() {
    const [username,setUsername] = useState();
    const [email,setEmail] = useState();
    const [password,setPassword] = useState();

    const onCreateAccount=()=>{

    }
    
  return (
    <div className='flex items-baseline justify-center my-10'>
      <div className='flex flex-col items-center justify-center
      p-10 bg-slate-100 border border-gray-200'>
        <Image src='/logo.png' width={170} height={170} alt='logo' />
        <h2 className='font-bold text-3xl mt-3'>Create an Account</h2>
        <h2 className='text-gray-500'>Enter Your Email and Password to Create an Account</h2>
        <div className='w-full flex flex-col gap-5 mt-7'>
            <Input placeholder='Username'
            onChange={(e)=>setUsername(e.target.value)}
            />
            <Input placeholder='name@example.com' 
            onChange={(e)=>setEmail(e.target.value)}
            />
            <Input type='password' 
            placeholder='Password' 
            onChange={(e)=>setPassword(e.target.value)}
            />
            <Button onClick={()=>onCreateAccount()}>Create an Account</Button>
            <p>Already have an Account?&nbsp;
                <Link href={'/sign-in'} className='text-blue-500'>
                    Click Here to Sign In
                </Link>
            </p>
        </div>
      </div>
    </div>
  )
}

export default CreateAccount
