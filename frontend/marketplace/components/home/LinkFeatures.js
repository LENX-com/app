import React from 'react'
import { Chat} from '../../assets/icons'
import Card from '../../../components/Cards/Card'
import { Swiper, SwiperSlide } from 'swiper/react';
import { useMediaQuery } from 'react-responsive'
import { BsPeopleFill, BsFillChatSquareDotsFill } from "react-icons/bs";
import { MdLocalShipping } from "react-icons/md";
import { FaRocket }  from "react-icons/fa";

const LinkFeatures = () => {

    const isTabletOrMobile = useMediaQuery({ query: '(max-width: 768px)' })


    const Feature = [
        {
            name: "Buy directly from brands",
            icon: <BsPeopleFill className="h-7 w-7 text-center m-0" />
        },
        {
            name: " Fast shipping ",
            icon: <MdLocalShipping  className="h-7 w-7 text-center m-0" />
        },
        {
            name: " Easy chat",
            icon: <Chat className="h-7 w-7 text-center m-0" />  
        },
        {
            name: " Made by startups ",
            icon: < FaRocket className="h-7 w-7 text-center m-0" />  
        }
    ]
    return (
        <div className="mb-10 rounded-sm bg-white shadow-button">
                <div className="grid grid-cols-4 gap-2 mobile:grid-cols-1">                
                    {Feature.map((data, i) => (
                        <div className=" m-auto text-center mobile:m-0 mobile:shadow-separator p-2">
                            <div className="flex">
                                <div className=" p-2 m-0 text-Blue rounded-full" style= {{border: "1px solid rgb(221, 221, 221)"}}>
                                    {data.icon}
                                </div>
                                <div className="text-center text-lg my-auto ml-2">
                                {data.name} 
                                </div>
                            </div>
                        </div>
                        ))}
                </div>
            </div>
        )
}

export default LinkFeatures


