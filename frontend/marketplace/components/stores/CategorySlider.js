import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';

const CategorySlider = React.memo(({categories, handleCategory, category}) => {
    return (
        <div>
            <Swiper
                spaceBetween={30}
                slidesPerView={3}
                className=""
                freeMode = { true }
                >
            {categories?.map(( data, i ) => (
            <SwiperSlide className= { `bg-white px-2 py-1 shadow-product rounded-md w-auto m-1 ${category === data.id && " border border-Blue"} `}>
                <div className=""
                    onClick={ () => handleCategory (data.id)}
                    key={i}
                >
                    <h2 className="text-Black-text font-bold text w-auto">
                        { data.name }
                    </h2>
                </div>
            </SwiperSlide>
            ))}
            </Swiper>
        </div>
    )
})

export default React.memo(CategorySlider)
