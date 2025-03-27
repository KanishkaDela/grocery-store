"use client"
import GlobalApi from '@/app/_utils/GlobalApi';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { PayPalButtons } from '@paypal/react-paypal-js';
import { ArrowBigRight } from 'lucide-react';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import { toast } from 'sonner';

function Checkout() {

    const [user, setUser] = useState(null);
    const [jwt, setJwt] = useState(null);
    const [isLogin, setIsLogin] = useState(false);
    const [totalCartItem,setTotalCartItem]=useState(0)
    const [cartItemList,setCartItemList]=useState([]);
    const [subtotal,setSubTotal]=useState(0);
    const router=useRouter();

    const [username,setUsername]=useState();
    const [email,setEmail]=useState();
    const [phone,setPhone]=useState();
    const [zip,setZip]=useState();
    const [address,setAddress]=useState();

    const [exchangeRate, setExchangeRate] = useState(1); // Default to 1 in case of failure
     
          /**used to get total cart item */
          const getCartItems=async()=>{
              const cartItemList_=await GlobalApi.getCartItems(user.id,jwt)
              console.log(cartItemList_);
              setTotalCartItem(cartItemList_?.length);
              setCartItemList(cartItemList_);
          }

          useEffect(() => {
            if (typeof window !== 'undefined') {
                const storedJwt = sessionStorage.getItem('jwt');
                const storedUser = sessionStorage.getItem('user');
        
                if (!storedJwt || !storedUser) {
                    router.push('/sign-in'); // Redirect if not logged in
                } else {
                    setIsLogin(true);
                    setJwt(storedJwt);
                    setUser(JSON.parse(storedUser));
                }
            }
        }, []);
        

        useEffect(() => {
            if (user && jwt) {
                getCartItems();
            }
        }, [user, jwt]);

        
        
            useEffect(()=>{
                let total=0;
                cartItemList.forEach(element => {
                    total=total+element.amount
                });
                setSubTotal(total.toFixed(2))
            },[cartItemList])

            useEffect(() => {
                fetchExchangeRate();
            }, []);
        
            // Fetch exchange rate from LKR to USD
            const fetchExchangeRate = async () => {
                try {
                    const response = await fetch('https://api.exchangerate-api.com/v4/latest/LKR');
                    const data = await response.json();
                    if (data && data.rates && data.rates.USD) {
                        setExchangeRate(data.rates.USD);
                    }
                } catch (error) {
                    console.error('Error fetching exchange rate:', error);
                }
            };
        
        
            const calculateTotalAmount = () => {
                const validSubtotal = Number(subtotal) || 0; // Convert subtotal to a number, default to 0
                const totalAmount = validSubtotal + (validSubtotal * 0.09 + 1500);
                return totalAmount.toFixed(2);
            };

            const calculateTaxAmount=()=>{
                const taxAmount=subtotal*0.09
                return taxAmount.toFixed(2);
            }

            const calculateTotalUSD = () => {
                return (calculateTotalAmount() * exchangeRate).toFixed(2);
            };
            
            const onApprove=(data)=>{
                console.log(data);

                const payload = {
                   data:{ 
                        paymentId: data.paymentID,
                        totalOrderAmount: parseFloat(calculateTotalAmount()),
                        username: username,
                        email: email,
                        phone: phone,
                        zip: zip,
                        address: address,
                        orderItemList: cartItemList.map(item => ({
                            product: item.product, // Send just the product ID
                            quantity: item.quantity,
                            price: item.amount
                            })),
                        userId: user.id
                }}
                
                console.log('Order Payload:', JSON.stringify(payload, null, 2));

                GlobalApi.createOrder(payload, jwt).then(resp => {
                    console.log(resp);
                    toast('Order Placed Successfully');
                    // router.push('/order-success'); // Redirect after successful payment
                }).catch(error => console.error('Order creation failed:', error));
                
            }

  return (
    <div>
      <h2 className='p-3 bg-primary text-xl font-bold text-center text-white'>Checkout</h2>
      <div className='p-5 px-5 md:px-10 grid grid-cols-1 md:grid-cols-3 py-8'>
        <div className='md:col-span-2 mx-20'>
            <h2 className='font-bold text-3xl'>Billing Details</h2>
            <div className='grid grid-cols-2 gap-10 mt-3'>
                <Input placeholder='Name' onChange={(e)=>setUsername(e.target.value)} />
                <Input placeholder='Email' onChange={(e)=>setEmail(e.target.value)} />
            </div>
            <div className='grid grid-cols-2 gap-10 mt-3'>
                <Input placeholder='Phone' onChange={(e)=>setPhone(e.target.value)} />
                <Input placeholder='Zip' onChange={(e)=>setZip(e.target.value)} />
            </div>
            <div className='mt-3'>
                <Input placeholder='Address' onChange={(e)=>setAddress(e.target.value)} />
            </div>
        </div>
        <div className='mx-10 border'>
            <h2 className='p-3 bg-gray-200 font-bold text-center'>Total Cart {totalCartItem}</h2>
            <div className='p-4 flex flex-col gap-2'>
                <h2 className='font-bold flex justify-between'>Subtotal : <span>Rs.{subtotal}</span></h2>
                <hr></hr>
                <h2 className='flex justify-between'>
                    Delivery : <span>Rs.1500.00</span>
                </h2>
                <h2 className='flex justify-between'>
                    Tax (9%) : <span>Rs.{calculateTaxAmount()}</span>
                </h2>
                <hr></hr>
                <h2 className='font-bold flex justify-between'>Total : <span>Rs.{calculateTotalAmount()}</span></h2>
                {/* <Button onClick={()=>onApprove({paymentId:123})}>Payment <ArrowBigRight /> </Button> */}
                {calculateTotalAmount()>1500&&
                <PayPalButtons style={{ layout: "horizontal" }}
                onApprove={onApprove}
                createOrder={(data, actions) => {
                    return actions.order.create({
                        purchase_units: [
                            {
                                amount: {
                                    value: parseFloat(calculateTotalUSD()),
                                    currency_code: 'USD'
                                }
                            }
                        ]
                    });
                }}
                />
            }

            </div>
        </div>
      </div>
    </div>
  )
}

export default Checkout;
