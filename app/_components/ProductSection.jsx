"use client"
import React, { useState, useEffect } from 'react'
import ProductList from './ProductList'
import ProductApis from '../_utils/ProductApis'
const ProductSection = () => {
const [productList, setProductList] = useState([])
useEffect(()=>{getLatestProducts_();}, [])

const getLatestProducts_ = ()=> {
    ProductApis.getLatestProducts().then(res => {
        console.log(res.data.data);
        setProductList(res.data.data)})
    }

  return (
    <section id="product-section">
   
    <div className="mt-0 px-10 md:px--20 ">  <h2 className='my-9 mx-9  text-3xl text-gray-400'>Our Latest Products :</h2> <ProductList productList={productList}/> </div> </section>
  )
}

export default ProductSection