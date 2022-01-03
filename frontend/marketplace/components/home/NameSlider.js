import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';
import Link from 'next/link'
import Card from '@/components/Cards/Card'
import { AiFillAlert, AiOutlineRight }  from 'react-icons/ai'
import { Desktop, Mobile } from '@/config/ScreenSize'
  
const NameSlider = ({categories}) => {
      
    return (
        <Card className="my-2">
            <div className="flex justify-between">
                <div>
                    <h2 className="mb-4 text-lg font-semibold text-gray-600 dark:text-gray-300"> Search by category</h2>
                </div>
                <div>
                    <Link href="/marketplace/categories" className="text text-Black-text">
                        See All
                    </Link>
                </div>
            </div>
            <div className="mb-3">
                <Desktop>
                    <div className="grid grid-cols-6 gap-3">
                        {categories?.map((category) => (
                            <Link  href= {`/marketplace?page=0&search=&category=${category._id}&price=1,500&rating=&author=`}>
                                <a className="bg-white rounded-md border-box h-52 transform duration-500 hover:-translate-y-2 cursor-pointer group">
                                    <article className= "h-3/4 bg-cover bg-center rounded-t-md" style={{background:`url(${category.bg})`}} />
                                    <div className="mt-3 px-2 text-center">
                                        <h2 className="mt-2 text-base font-medium"> { category.name } </h2>
                                    </div>
                                </a>
                            </Link>
                        ))}
                    </div>
                </Desktop>

                <Mobile>
                    <Swiper
                        spaceBetween={10}
                        freeMode={true}
                        navigation={true}
                    >
                        {categories?.map((category) => (
                            <SwiperSlide className="bg-white rounded-md border-box h-44 cursor-pointer group m-2 w-4/6">
                                <Link href= {`/marketplace?search=${""}&category=${category._id}`} key={category.name} className="">
                                    <a>
                                        <article className= "h-3/4 bg-cover bg-center rounded-t-md" style={{background:`url(${category.bg})`}} />
                                        <div className="mt-3 px-2 text-center">
                                            <h2 className="mt-2 text-base font-medium"> { category.name } </h2>
                                        </div>
                                    </a>
                                </Link>
                            </SwiperSlide>
                            ))}
                    </Swiper> 
                </Mobile>
            </div>                   
        </Card>
    )
}


export default NameSlider
