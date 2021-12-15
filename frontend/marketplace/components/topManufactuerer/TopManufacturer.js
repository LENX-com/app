import React from 'react';
import SectionTitle from '../Typography/SectionTitle';
import ManufactureCard from '../manufactureCard/ManufactureCard';
import { Swiper, SwiperSlide } from 'swiper/react';

const TopManufacturer = () => {
    return (
        <div className="mt-5">
            <SectionTitle>Top Manufacturer</SectionTitle>
            <Swiper
                spaceBetween={30}
                slidesPerView={1}
                onSlideChange={() => console.log('slide change')}
                onSwiper={(swiper) => console.log(swiper)}
                >
                <SwiperSlide>
                    <ManufactureCard />
                </SwiperSlide>
                <SwiperSlide>
                    <ManufactureCard />
                </SwiperSlide>
                <SwiperSlide>
                    <ManufactureCard /> 
                </SwiperSlide>
            </Swiper>
        </div>
    );
};

export default TopManufacturer;