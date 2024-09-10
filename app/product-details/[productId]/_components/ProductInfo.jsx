"use client"
import { AlertOctagon, BadgeCheck, ShoppingCart } from 'lucide-react' //icons library
import React, { useContext } from 'react'
import SkeletonProductInfo from './SkeletonProductInfo'
import { useUser } from '@clerk/nextjs'
import { useRouter } from 'next/navigation';
import CartApis from '../../../_utils/CartApis'
import { CartContext } from '@/app/_context/CartContext'
function ProductInfo({product}) {
  const {cart, setCart}  = useContext(CartContext)
const {user} = useUser();
const router = useRouter();
const handleAddToCart = () => {
  if (!user) {
    router.push('/sign-in')
  } else {
 /*logic to add to cart*/
 const data = {
  data : {
    userName : user.fullName,
    email: user.primaryEmailAddress.emailAddress,
    products: [product?.id]
  }
 }
 CartApis.addToCart(data).then(res=> {
  console.log('cart created successfully', res.data.data)
  setCart(oldCart=>[...oldCart,
    {
      id: res?.data?.data?.id,
      product
    }
  ] )
 }).catch(error=> {
  console.log('error', error)
 })
  } 
}
  return (
    <div>
       {product?.id ? <div>
     
     <h2 className='text-[20px] text-gray-300'>
       {product?.attributes?.title}
     </h2>
     <h2 className='text-[15px] text-gray-400 '>
       {product?.attributes?.category}
     </h2>
     <h2 className='text-[15px] mt-5  text-gray-300'>
       {product?.attributes?.description[0]?.children[0]?.text}
     </h2>
     <h2 className='text-[11px] text-gray-400 flex gap-2 mt-2 items-center '>{product?.attributes?.instantDelivery ? <BadgeCheck className='w-5 h-5 text-green-500'/> : <AlertOctagon className='text-red-600 w-5 h-5'/>}Eligible For Instant Delivery</h2>
     <h2 className='text-[32px] text-green-800 mt-3 '>
       ${product?.attributes?.price}
     </h2>
     <button onClick={()=> handleAddToCart()} className='flex gap-2 p-3 text-white bg-primary hover:bg-secondary rounded-lg mt-2'><ShoppingCart/> Add To Cart</button>
   </div> : <SkeletonProductInfo/> }
    
    </div>
  )
}

export default ProductInfo