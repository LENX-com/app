import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Card from '@/components/Cards/Card'
import { getProductByCategory, getBrandsByCategory  } from '@/actions/productAction'
import CategoryProduct from '@/marketplace/components/product/CategoryProduct'
import { getBrands } from "@/redux/actions/productAction";
 import Button from '@/components/Buttons/Button'
import { Star } from '@/marketplace/assets/icons'
import { AiOutlineInfoCircle} from 'react-icons/ai'
import { Swiper, SwiperSlide } from 'swiper/react';
import { NotFound } from '@/marketplace/assets/icons'
import Link from 'next/link'

const LinkToProducts = ({categories, products, isTabletOrMobile}) => {
    const MAX_LENGTH = 50
    const [ category, setCategory ] = useState()
    const [ perPage, setPerPage ] = useState(6)
    const { brands, count } = useSelector((state) => state.product.brands);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getBrands());
    } ,[] )

    const [menu , setMenu ] = useState({
        state: undefined,
         title: <> {categories && "name"} </>
    })

    const categoriesStyle = {
        display: "inline-block",
        fontSize: "12px",
        lineHeight: "12px",
        fontWeight: "200",
        textTransform: "uppercase",
        letterSpacing: ".1em",
        background: "#e6e6dd",
        borderRadius: "4px",
        padding: "0.4em 1em",
        marginRight: "0.6em",
        marginBottom: "0.6em",
    }


    return (
        <div className="bg-white">
            <div className="flex justify-between p-3">
                <div>
                    <h2 className="mb-4 text-lg font-semibold text-Black-text"> Marketplace </h2>
                </div>
                <div>
                    <Link href="/marketplace/" className="text-sm text-Black underline">
                        Explore marketplace
                    </Link>
                </div>
            </div>

            { isTabletOrMobile ?
                <Swiper
                    slidesPerView = {4}
                    paceBetween={20}
                    className="pb-4 shadow-separator"
                >
                    {categories?.map((category, i) => (
                            <SwiperSlide className= {`${menu.state === i ? 'border-b-2 border-orange text-orange font-bold' : 'text-Black-medium'} whitespace-nowrap w-auto p-2 text-lg cursor-pointer`}
                                onClick = { () => { 
                                    setMenu ({  state:i,
                                                title: category.name
                                    })
                                    setCategory(category._id)
                                    dispatch(getBrandsByCategory(category._id))
                                }}
                            >
                            <div className= {`${ menu.state === i ? "font-bold" : ""} text-lg`}>
                                <h2>
                                    { category.name }
                                </h2>
                            </div>
                    </SwiperSlide>
                    ))} 
                </Swiper>

                :

                <div className="grid grid-cols-6 shadow-separator mb-6">
                    {categories?.map((category, i) => (
                        <div className="p-2">
                        <div className= {`${menu.state === i ? 'border-b-2 border-orange text-orange font-bold' : 'text-Black-medium'} text-lg w-auto p-2 cursor-pointer`}
                          onClick = { () => { 
                              setMenu ({  state:i,
                                          title: category.name
                              })
                              setCategory(category._id)
                              dispatch(getBrandsByCategory(category._id))
                          }}
                        >
                            <div className= {`text-center mx-1 whitespace-nowrap ${ menu.state === i ? "font-bold" : ""} text-lg`}>
                                <h2>
                                    { category.name }
                                </h2>
                            </div>
                        </div>
                    </div>
                    ))} 
                </div>
            }

            { brands && 
                
                brands.length > 0 ? 
                    ( 
                    <>
                        <div className="grid mobile:grid-cols-1 mb-3 lg:grid-cols-2 lg:gap-4 lg:px-6">
                    
                    { brands.slice(0, perPage).map( brand => (
                    <Link href={`/marketplace/manufacturer/${brand.slug}`}>
                        <div className={`cursor-pointer group flex p-4 ${!isTabletOrMobile ? "border-box hover:bg-Grey-dashboard" : 'shadow-separator'}`}
                            key= {brand.name}
                        >
                            <section 
                                className="relative w-1/4 m-auto"
                            >
                                <div
                                    className="bg-cover bg-center h-16 w-16 lg:h-[78px] lg:w-[78px] shadow-button rounded-full" 
                                    style= {{backgroundImage: `url(${brand.avatar})`}} 
                                />
                            </section>
                            <div className="m-auto grid px-3 py-2 w-3/4">
                            { brand.rating &&
                                <div className="flex">  
                                    <Star className= "text-lg my-auto" style={{width:"12px", height: "12px"}}/>
                                    <span className="my-auto text-Black-medium font-bold pl-1 text"> {brand.rating} </span>
                                </div>
                            }   
                                <Link href = {`marketplace/manufacturer/${brand.slug}`} className="my-auto flex">
                                    <span className="text-Black-medium font-bold hover:text-Blue my-auto capitalize"> {brand.name} </span>
                                </Link>
                            <div className=" text-sm">
                                { brand.summary && `${brand.summary?.substring(0, MAX_LENGTH)} ${brand.summary.length >= MAX_LENGTH ? "..." : ""}`}
                            </div>
                            <div className="overflow-hidden py-2">
                                    {brand.categories && brand.categories.length > 0 && brand.categories.map( category => (
                                        <span 
                                                className="text-Black-medium font-bold my-auto capitalize"
                                                style= { categoriesStyle }
                                        >
                                            {category.name}
                                        </span>
                                    ))}
                            </div>
                            </div>
                        </div>    
                    </Link>
                    ))}
                </div>
                <div className="grid p-3">
                    <Button 
                            onClick={() => setPerPage(perPage + 4)}
                            className="my-2 w-2/3 mx-auto lg:w-1/4 bg-Black text-Grey"> 
                        Load more 
                    </Button>
                </div>
            </>
                ) : (
                    <div className="mb-4 mx-auto col-span-2">
                        <div className="m-auto text-center">
                           <NotFound className="text-center mx-auto my-2"/>
                           <span className="font-bold capitalize"> Sorry there are no professionals available </span>
                        </div>
                    </div>
                  )
                }
        </div>
    )
}

export default React.memo(LinkToProducts)
