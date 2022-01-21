import React, { memo } from "react";
import Link from 'next/link'
import { SwiperSlide, Swiper } from 'swiper/react'
import { useSelector } from "react-redux";
import { SignInContext } from '@/context/SignInContext'
import { AiFillStar } from "react-icons/ai";
import {
  MdFavoriteBorder,
  MdFavorite,
} from "react-icons/md";


const ProductCard = ({product, handleWishlist}) => {
  const { wishlists } = useSelector((state) => state.wishlist);

  const Like = () => (
    <svg
      viewBox="0 0 32 32"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      role="presentation"
      focusable="false"
      style={{
        display: "block",
        fill: "RGBA(0, 0, 0, 0.5)",
        height: "24px",
        width: "24px",
        stroke: "RGB(255, 255, 255)",
        strokeWidth: 2,
        overflow: "visible",  
      }}
    >
      <path d="m16 28c7-4.733 14-10 14-17 0-1.792-.683-3.583-2.05-4.95-1.367-1.366-3.158-2.05-4.95-2.05-1.791 0-3.583.684-4.949 2.05l-2.051 2.051-2.05-2.051c-1.367-1.366-3.158-2.05-4.95-2.05-1.791 0-3.583.684-4.949 2.05-1.367 1.367-2.051 3.158-2.051 4.95 0 7 7 12.267 14 17z" />
    </svg>
  );

  return (
    <>
      <div className="shadow-product rounded-md bg-white transform duration-500 hover:-translate-y-2 cursor-pointer group ">

        <Swiper
          spaceBetween={20}
          freeMode={true}
          slidesPerView={'auto'}
          pagination={{ "dynamicBullets": true }}
          className="w-full"                
        >
          {product.photo.map(( (data, i) => (
            <SwiperSlide>
              <section className="bg-cover bg-center rounded bg-Grey h-36 mobile:h-44" style= {{background : `url("${data.url}")`}} />
            </SwiperSlide>
          )))}
        </Swiper>

        <div
          className="absolute top-2 right-2 z-50"
          style={{ cursor: "pointer" }}
          onClick={() => handleWishlist(product._id)}
        >
          {/* Change icon based if user has already liked the product */}
          {wishlists?.some(e => e.product?._id === product._id) ? <MdFavorite className="w-5 h-5 text-white"/>: <Like className="w-5 h-5"/> }
        </div>

        <div className="p-2">
          <Link href={`/marketplace/products/${product.slug}`}>
            <h1 className="truncate capitalize"> {product.name} </h1>
          </Link>
          <h3> £ {product.price} </h3>
          {/* <div className="flex">
            <AiFillStar className="text-orange text-sm mr-1" />
            <div className="text-xs"> 4.9 </div>
          </div> */}
        </div>
      </div>
    </>
  );
};

export default memo(ProductCard);
