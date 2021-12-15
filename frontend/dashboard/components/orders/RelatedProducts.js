import React from 'react'
import SectionTitle from '../Typography/SectionTitle'
import { Link } from 'react-router-dom'
import { Swiper, SwiperSlide } from "swiper/react";
import { Data } from '../stories/Data'

const RelatedProducts = () => {
    return (
        <div className="mt-4 mb-4">
            <SectionTitle> Related Products </SectionTitle>
                <Swiper slidesPerView={2}
                        spaceBetween={20}
                        pagination={{"clickable": true}}
                        className="mySwiper">
                    {Data.map((data, i)=>
                    <SwiperSlide>
                        <div key={i} className="bg-white shadow-xl rounded-lg overflow-hidden">
                            <div className="bg-cover bg-center p-4" >
                                <Link to="/product/" >
                                <img className= "bg-cover bg-center" alt="undefined" src="https://s.alicdn.com/@sc04/kf/H3b1f9f30ddaf4c41bc02d0cf7f99fd02G.jpg_220x220.jpg" />
                                </Link>
                            
                                <div className="flex justify-end">
                                    <svg className="h-6 w-6 text-white fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                                        <path d="M12.76 3.76a6 6 0 0 1 8.48 8.48l-8.53 8.54a1 1 0 0 1-1.42 0l-8.53-8.54a6 6 0 0 1 8.48-8.48l.76.75.76-.75zm7.07 7.07a4 4 0 1 0-5.66-5.66l-1.46 1.47a1 1 0 0 1-1.42 0L9.83 5.17a4 4 0 1 0-5.66 5.66L12 18.66l7.83-7.83z">
                                        </path>
                                    </svg>
                                </div>
                            </div>
                            <div className="p-2 py-2">
                                <Link to="/category/" >
                                <p className="uppercase tracking-wide text-sm font-bold text-gray-700">
                                     Alpha centauri alpha
                                </p>
                                </Link>
                            </div>
                            <div className="px-4 pt-3 pb-4 border-t border-gray-200 bg-gray-100">
                                <div className="flex  pt-2">
                                    <div className="bg-cover bg-center w-10 h-10 rounded-full mr-3" style= {{backgroundImage:"url(https://http2.mlstatic.com/D_Q_NP_2X_878604-MLA44160072739_112020-AB.webp)"}}>
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-700">$22</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </SwiperSlide>
                    )}
            </Swiper>
        </div>
    )
}

export default RelatedProducts
