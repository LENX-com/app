import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getBrands } from "@/redux/actions/productAction";
 import Button from '@/components/Buttons/Button'
import { Star } from '@/marketplace/assets/icons'
import { AiOutlineInfoCircle } from 'react-icons/ai'
import { Swiper, SwiperSlide } from 'swiper/react';
import { FaArrowRight } from "react-icons/fa";
import { NotFound } from '@/marketplace/assets/icons'
import Link from 'next/link'
import * as Icons from '@/marketplace/assets/icons'
import SwiperCore, {  
  Navigation 
} from 'swiper';

SwiperCore.use([Navigation ]);

const LinkToProducts = ({categories, products, isTabletOrMobile}) => {
    const MAX_LENGTH = 50
    const [ perPage, setPerPage ] = useState(6)
    const { brands, count } = useSelector((state) => state.product.brands);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getBrands());
    } ,[] )

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

    const barStyle ={
        marginLeft: "15px",
        border: "3px solid #dcdee3",
        borderRadius: "3px",
        marginLeft: "20px",
        height: "3px",
        margin: "auto",
        overflow: "hidden",
        flex: "1 1",
    }

    function Icon({ icon, ...props }) {
        const Icon = Icons[icon]
        return <Icon {...props} />
    }

    return (
        <div className="mobile:pt-10 lg:py-16">
            <div className="lg:w-5/6 mx-auto">
                <div className="lg:flex lg:justify-between mobile:p-3 mobile:pb-5">
                    <h1 className="text-xl font-bold text-Black lg:mb-5">
                        Looking for a tradesperson?
                    </h1>
                    { !isTabletOrMobile  ?
                        ( <Link href="/marketplace">
                            Explore marketplace
                          </Link>
                         ) : (
                            <p className="text text-Black mt-2">
                                Search quality tradespeople in our marketplace.
                            </p>
                          )
                    }
                </div>
                { 
                 isTabletOrMobile ?
                    ( categories && categories.map( ( category, i ) => (
                        <div className="w-full p-3 mobile:bg-white mobile:mb-2">
                            <div className="flex mobile:justify-between">
                                <div>
                                    <h1 className="text-Black font-bold text-lg lg:text-xl "> { category.name }s </h1>
                                </div>
                                <div>
                                    <Link href={`/marketplace?search=&category=${category._id}`}>
                                        <FaArrowRight className="my-auto h-4 w-4"/> 
                                    </Link>
                                </div>
                            </div>
                            <div className="my-3">
                                <Swiper
                                    freeMode= { true }
                                    slidesPerView= { isTabletOrMobile && 2 }
                                    spaceBetween= { 20 }
                                >
                                    { brands && brands.length > 0 ? 
                                        ( brands.filter( c => c.categories.some( a => a.id === category._id ))
                                                .slice( 0, 7)
                                                    .map( brand => (
                                                             <SwiperSlide className="mobile:w-9/10 border-box h-[180px] lg:h-[220px] shadow-product m-2 bg-white">
                                                                <section 
                                                                    className="bg-center bg-cover h-[90px] lg:h-[130px] rounded-t-[12px]"
                                                                    style={{ background: `url(${brand.avatar})`}}
                                                                />
                                                                <div className="p-3">
                                                                    { brand.rating &&
                                                                        <div className="flex">  
                                                                            <Star className= "text-lg my-auto" style={{width:"12px", height: "12px"}}/>
                                                                            <span className="my-auto text-Black-medium font-bold pl-1 text"> {brand.rating} </span>
                                                                        </div>
                                                                    } 
                                                                    <h3 className="text-Black font-bold text "> { brand.name } </h3>
                                                                </div>
                                                            </SwiperSlide>
                                                    )
                                            )) : (
                                            <div className="mb-4 mx-auto col-span-2">
                                                <div className="m-auto text-center">
                                                <NotFound className="text-center mx-auto my-2"/>
                                                <span className="font-bold capitalize"> Sorry there are no professionals available </span>
                                                </div>
                                            </div>
                                        )
                                    }
                                </Swiper>
                            </div>
                        </div>
                    ))) : (
                    <div>
                        <div className= " grid grid-cols-4 gap-4" >
                            { brands && brands.length > 0 && brands.slice( 0, 8 ).map( ( brand, i ) => (
                                <Link href={`/marketplace/manufacturer/${brand.slug}`}>
                                    <div 
                                        className={`bg-white shadow-product rounded-md cursor-pointer`}
                                        key= {brand.name}
                                    >
                                        <div className="flex">
                                            <div
                                                className="bg-cover bg-center rounded-l-md w-2/5 h-32" 
                                                style= {{backgroundImage: `url(${brand.avatar})`}} 
                                            />
                                            <div className="w-3/5 m-auto text-Black font-bold text-base pl-2 hover:text-Blue">
                                                { brand.name }
                                            </div>                            
                                        </div>
                                    </div>    
                                </Link>
                        ))}
                    </div>
                    <div className="py-16">
                        <h1 className="text-xl font-bold text-Black-medium mb-5 mobile:mt-4">
                            Search by category
                        </h1>
                        <div className="grid grid-cols-4 gap-4">
                            { categories.
                                map( ( category, i ) => (
                                    <div className="col-span-1 bg-white rounded-md shadow-product" key={i}>
                                        <section  className="h-36 bg-cover bg-center rounded-t-md" style={{background:`url("${category.bg}")`}}/>
                                        <div className="p-3 font-bold text-Black">
                                            <Link href={`/marketplace?search=&category=${category._id}`}>
                                                <span className="text-Black-medium font-bold hover:text-Blue my-auto capitalize cursor-pointer"> 
                                                    {category.name} 
                                                </span>
                                            </Link>
                                        </div>
                                    </div>
                                ))
                            }
                        </div>
                    </div>
                </div>
            )}
            </div>
        </div>
    )
}

export default React.memo(LinkToProducts)
