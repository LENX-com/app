import React, { useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { useDispatch, useSelector } from 'react-redux'
import { getBrands } from "@/redux/actions/productAction";
import Link from 'next/link'
import EcommerceLoader from '@/components/Loader/EcommerceLoader'
import Card from '@/components/Cards/Card'
import { AiOutlineRight } from 'react-icons/ai'
import Button from '@/components/Buttons/Button'
import { FaShippingFast, FaRegGrin } from "react-icons/fa";
import { useMediaQuery } from 'react-responsive'



const StoresHome = () => {
    const isTabletOrMobile = useMediaQuery({ query: '(max-width: 768px)' })
    const dispatch = useDispatch();
    const { brands, count } = useSelector((state) => state.product.brands);

    useEffect(() => {
        dispatch(getBrands());
    } ,[] )

    return (
        <>
          { brands ?
            ( <div className="bg-white rounded-sm shadow-button relative my-2 p-0">
                <div className= {!isTabletOrMobile && "flex"}>

                    {isTabletOrMobile ?
                        <div className="flex justify-between p-3">
                            <div className="text-Black font-bold text-lg">
                                Craftsmen
                            </div>
                            <Link href="/marketplace/stores" className="text text-Black-text">
                                    See all profiles
                            </Link>
                        </div> 

                    :
                        <div className="w-1/5 rounded-tl-sm rounded-bl-sm bg-cover bg-center relative" style={{background: `url("https://res.cloudinary.com/lenx2222/image/upload/v1637238409/orangebackground_c9k1zg.png")`}}>
                            <div className="h-2/5 text-center m-auto Center w-full">
                                <div className="text-white font-bold text-lg p-2">
                                    Buy directly from creative entrepeneurs 
                                </div>
                                <Link href="/marketplace/stores">
                                    <Button className="bg-white mt-2">
                                        See all shops
                                    </Button>
                                </Link>
                            </div>
                        </div>
                    }   

                    <div className="w-4/5 m-auto p-3 mobile:w-full">
                        <Swiper
                            spaceBetween={10}
                            freeMode={true}
                            navigation={true}
                            className="w-full mb-4"
                            slidesPerView= {  isTabletOrMobile ? 1 : 4 }
                        >
                        {
                            brands?.map ((brand, i) => 
                         <SwiperSlide className="rounded-md cursor-pointer group bg-white border-box h-64 mobile:w-11/12"
                                             key= {brand.name}
                                >
                                    <section 
                                        className="content bg-cover bg-center h-52 rounded-t-md m-auto relative bg-Grey-dashboard"
                                    >
                                        <Swiper
                                            spaceBetween={10}
                                            freeMode={true}
                                        >
                                            <SwiperSlide 
                                                className="bg-cover bg-center h-52 w-full rounded-md m-auto shadow-button" 
                                                style= {{backgroundImage: `url(${brand.avatar})`}} 
                                            />
                                            <SwiperSlide 
                                                className="bg-cover bg-center h-52 w-full rounded-md m-auto shadow-button" 
                                                style= {{backgroundImage: `url(${brand.photos[0]?.url})`}} 
                                            />
                                            <SwiperSlide 
                                                className="bg-cover bg-center h-52 w-full rounded-md m-auto shadow-button" 
                                                style= {{backgroundImage: `url(${brand.photos[1]?.url})`}} 
                                            />
                                            <SwiperSlide 
                                                className="bg-cover bg-center h-52 w-full rounded-md m-auto shadow-button" 
                                                style= {{backgroundImage: `url(${brand.photos[2]?.url})`}} 
                                            />
                                        </Swiper>
                                    </section>
                                    <div className="mx-auto grid text-center h-1/5">
                                        <Link href = {`marketplace/manufacturer/${brand.slug}`} className="m-auto flex">
                                            <span className="text-Black-text text font-bold hover:text-Blue my-auto"> Visit profile </span>
                                        </Link>
                                    </div>
                                </SwiperSlide>
                            )
                        }
                        </Swiper>
                    </div>
                </div>
            </div>

            ) : (
              <EcommerceLoader />
            )
        }
        </>
    );
};

export default StoresHome;  