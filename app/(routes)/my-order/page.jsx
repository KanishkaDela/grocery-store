"use client"
import GlobalApi from '@/app/_utils/GlobalApi';
import { useRouter } from 'next/navigation';
import React, { useEffect } from 'react'

function MyOrder() {
    const jwt = sessionStorage.getItem('jwt');  // Retrieve JWT token from sessionStorage
    const user = JSON.parse(sessionStorage.getItem('user'));  // Retrieve user info from sessionStorage
    const router = useRouter();

    useEffect(() => {
        if (!jwt) {
            router.replace('/');  // Redirect to home if no JWT is found
        } else {
            getMyOrder();  // Call the API to fetch orders if JWT is available
        }
    }, [jwt]);  // Dependency on jwt, re-run if jwt changes

    const getMyOrder = async () => {
        if (!user || !user.id || !jwt) {
            console.error('User ID or JWT is missing');
            return;  // Ensure that user ID and JWT are present
        }

        const orderList = await GlobalApi.getMyOrder(user.id, jwt);  // Pass both user ID and JWT
        console.log(orderList);  // Log the fetched order list
    }

    return (
        <div>
            MyOrder
        </div>
    )
}

export default MyOrder
