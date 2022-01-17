import React, { useState, useEffect, useMemo, memo, useContext } from "react";
import {
  MdStarBorder,
  MdStar,
  MdShoppingCart,
  MdFavoriteBorder,
  MdArrowBack,
  MdFavorite,
  MdLocalShipping,
  MdVerifiedUser
} from "react-icons/md";
import { useRouter } from 'next/router'
import { AiFillWechat } from 'react-icons/ai'
import { FaShippingFast } from "react-icons/fa";
import parse from 'html-react-parser';
import Card from "@/components/Cards/Card";
import Button from "@/components/Buttons/Button";
import { addToCart} from "@/redux/actions/cartActions";
import { addWishList, getWishList } from "@/redux/actions/wishlistAction";
import { useDispatch, useSelector } from "react-redux";
import { SwiperSlide, Swiper } from 'swiper/react'
import Link from 'next/link'
import { BsPeopleFill, BsFillChatSquareDotsFill } from "react-icons/bs";


const SingleProduct = ({ product,  isTabletOrMobile, handleProfile, handleChat, toggleSidebar}) => {
    const [ count, setCount ] = useState(1)
    const [ isOpen, setIsOpen ] = useState(false)
    const router = useRouter()
    const { isAuthenticated } = useSelector((state) => state.auth)
    const { wishlists } = useSelector((state) => state.wishlist);
    const dispatch = useDispatch();
    const [ page, setPage ] = useState(1)
    const [ menu, setMenu ] = useState({
      state: 0,
      content: product.summary
    })

    const { author } = product
  
  useEffect(() => {
    dispatch(getWishList())
  }, [])

  const handleWishlist = () => (
    !isAuthenticated ? toggleSidebar() : dispatch(addWishList(product._id))
  )

    const Feature = [
        {
            name: "Peer reviews",
            icon: <BsPeopleFill className="h-5 w-5 text-center" />
        },
        {
            name: " Fast shipping ",
            icon: <MdLocalShipping  className="h-5 w-5 text-center" />
        },
        {
            name: " Easy chat",
            icon: <AiFillWechat className="h-5 w-5 text-center" />  
        },
    ]

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
                          { product.reviews?.length === 1 ? `${product.reviews?.length} review` : `${product.reviews?.length} reviews` }
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

  const DesktopVersion = () => (
    <div>
          <div className="grid grid-cols-6 gap-3">

            <div className="col-span-3 my-auto">
              <div className="p-3 m-auto">
                <Swiper
                    spaceBetween={20}
                    slidesPerView={'auto'}
                    pagination={{ "type": "fraction" }}                
                    >
                        {product.photo.map(( (data, i) => (
                          <SwiperSlide>
                            <section className="bg-cover bg-center rounded bg-Grey h-96 relative" style= {{background : `url("${data.url}")`}} />
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
              </div>
            </div>
            
            <div className="col-span-2 relative">
              <div className=" p-2">
                  <h2 className="text-xl font-bold text-Black dark:text-gray-300 capitalize">
                    {product.name}
                  </h2>
                  <div className="flex mb-4">
                    <span className="flex items-center">
                      <MdStar className="text-orange"/>
                      <span className="font-bold mr-2">
                        5
                      </span>
                      <Link href={`/marketplace/products/reviews/${product._id}`} className="underline text-Black-medium"> 
                        <a>
                          { product.reviews?.length === 1 ? `(${product.reviews?.length} review)` : `(${product.reviews?.length} reviews)` }
                        </a>
                        </Link>
                      </span>
                  </div>
                  <div className="text-2xl">
                    £{product.price}
                  </div>
                  <div className="my-2">
                    <div className="shadow-separator flex mb-2 p-2">
                        <div className= {`${menu.state === 0 ? "text-Blue font-bold border-b-2 border-Blue" : "text-Black-medium" } cursor-pointer py-2 px-4`}
                              onClick={ () => setMenu({
                                                       state:0,
                                                       content: product.summary
                                                      })}>
                          Product Summary
                        </div>
                        <div  className= {`${menu.state === 1 ? "text-Blue font-bold border-b-2 border-Blue" : "text-Black-medium" } cursor-pointer p-2  py-2 px-4`}
                               onClick={ () => setMenu({state:1,
                                                        content: <div> This product takes <span className="font-bold text-Blue "> {product.shippingTime} </span> to be shipped </div>
                                                      })}>
                          Shipping details
                        </div>
                    </div>
                        <div className="p-2"> {menu.content} </div>
                  </div>
              
                    <div className="my-3 p-3">
                      {/* <div className="flex">
                        <div className="text-Black-medium px-2 my-auto"> Quantity: </div>
                        <div className="border-box inline-block">
                          <div className="flex text-lg">
                            <button
                                className="border-r-2 border-Grey-border focus:outline-none focus:ring-2 focus:ring-orange focus:border-transparent rounded-l-full"
                                onClick= {() => setCount(Math.max(1, count - 1))}>
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
                      <div className="flex mt-4 shadow-separator pb-4">
                        <div className="grid">
                          <Button className="bg-Blue text-Grey px-6 py-2">Buy now</Button>
                        </div>
                        <div className="grid mx-2">
                          <button
                            onClick={() => dispatch(addToCart(product.slug , count ))}
                            className="bg-Blue bg-opacity-20 text-Blue rounded-md px-6 py-2"
                            >
                            Add to Cart
                          </button>
                        </div>
                      </div> */}

                    <div className="grid grid-cols-3 gap-3 mt-4">
                        {Feature.map((data, i) => (
                            <div className="flex">
                                <div className="  text-Blue">
                                    {data.icon}
                                </div>
                                <div className="text-center text-Black-medium text-sm my-auto ml-2">
                                {data.name} 
                                </div>
                            </div>
                        ))}
                    </div>

                  </div>
              </div>
            </div>
              
              <div className="col-span-1">
                <div className="border-box p-2">
                  <div className="my-3 flex m-auto justify-center">
                    <div className="relative p-3">
                      <section className="h-12 w-12 bg-center bg-cover shadow-button rounded-sm" style={{background: `url("${author.avatar}")`}}/>
                    </div>
                  <div className="my-auto ml-2 text-center">
                    <h1 className="">
                      {author.name}
                    </h1>
                      <button className="rounded-lg bg-orange bg-opacity-20 text-orange text-xs px-2 py-1 m-auto" 
                              onClick={handleProfile} >
                        Visit profile
                      </button>
                  </div>
                  <div>
                  </div>
                </div>
                <div className="flex justify-center my-2">
                  <MdVerifiedUser className="my-auto mr-2 text-orange" />
                  <span>
                    {author.name} has a <span className="font-bold text-Black-medium"> 96% </span> score
                  </span>
                </div>
                <div className="text-center grid">
                    <button className="bg-Blue bg-opacity-20 text-Blue mb-2 flex rounded-md text-center m-auto"
                            onClick= {handleChat}          
                    >
                      <AiFillWechat className="my-auto text-lg" />
                      <span className="ml-2"> Chat now </span>
                  </button>
                </div>
              </div>
            </div>
          </div>

      </div>
  )
  
    return (
             
          <Card className="mobile:pb-6 mobile:px-0">  
          { isTabletOrMobile ?
              <MobileVersion /> 
              :
              <DesktopVersion />
            }
    </Card>
  );
};

SingleProduct.whyDidYouRender = true

export default memo (SingleProduct);