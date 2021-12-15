import React from 'react'
import { Data } from '../stories/Data'
import { Swiper, SwiperSlide } from 'swiper/react';

const ConversationManufacturer = () => {
    return (
        <>
            <Swiper slidesPerView={2}
                spaceBetween={20}
                pagination={{"clickable": true}}
                className="mySwiper">
                    {Data.map((data ,i) => (
                        <SwiperSlide key={ i } >
                            <article className=" mt-4 mb-4 bg-white relative shadow-2xl max-w-lg w-full transform duration-500 hover:-translate-y-2 cursor-pointer rounded-md">
                                <div className="flex absolute left-0 top-0 w-10 h-10 bg-orange-600 text-gray-100">
                                </div>
                                <div className="max-h-34">
                                    <img className="max-h-40 m-auto" src="https://www.dropbox.com/s/1fav310i2eqkdz8/tool2.png?dl=1" alt="" />
                                </div>
                                <div className="p-2 mb-2 mt-2 text-center">
                                    <h2 className="text-3xl mt-2"> {data.name} </h2>
                                </div>
                            </article>
                            
                        </SwiperSlide>
                    ))}
            </Swiper>
        </>

    ) 
}    

export default ConversationManufacturer
