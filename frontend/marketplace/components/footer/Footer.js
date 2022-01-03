import React, {useEffect, useState } from 'react'
import '@/styles/footer.module.scss'
import { NavLink } from '@/components/NavLink/NavLink'
import { AiOutlineMessage, AiOutlineShop, AiOutlineShoppingCart } from 'react-icons/ai'
 import {BsPerson } from "react-icons/bs";
import { useMediaQuery } from 'react-responsive'


const Footer = () => {

    const isTabletOrMobile = useMediaQuery({ query: '(max-width: 768px)' })

  return (
    <> 
        { isTabletOrMobile &&
            <div className= {`sticky bottom-0 bg-white dashboard-footer shadow-button lg:hidden block`} style={{zIndex:"999", height: "48px"}}>  
                <div className="grid grid-cols-2 gap-3 text-Black-medium w-3/5 mx-auto">

                    <div className="col">
                        <NavLink href= "/marketplace" activeClassName=" text-Blue font-bold">
                            <div className="wrapper text-center"> 
                                <div className="icon-wrapper mt-2 text-xl">
                                    < AiOutlineShop className="mx-auto"/>
                                </div>
                                <div className="text">
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
                                <div className="text">
                                    <p> Account </p>
                                </div>
                            </div>
                        </NavLink>    
                    </div>
                </div>
            </div>
        }
    </>
  )
};

export default Footer