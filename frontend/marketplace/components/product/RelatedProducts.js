import React from 'react'
import Card from '../../../components/Cards/Card'
import ProductCard from '../product/ProductCard'
import { Swiper, SwiperSlide } from 'swiper/react';

const RelatedProducts = ( {relatedProduct, product} ) => {

    console.log({relatedProduct})

    return (
        <Card title="Related services" className="overflow-x-hidden">
            <Swiper
                spaceBetween={20}
                slidesPerView={1}
            >
                {relatedProduct && relatedProduct.map( data => (
                    <SwiperSlide className="p-2 w-9/12">
                        <ProductCard  product= {data} />
                    </SwiperSlide>
                ))}
            </Swiper>
        </Card>
    )
}

export default RelatedProducts
