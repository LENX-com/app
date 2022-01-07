import React from 'react'
import { Swiper, SwiperSlide } from "swiper/react";


const ProductImage = [{
  url: "https://sc04.alicdn.com/kf/Hdb74b0629dd443928f2d4d639bab8d55d.jpg",
  number: 1,
},
{
  url: "https://sc04.alicdn.com/kf/H46a5ac771b8b4ee7a3f1ae41248dbb4bc.jpg_50x50.jpg",
  number: 2,
},
{
  url: "https://sc04.alicdn.com/kf/H6bdcf18014fd42a2aaf2db1ee57d9f33E.jpg_50x50.jpg",
  number: 3,
},
{
  url: "https://sc04.alicdn.com/kf/H6bdcf18014fd42a2aaf2db1ee57d9f33E.jpg_50x50.jpg",
  number: 4,
}
]



const Stories = () => {
    return (
      <>
        <Swiper slidesPerView={3}
                        spaceBetween={20}
                        pagination={{"clickable": true}}
                        className="mySwiper">
          <ul className="md:flex items-center justify-center md:space-x-8">
      {ProductImage.map((data, i) =>  (  
      <SwiperSlide key={i}>
        
            <li key={i} className="flex flex-col items-center space-y-2">
              {data.number}
            <div className="bg-gradient-to-tr from-yellow-500 to-pink-600 rounded-full p-1">
              <a className="block bg-white p-1 rounded-full transform transition hover:-rotate-12 duration-300" alt="asde" href="#div">
                <img className="h-16 w-16 rounded-full" src="https://i.ibb.co/yhh0Ljy/profile.jpg" alt="jkay" href="#div" />
              </a>
            </div>
          </li>
        </SwiperSlide> ))
          }
          </ul>
       </Swiper>
      </>


    )
}

export default Stories
