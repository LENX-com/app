import React, { useState } from 'react'
import { AiOutlineSearch, AiFillCar, AiOutlineDown } from 'react-icons/ai'
import { Up, Star, EmptyStar } from '../../assets/icons'
import { Disclosure } from '@headlessui/react'
import SectionTitle from '../../../components/Typography/SectionTitle'
import { Swiper, SwiperSlide } from 'swiper/react'



const NavBar = React.memo(({children}) => {
    
    const BarStyle = {
        position: "fixed",
        top: "64px",
        left: "0px",
        height: "100vh",
        width: "300px",
        background: "white",
        paddingTop: "1rem",
        overflow: "auto",
        paddingBottom: "1.5rem",
        transition: "all 0.3s ease 0s",
        zIndex: "2",
    }

    return (
        <div  style={BarStyle} className="overflow-y-scroll pb-3">
           {children}
        </div>
    )
})

export default NavBar
