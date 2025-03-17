"use client"
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import Image from 'next/image'
import Link from 'next/link'
import React, { useState } from 'react'

function SignIn() {

    const [password,setPassword] = useState();
    const [email,setEmail] = useState();

    const onSignIn=()=>{

    }
  return (
     <div className='flex items-baseline justify-center my-10'>
          <div className='flex flex-col items-center justify-center
          p-10 bg-slate-100 border border-gray-200'>
            <Image src='/logo.png' width={170} height={170} alt='logo' />
            <h2 className='font-bold text-3xl mt-3'>Sign In to the Account</h2>
            <h2 className='text-gray-500'>Enter Your Email and Password to Sign In</h2>
            <div className='w-full flex flex-col gap-5 mt-7'>
                
                <Input placeholder='name@example.com' 
                onChange={(e)=>setEmail(e.target.value)}
                />
                <Input type='password' 
                placeholder='Password' 
                onChange={(e)=>setPassword(e.target.value)}
                />
                <Button onClick={()=>onSignIn()}
                    disabled={!(email||password)}
                    >Sign In</Button>
                <p>don't have an Account?&nbsp;
                    <Link href={'/create-account'} className='text-blue-500'>
                        Click Here to Create New Account
                    </Link>
                </p>
            </div>
          </div>
        </div>
  )
}

export default SignIn
