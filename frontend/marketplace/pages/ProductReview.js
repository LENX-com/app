import React, { useState, useEffect } from 'react'
import Product from '../components/review/Product'
import { useDispatch, useSelector } from 'react-redux'
import { getProductReviews } from "../../actions/productAction"
import ReviewSearch from '../components/review/ReviewSearch'
import Comment from '../components/review/Comment'
import { read  } from '../components/ApiCore';
import { useHistory } from 'react-router-dom'
import {  MdArrowBack } from 'react-icons/md'


const ProductReview = ({match}) => {

    const [product, setProduct] = useState({});
    const [error, setError] = useState(false);
    const reviews = useSelector((state) => state.product.productReviews)
    const dispatch = useDispatch()
    
     const history = useHistory();

     useEffect(() => {
        dispatch(getProductReviews(match.params.productId))
    }, [dispatch])   
  


    return (
        <>
            { product &&
                <div>
                    <div className="my-3">
                        <button
                            className="rounded-full w-8 h-8 bg-Grey-light p-0 border-0 inline-flex items-center justify-center text-white ml-4"
                            onClick={() => setTimeout(() => history.goBack(), 150)}>
                            <MdArrowBack className="w-5 h-5"/>
                        </button>
                    </div>
                    <ReviewSearch reviews = { reviews }/>
           
                    {/* <Product product= { product.data }/> */}

                    <Comment reviews = { reviews } />

                </div>
            }
        </>
    )
}

export default ProductReview
   