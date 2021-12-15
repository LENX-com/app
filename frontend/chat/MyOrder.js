import React from 'react'
import SectionTitle from '../components/Typography/SectionTitle'
import { Swiper, SwiperSlide } from "swiper/react";
import './styles/MyOrders.scss'
import { Badge } from '@windmill/react-ui'
import { Link } from 'react-router-dom'

const Dummy = [
    {  
        _id: 0,
        name: "Any",
        array: [],
        status: "Sucess"
    },
    {
        _id: 1,
        name: "$0 to $9",
        array: [0, 9],
        status: "Sucess"
    },
    {
        _id: 2,
        name: "$10 to $19",
        array: [10, 19],
        status: "Sucess"
    },
    {
        _id: 3,
        name: "$20 to $29",
        array: [20, 29],
        status: "Sucess"
    },
    {
        _id: 4,
        name: "$30 to $39",
        array: [20, 29],
        status: "Sucess"
    },
    {
        _id: 5,
        name: "$333 to $390",
        array: [20, 29],
        status: "Sucess"
    },
    {  
        _id: 6,
        name: "More than $40",
        array: [40, 99],
        status: "Sucess"
    }
];

const MyOrder = () => {
    return (
        <div className="my-orders">
            <SectionTitle clase="text-center"> Recent Orders </SectionTitle>
            <Swiper  spaceBetween={50} slidesPerView={1}>
            {Dummy.map((data,i) => ( 
                <SwiperSlide>
                    <Link className="shadow-button bg-white rounded cursor-pointer hover:shadow-hover">
                    <div className="flex max-w-md bg-white shadow-lg rounded-lg overflow-hidden">
                        <div className="flex items-center px-2 py-3">
                            <img className="w-14 h-14 object-cover rounded-lg" src="https://images.unsplash.com/photo-1477118476589-bff2c5c4cfbb?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60" alt="profile"/>
                            <div className="mx-3">
                                <h2 className="text-base title">{data.name}</h2>
                                <Badge>{data.status}</Badge>
                            </div>
                        </div>
                    </div>
                    </Link>
                </SwiperSlide>
            ))}
            </Swiper>
        </div>
    )
}

export default MyOrder
