import React from "react";
import ProductCard from "../product/ProductCard";
import Card from "../../../components/Cards/Card";
import { Menu } from "@headlessui/react";
import { Fragment, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Filter } from "../../assets/icons";
import { FaCat } from "react-icons/fa";
import SearchBar from "../../../components/searchbar/SearchBar";
import { Swiper, SwiperSlide } from "swiper/react";

const ProductList = ({products}) => {

  console.log(products)

  const CategoriesTag = () => {
    return (
      <Swiper spaceBetween={0} slidesPerView={3} freeMode={true}>
        {products &&
          products.categories?.map((data) => (
            <SwiperSlide className="w-auto">
              <div>
                <div className=" bg-Grey-sd px-2 py-1 m-2 rounded-md ">
                  {data.name}
                </div>
              </div>
            </SwiperSlide>
          ))}
      </Swiper>
    );
  };

  return (
    <Card>
      { products &&  
        <>
          <div>
            <CategoriesTag />
          </div>

          <div className="grid grid-cols-2 gap-4">
            {
              products.map((product) => (
                <ProductCard product={product} />
              ))
            }
          </div>
        </>
    }
    </Card>
  );
};

export default ProductList;