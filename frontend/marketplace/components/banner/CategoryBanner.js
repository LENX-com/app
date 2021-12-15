import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import Card from '../../../components/Cards/Card'
import { Link } from 'react-router-dom'

const promoBanners = [
    {
        img: 'https://img.joomcdn.net/c88243e34ca91c74ccdefa13c0538913dcbde29e_352_352.png',
        title: 'Buy Local',
        description: ' Support Local Businesses' 
    },
    {
        img: 'https://i.ibb.co/8s6ZrQ1/banner.jpg',
        title: 'Buy Local',
        description: 'Buy directly from brands' 
    },
    {
        img: 'https://i.ibb.co/8s6ZrQ1/banner.jpg',
        title: 'Easy Chat',
        description: ' Support Local Businesses' 
    }
]

const Banner = ({products}) => {
    return (
        <div className="">      
            <div className=" grid grid-cols-3 gap-2">
                <div className="col-span-2 mobile:col-span-full">
                    <div className="bg-white rounded-sm shadow-button relative mt-2 mb-0 p-0" style={{background: "#ff5c00"}}>
                        <Swiper
                            pagination={{
                                "dynamicBullets": true
                            }}
                            spaceBetween={20}
                            slidesPerView={1}
                        >
                        {
                            promoBanners.map( ({img, title, description}) =>

                            <SwiperSlide>    
                                <div className="bg-cover bg-center  h-52 text-white py-10 px-10 object-fill banner flex">
                                    <div className="flex md:w-1/2">
                                        <div>
                                            <p className="font-bold text-sm uppercase"> { title } </p>
                                            <p className="text-2xl mb-10 leading-none"> { description } </p>
                                        </div>
                                    </div>
                                    <div className=" h-20 w-20">
                                        <img src={ img } alt="banner"/>
                                    </div>  
                                </div>
                                </SwiperSlide>
                            )
                        }
                        </Swiper>
                    </div>
                </div>

                <div className="col-span-1 mb-0 mt-2 mobile:hidden">
                    <div className=" h-1/2 pb-1">
                        <div className="bg-white shadow-button h-full bg-cover bg-center" 
                             style={{background: `url("https://cf.shopee.co.id/file/43389db8fa4598f4c5b966397a967906_xhdpi")`}}
                        />
                    </div>
                    <div className="h-1/2 pt-1">
                        <div className="bg-white shadow-button h-full bg-cover bg-center" 
                             style={{background: `url("https://cf.shopee.co.id/file/43389db8fa4598f4c5b966397a967906_xhdpi")`}}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Banner;
