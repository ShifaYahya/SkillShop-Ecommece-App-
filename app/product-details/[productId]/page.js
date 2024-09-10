"use client";
import { useEffect, useState } from 'react';
import ProductApis from '@/app/_utils/ProductApis';
import React from 'react';
import BreadCrumb from '@/app/_components/BreadCrumb'
import ProductBanner from './_components/ProductBanner'
import ProductInfo from './_components/ProductInfo'
import ProductList from '@/app/_components/ProductList';
import { usePathname } from 'next/navigation';
function ProductDetails({ params }) {
const path =  usePathname()
console.log('path', path)
  const [error, setError] = useState(null);
  const [product, setProduct] = useState(null);
  const [productDetails, setProductDetails] = useState({})
  const [productList, setProductlist] = useState([])

  useEffect(() => {
    getProductById_();
  }, [params?.productId]);

  const getProductById_ = () => {
    console.log('params:', params);
    ProductApis.getProductById(params?.productId)
      .then(res => {
        console.log('product item', res.data.data);
        setProduct(res.data.data);
        setProductDetails(res.data.data)
        getProductListByCategory(res.data.data)
        
      })
      .catch(error => {
        console.error('Error fetching product:', error);
        if (error.response && error.response.status === 404) {
          setError('Product not found');
        } else {
          setError('An error occurred while fetching the product');
        }
      });
  };

  if (error) {
    return <div>{error}</div>;
  }

const getProductListByCategory = (product) => {
  ProductApis.getProductsByCategory(product?.attributes?.category).then(res=>{
    console.log(res?.data?.data)
    setProductlist(res?.data?.data)
  })
}

  return (
    <div className= 'px-10 py-8 md:px-28 '>
      <BreadCrumb path={path}/>
      <div className='grid grid-cols-1  gap-5 sm:gap-0 sm:grid-cols-2 justify-around mt-10'>
        <ProductBanner product={productDetails}/>
        <ProductInfo product={productDetails}/>
      </div>
      <div>
        <h2 className='mt-24 mb-4 text-xl text-gray-300'>Similar Products</h2>
        <ProductList productList={productList}/>
      </div>
    </div>
  );
}

export default ProductDetails;
