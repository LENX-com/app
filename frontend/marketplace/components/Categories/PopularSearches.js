import React from 'react'
import { NavLink } from 'react-router-dom'
import { Swiper, SwiperSlide } from 'swiper/react';
import SectionTitle from '../../../components/Typography/SectionTitle'
import Card from '../../../components/Cards/Card'

const popularSearch = [
    {
        name: "Plants",
        photo:""
    },
     {
        name: "Trees",
        photo:""
    },
   {
        name: "Speakers",
        photo:""
    },
   {
        name: "Drinks",
        photo:""
    },
    {
        name: "TV's",
        photo:""
    },
        {
        name: "Screen's",
        photo:""
    }
]

const PopularSearches = () => {
    
    return (
        <Card className="overflow-x-hidden" title="Popular Searches">
            <div className="my-3">
                    <Swiper
                    spaceBetween={5}
                    slidesPerView={2}
                    slidesPerColumn={2}
                    slidesPerGroup={3}
                    slidesPerColumnFill="row"
                    freeMode={ true }
                    // slidesPerColumn={2}
                    >
                {popularSearch.map( data =>
                <SwiperSlide className="p-2 w-auto">
                <NavLink to= {`/marketplace/${data.name}`} className="my-2" key={data.name}>
                        <div className="flex ml-2 justify-between hover:bg-Hover bg-white rounded-lg shadow-button">
                            <div className="h-16 rounded flex items-center justify-center">
                                <div className="w-16 h-16 p-1">
                                    <img src="https://d33wubrfki0l68.cloudfront.net/be38c60bf34b2376b393e444d2da9a6b2dd54bf4/f1dfc/assets/img/unlicensed/shoes-3.png" alt="product" className="object-cover" />
                                </div>
                            </div>
                            <div className="my-auto text-lg mr-2">
                                {data.name} 
                            </div>
                        </div>
                    </NavLink>  
                </SwiperSlide>
                    )}
                </Swiper>
            </div>
        </Card>
    )
}

export default PopularSearches
