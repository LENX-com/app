import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getProductReviews } from "@/redux/actions/productAction"
import ReviewSearch from '@/marketplace/components/review/ReviewSearch'
import Layout from '@/containers/Layout'
import Comment from '@/marketplace/components/review/Comment'
import { useRouter } from 'next/router'
import {  MdArrowBack } from 'react-icons/md'


const ProductReview = ({match}) => {

    const [product, setProduct] = useState({});
    const [error, setError] = useState(false);
    const reviews = useSelector((state) => state.product.productReviews)
    const dispatch = useDispatch()
    
     const router = useRouter();
     const { manufacturerSlug } = router.query

     useEffect(() => {
        dispatch(getProductReviews(manufacturerSlug))
    }, [dispatch, manufacturerSlug])   
  

    return (
        <Layout>
            { product &&
                <div className="lg:w-5/6 mx-auto my-6">
                    <div className="my-3">
                        <button
                            className="rounded-full w-8 h-8 bg-Grey-light p-0 border-0 inline-flex items-center justify-center text-white ml-4"
                            onClick={() => setTimeout(() => router.back(), 150)}>
                            <MdArrowBack className="w-5 h-5"/>
                        </button>
                    </div>
                    <ReviewSearch reviews = { reviews }/>
           
                    {/* <Product product= { product.data }/> */}

                    <Comment reviews = { reviews } />

                </div>
            }
        </Layout>
    )
}

export default ProductReview
   