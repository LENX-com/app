import React, { useState, useEffect, useMemo, memo, useContext } from "react";
import {
  MdStar,
  MdFavoriteBorder,
  MdArrowBack,
  MdFavorite,
  MdLocalShipping,
} from "react-icons/md";
import { useRouter } from 'next/router'
import { AiFillWechat } from 'react-icons/ai'
import { FaShippingFast } from "react-icons/fa";
import parse from 'html-react-parser';
import Card from "@/components/Cards/Card";
import Button from "@/components/Buttons/Button";
import { addWishList, getWishList } from "@/redux/actions/wishlistAction";
import { useDispatch, useSelector } from "react-redux";
import { SwiperSlide, Swiper } from 'swiper/react'
import Link from 'next/link'

const SingleProduct = ({ product,  isTabletOrMobile, handleProfile, handleChat, toggleSidebar}) => {

    const router = useRouter()
    const { isAuthenticated } = useSelector((state) => state.auth)
    const { wishlists } = useSelector((state) => state.wishlist);
    const dispatch = useDispatch();
     const [swiperRef, setSwiperRef] = useState(null)

     console.log("swiperRef", swiperRef)

    const slideTo = (index) => {
      console.log("index", index)
      swiperRef.slideTo(index, 0);
    };

    const { author } = product

    var total = 0;
        for(var i = 0; i < product.reviews.length; i++) {
        total += reviews[i].rating;  
    }
    var avg = total / product.reviews.length;

    console.log(avg)
  
  useEffect(() => {
    dispatch(getWishList())
  }, [])

  const handleWishlist = () => (
    !isAuthenticated ? toggleSidebar() : dispatch(addWishList(product._id))
  )

  const MobileVersion = () => (
    <>
    <div className="flex flex-wrap">
              <div className="relative w-full lg:h-auto rounded">
                <Swiper
                  spaceBetween={20}
                    slidesPerView={'auto'}
                    pagination={{ "type": "fraction" }}
                    className="w-full product"                
                >
                      {product.photo.map(( (data, i) => (
                        <SwiperSlide>
                          <section className="bg-cover bg-center rounded bg-Grey h-72" style= {{background : `url("${data.url}")`}} />
                        </SwiperSlide>
                              )))}
                        </Swiper>
                        <div className=" absolute top-2 left-0 z-50">
                            <div className="flex">
                                <button
                                className="rounded-full w-8 h-8 bg-Grey-light p-0 border-0 inline-flex items-center justify-center text-white ml-4"
                                onClick={() => setTimeout(() => router.back(), 150)}>
                                    <MdArrowBack className="w-5 h-5"/>
                                </button>
                            </div>
                        </div>
                        <div className=" absolute top-2 right-3 z-50">
                            <div className="flex">
                                <button className="rounded-full w-8 h-8 bg-Grey-light p-0 border-0 inline-flex items-center justify-center text-white ml-4"
                                onClick = {handleWishlist} >
                                  {/* This checks if the wishlist item is already added*/}
                                    {wishlists?.some(e => e.product?._id === product._id) ? <MdFavorite className="w-5 h-5"/>: <MdFavoriteBorder className="w-5 h-5"/> }
                                </button>
                            </div>
                        </div>
                      </div>

              <div className="lg:w-1/2 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0 shadow-separator px-3">
                <div>
                  <span className="title-font font-medium text-2xl text-gray-900">£ { product.price } </span>
                </div>
                <h1 className="text-Black text-3xl title-font font-medium mb-1 capitalize"> { product.name } </h1>
                <div className="flex mb-4">
                  <span className="flex items-center">
                    <MdStar className="text-orange"/>
                    <Link href={`/marketplace/products/reviews/${product._id}`} className="underline"> 
                        <a>
                          { product.author?.reviews?.length === 1 ? `${product.author?.reviews?.length} review` : `${product.author?.reviews?.length} reviews` }
                        </a>
                    </Link>
                  </span>
                </div>
              </div>
            </div>
            <div className="p-3">
              { product.description &&
                parse(product.description)
              }
            </div>
                
            {/* <div className="p-3">
              <div className="flex">
                <div className="text-Black-medium px-2 my-auto"> Quantity: </div>
                <div className="border-box inline-block">
                  <div className="flex text-lg">
                    <button onClick={() => setCount(Math.max(1, count - 1))} className="border-r-2 border-Grey-border focus:outline-none focus:ring-2 focus:ring-orange focus:border-transparent rounded-l-full">
                      -
                    </button>
                    <h2 className="my-auto px-3 text-base"> { count } </h2>
                    <button
                      className="border-l-2 border-Grey-border focus:outline-none focus:ring-2 focus:ring-orange focus:border-transparent rounded-r-full"
                       onClick= {() => setCount(Math.min(20, count + 1))}>
                        +
                    </button>
                   </div>
               </div>
              </div>
            </div> */}
{/* 
              <div className="grid gap-30 px-3">
                <Button className="bg-Blue text-Grey my-2">Buy now</Button>
                <button
                  onClick={() => dispatch(addToCart(product.slug , count ))}
                  className="bg-Blue bg-opacity-20 text-Blue mb-2"
                >
                  Add to Cart
                </button>
              </div> */}
          </>
  )
  
    return (
             
          <Card className="mobile:pb-6 mobile:px-0">  
          { isTabletOrMobile ?
              <MobileVersion /> 
              :
              <div>
                    <div className="grid grid-cols-8 gap-3">

                      <div className="col-span-5 my-auto">
                        <div className="p-3 m-auto">
                          <Swiper
                              spaceBetween={20}
                              slidesPerView={'auto'}
                              onSwiper={setSwiperRef}
                              pagination={{ "type": "fraction" }}
                              navigation={true} 
                              freeMode={true}
                              >
                                  {product.photo.map(( (data, i) => (
                                      <SwiperSlide key={i}>
                                        <section className="bg-cover bg-center rounded bg-Grey h-[30rem] relative" style= {{background : `url("${data.url}")`}} />
                                      </SwiperSlide>
                                            )))}
                                      <div className=" absolute top-2 right-3 z-50">
                                        <div className="flex">
                                            <button className="rounded-full w-8 h-8 bg-Grey-light p-0 border-0 inline-flex items-center justify-center text-white ml-4"
                                            onClick = {handleWishlist} >
                                              {/* This checks if the wishlist item is already added*/}
                                                {wishlists?.some(e => e.product?._id === product._id) ? <MdFavorite className="w-5 h-5"/>: <MdFavoriteBorder className="w-5 h-5"/> }
                                            </button>
                                        </div>
                                    </div>
                          </Swiper>
                          <Swiper 
                                spaceBetween={10} 
                                slidesPerView={6} 
                                // loop={true} 
                                // freeMode={true} 
                                className="mySwiper my-4"
                          >
                              {product.photo.map(( (data, i) => (
                                <SwiperSlide className="" onClick={() => slideTo(i) }>
                                    <section className="bg-cover bg-center rounded bg-Grey-dashboard h-32 border-box cursor-pointer" style= {{background : `url("${data.url}")`}} />
                                </SwiperSlide>
                              )))}
                          </Swiper>
                        </div>
                      </div>
                      
                      <div className="col-span-3 mx-auto relative">
                        <div className="mx-auto">
                          <div className=" p-2">
                              <h2 className="text-xl font-bold text-Black dark:text-gray-300 capitalize">
                                {product.name}
                              </h2>
                              <div className="flex mb-4">
                                  <span className="flex items-center">
                                { product.author.reviews?.length !== 0 &&
                                  <> 
                                    <MdStar className="text-orange"/>
                                    <span className="font-bold mr-2">
                                      {avg}
                                    </span>
                                  </>
                                }
                                  <Link href={`/marketplace/products/reviews/${product._id}`} className="underline text-Black-medium"> 
                                    <a>
                                      { product.author.reviews?.length === 1 ? `(${product.author.reviews?.length} review)` : `(${product.author.reviews?.length} reviews)` }
                                    </a>
                                    </Link>
                                  </span>
                              </div>
                              <div className="text-2xl">
                                £{product.price}
                              </div>
                          </div>
                          <div className="">
                            <div className="">
                              <div className="my-3 flex">
                                <div className="relative">
                                  <section className="h-12 w-12 bg-center bg-cover shadow-button rounded-sm" style={{background: `url("${author.avatar}")`}}/>
                                </div>
                                <div className="my-auto ml-2 text-center">
                                  <button 
                                          className="font-bold capitalize hover:underline"
                                          onClick={handleProfile}
                                  >
                                    {author.name}
                                  </button>
                                </div>
                              </div>
                              <div className="">
                                <button className="bg-Blue bg-opacity-20 text-Blue mb-2 flex rounded-md text-center "
                                        onClick= {handleChat}          
                                >
                                  <AiFillWechat className="my-auto text-lg" />
                                  <span className="ml-2"> Chat now </span>
                                </button>
                              </div>
                              { author.skills && author.skills.length !== 0 &&
                                <div className="my-3 p-3">
                                  <h2 className="font-bold text-Black-text "> Skills </h2>
                                  <div className="grid grid-cols-3 gap-5 pt-2">
                                    {author.skills?.map( (data, i) =>
                                      <div key={data} className="border-box rounded-md px-3 py-2 w-full">
                                        <div className="font-bold text-Black-medium text text-center cursor-pointer capitalize"> 
                                          {data}
                                        </div>
                                      </div>  
                                    )}
                                  </div>
                                </div>
                              }
                              { author.locations && author.locations.length !== 0 &&
                                <div className="my-3 p-3">
                                  <h2 className="font-bold text-Black-text"> Locations </h2>
                                  <div className="grid grid-cols-2 gap-5 pt-2">
                                    {author.locations?.map( (data, i) =>
                                      <div key={data._id} className="border-box rounded-md px-3 py-2 w-full text-center cursor-pointer mx-auto">
                                        <div className=" capitalize mx-auto text-Black-medium text font-bold text-center">
                                          {/* <MdLocationOn className="text-Black-medium h-5 w-5 m-auto"/> */}
                                          {data.location}
                                        </div>
                                      </div>  
                                    )}
                                  </div>
                              </div>
                              }
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
            }
    </Card>
  );
};

SingleProduct.whyDidYouRender = true

export default memo (SingleProduct);