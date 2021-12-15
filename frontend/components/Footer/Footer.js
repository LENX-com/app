import React from 'react'
import { AiOutlineMessage, AiOutlineShop, AiOutlineShoppingCart } from 'react-icons/ai'
import { Link } from 'react-router-dom'

const Footer = () => {
    const address ="/user/dashboard";

    return (
        <footer className="sticky bottom-0 bg-white dashboard-footer shadow-button h-12" style={{zIndex:"999"}}>  
            <div className="flex">
                <div className="col">
                    <Link to= {`${address}/dashboard`}>
                        <div className="wrapper"> 
                            <div className="icon-wrapper mt-2 text-xl">
                                < AiOutlineShop />
                            </div>
                            <div className="text-sm">
                                <p> Marketplace </p>
                            </div>
                        </div>
                    </Link>
                </div>
            
                <div className="col">
                    <Link to= {`${address}/chat`}>
                        <div className="wrapper"> 
                            <div className="icon-wrapper mt-2 text-xl">
                                <AiOutlineMessage/>
                            </div>
                            <div className="text-sm">
                                <p> Chat </p>
                            </div>
                        </div>
                    </Link>    
                </div>
                
                <div className="col">
                    <Link to= {`${address}/my-orders`}>
                        <div className="wrapper"> 
                            <div className="icon-wrapper mt-2 text-xl">
                                <AiOutlineShoppingCart />
                            </div>
                            <div className="text-sm">
                                <p> My Orders  </p>
                            </div>
                        </div>
                    </Link>
                </div>
            </div>
        </footer>
    )
}

export default Footer


  