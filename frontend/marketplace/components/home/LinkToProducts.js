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
    const { brands, count } = useSelector((state) => state.product.brands);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getBrands());
    } ,[] )

    const [menu , setMenu ] = useState({
        state: undefined,
         title: <> {categories && "name"} </>
    })

    // useEffect(() => {
    //     if(category){
    //         dispatch(getProductByCategory(category))
    //     } else {
    //         dispatch(getProductByCategory( categories && categories[0]?._id))
    //     }
    // }, [dispatch, category])


    return (
        <Card>
            <div className="flex justify-between">
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
                    className="mb-4"
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

                <div className="grid grid-cols-6 shadow-separator mb-4">
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
             ( <div className="grid grid-cols-5 gap-5 mb-3 mobile:grid-cols-2">
                
                { brands.map( brand => (
                   <div className="rounded-md cursor-pointer group bg-white border-box h-72 mobile:h-52"
                        key= {brand.name}
                    >
                        <section 
                            className="content bg-cover bg-center h-40 mobile:h-28 rounded-t-md m-auto relative bg-Grey-dashboard"
                        >
                            {/* <div className="absolute top-1 right-2 rounded-full bg-white z-10"
                                 onClick={() => handleProfile(brand)}
                            >
                                <AiOutlineInfoCircle className="w-6 h-6"/>
                            </div> */}
                            <Swiper
                                spaceBetween={10}
                                freeMode={true}
                                pagination={{ "dynamicBullets": true }}
                            >
                                <SwiperSlide 
                                    className="bg-cover bg-center h-40 w-full mobile:h-28 rounded-md m-auto shadow-button" 
                                    style= {{backgroundImage: `url(${brand.avatar})`}} 
                                />
                                {
                                    brand.photos?.length > 0 &&
                                    <>
                                        <SwiperSlide 
                                            className="bg-cover bg-center h-40 w-full mobile:h-28 rounded-md m-auto shadow-button" 
                                            style= {{backgroundImage: `url(${brand.photos[0]?.url})`}} 
                                        />
                                        <SwiperSlide 
                                            className="bg-cover bg-center h-40 w-full mobile:h-28 rounded-md m-auto shadow-button" 
                                            style= {{backgroundImage: `url(${brand.photos[1]?.url})`}} 
                                        />
                                        <SwiperSlide 
                                            className="bg-cover bg-center h-40 w-full mobile:h-28 rounded-md m-auto shadow-button" 
                                            style= {{backgroundImage: `url(${brand.photos[2]?.url})`}} 
                                        />
                                    </>
                                }
                            </Swiper>
                        </section>
                        {
                            isTabletOrMobile ?
                                (
                                <div className="mx-auto grid px-3 py-2">
                                   { brand.rating &&
                                       <div className="flex">  
                                           <Star className= "text-lg my-auto" style={{width:"12px", height: "12px"}}/>
                                           <span className="my-auto text-Black-medium font-bold pl-1 text"> {brand.rating} </span>
                                       </div>
                                   }
                                   <div className="flex mb-2 mobile:hidden">
                                       <div className="bg-cover bg-center shadow-button h-8 w-8 rounded-full bg-white my-auto mr-2 transform transition hover:-rotate-6 cursor-pointer duration-300 border-2 border-white" 
                                           style= {{backgroundImage: `url("${brand.avatar}")`}}
                                       />
                                       <Link href = {`marketplace/manufacturer/${brand.slug}`} className="my-auto flex">
                                           <span className="text-Black-text text font-bold hover:text-Blue my-auto capitalize"> {brand.name} </span>
                                       </Link>
                                   </div>
                                   <div className="text-Black-medium font-bold text-sm">
                                       { brand.summary && `${brand.summary?.substring(0, MAX_LENGTH)} ${brand.summary.length >= MAX_LENGTH ? "..." : ""}`}
                                   </div>
                                </div>
                            ) : (
                               <div className="mx-auto grid px-3 py-2">
                                   <div className="flex mb-2 mobile:hidden">
                                       <div className="bg-cover bg-center shadow-button h-8 w-8 rounded-full bg-white my-auto mr-2 transform transition hover:-rotate-6 cursor-pointer duration-300 border-2 border-white" 
                                           style= {{backgroundImage: `url("${brand.avatar}")`}}
                                       />
                                       <Link href = {`marketplace/manufacturer/${brand.slug}`} className="my-auto flex">
                                           <span className="text-Black-text text font-bold hover:text-Blue my-auto capitalize"> {brand.name} </span>
                                       </Link>
                                   </div>
                                   <div className="text-Black-medium font-bold text">
                                       { brand.summary && `${brand.summary?.substring(0, MAX_LENGTH)} ${brand.summary.length >= MAX_LENGTH ? "..." : ""}`}
                                   </div>
                                   { brand.rating &&
                                       <div className="flex">  
                                           <Star className= "text-lg my-auto" style={{width:"16px", height: "16px"}}/>
                                           <span className="my-auto text-Black-medium font-bold pl-1"> {brand.rating} </span>
                                       </div>
                                   }
                               </div>
                            )
                        } 
                    </div>    
                ))}

            </div>
                ) : (
                    <div className="mb-4 mx-auto col-span-2">
                        <div className="m-auto text-center">
                           <NotFound className="text-center mx-auto my-2"/>
                           <span className="font-bold capitalize"> Sorry there are no professionals available </span>
                        </div>
                    </div>
                  )
                }
            {/* <div className="grid">
                <Button className="bg-white my-2 w-2/3 mx-auto lg:w-1/4"> Load more </Button>
            </div> */}
        </Card>
    )
}

export default LinkToProducts
