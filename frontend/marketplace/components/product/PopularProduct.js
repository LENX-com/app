import { Swiper, SwiperSlide } from 'swiper/react';
import React, { useState } from 'react'
import SectionTitle from '../../../components/Typography/SectionTitle'
import { NavLink, useRouteMatch } from 'react-router-dom'
import ProductCard from './ProductCard'
import Card from '../../../components/Cards/Card'

const PopularProduct = ({categories, productList}) => {

    const [ menu, setMenu ] = useState();  
    const {  url } = useRouteMatch();

    return (
        
        <Card className="my-3">
            <SectionTitle> Popular products </SectionTitle>

            <Swiper
                spaceBetween={20}
                slidesPerView={3}
            >
            { categories?.map ((brand, i) => {
                return (
                    <div key={brand.name}>
                    <SwiperSlide>
                        <NavLink
                        classSelected={menu === i ? true : false}
                        to= {url}
                        click={() => setMenu(i)}
                        activeClassName="sidebar__menu--selected"
                         >
                        <div className="bg-white rounded-lg p-2 text-center text-sm whitespace-nowrap inline-block">
                                { brand.name }
                            <div 
                            className="sidebar__menu--line"></div>
                        </div>
                      </NavLink>
                    </SwiperSlide>
                    
                    <div className="flex flex-wrap -m-4">
                   </div>
                   </div>
                )}
            )}
                </Swiper>

                <div className="grid grid-cols-2 gap-4 lg:grid-cols-4 md:grid-cols-2">
                  {productList?.map( (product, i) => 
                    <ProductCard product= {product} /> 
                  )}
                  </div>
            </Card>
    )
}

export default PopularProduct



