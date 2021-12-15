import React from 'react';
import SectionTitle from '../Typography/SectionTitle';
import CategoryCard from '../categoryCard/CategoryCard';
import { Swiper, SwiperSlide } from 'swiper/react';


const PopularCategory = () => {
    return (
        <div className="mt-5">
            <SectionTitle>Popular Categories</SectionTitle>
            <Swiper
                spaceBetween={30}
                slidesPerView={1}
                onSlideChange={() => console.log('slide change')}
                onSwiper={(swiper) => console.log(swiper)}
                >
                <SwiperSlide>
                    <CategoryCard />
                </SwiperSlide>
                <SwiperSlide>
                    <CategoryCard />
                </SwiperSlide>
                <SwiperSlide>
                    <CategoryCard /> 
                </SwiperSlide>
            </Swiper>
        </div>
    );
};

export default PopularCategory;