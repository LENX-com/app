import React from 'react'
import Card from '../../../components/Cards/Card'
import ProductCard from '../product/ProductCard'
import { Swiper, SwiperSlide } from 'swiper/react';

const RelatedProducts = ( {relatedProduct, product} ) => {

    const fakeRelatedProducts = [
        {
            name:"Car",
            photo:"https://sc04.alicdn.com/kf/U8e44807a809f41cda1d93b2781e935adK.jpg",
            _id:"325235235",
            price: 22,
        },
        {
            name:" Red ",
            photo:"https://sc04.alicdn.com/kf/U8e44807a809f41cda1d93b2781e935adK.jpg",
            _id:"325235235",
            price: 22,
        },
        {
            name:" Screen ",
            photo:"https://sc04.alicdn.com/kf/U8e44807a809f41cda1d93b2781e935adK.jpg",
            _id:"325235235",
            price: 22,
        },
        {
            name:" Tabasco",
            photo:"https://sc04.alicdn.com/kf/U8e44807a809f41cda1d93b2781e935adK.jpg",
            _id:"325235235",
            price: 22,
        },
        {
            name:" Wallet",
            photo:"https://sc04.alicdn.com/kf/U8e44807a809f41cda1d93b2781e935adK.jpg",
            _id:"325235235",
            price: 22,
        },
    ] 

    return (
        <Card title="Related products" className="overflow-x-hidden">
            <Swiper
                spaceBetween={20}
                slidesPerView={1}
            >
                {fakeRelatedProducts.map( data => (
                    <SwiperSlide className="p-2 w-9/12">
                        <ProductCard  product= {data} />
                    </SwiperSlide>
                ))}
            </Swiper>
        </Card>
    )
}

export default RelatedProducts
