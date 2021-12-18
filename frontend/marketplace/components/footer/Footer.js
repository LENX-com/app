import React, {useEffect, useState } from 'react'
import '@/styles/footer.module.scss'
import { NavLink } from '@/components/NavLink/NavLink'
import { AiOutlineMessage, AiOutlineShop, AiOutlineShoppingCart } from 'react-icons/ai'
 import {BsPerson } from "react-icons/bs";
import CartPop from '../cart/CartPop'
import { useMediaQuery } from 'react-responsive'


const Footer = () => {


    // const [position, setPosition] = useState(window.pageYOffset)
    // const [visible, setVisible] = useState(true) 
    //     useEffect(()=> {
    //         const handleScroll = () => {
    //         let moving = window.pageYOffset
            
    //         setVisible(position > moving);
    //         setPosition(moving)
    //         };
    //         window.addEventListener("scroll", handleScroll);
    //         return(() => {
    //         window.removeEventListener("scroll", handleScroll);
    //         })
    //     })

    // const cls = visible ? "block" : "hidden";
    const isTabletOrMobile = useMediaQuery({ query: '(max-width: 768px)' })




  return (
    <> 
        { isTabletOrMobile &&
            <div className= {`sticky bottom-0 bg-white dashboard-footer shadow-button lg:hidden block`} style={{zIndex:"999", height: "48px"}}>  
                <div className="grid grid-cols-3 gap-3 text-Black-medium">
                <div className="col">
                    <NavLink href= "/marketplace" activeClassName=" text-Blue font-bold">
                        <div className="wrapper text-center"> 
                            <div className="icon-wrapper mt-2 text-xl">
                                < AiOutlineShop className="mx-auto"/>
                            </div>
                            <div className="text-sm">
                                <p> Marketplace </p>
                            </div>
                        </div>
                    </NavLink>
                </div>
            
                <div className="col">
                    <NavLink href= {`/user/dashboard`} activeClassName=" text-Blue font-bold">
                        <div className="wrapper text-center"> 
                            <div className="icon-wrapper mt-2 text-xl">
                                <BsPerson className="mx-auto" />
                            </div>
                            <div className="text-sm">
                                <p> Account </p>
                            </div>
                        </div>
                    </NavLink>    
                </div>
            
            <div className="col">
                    <CartPop />    
            </div>
            </div>
        </div>
    }
    </>
  )
};

export default Footer