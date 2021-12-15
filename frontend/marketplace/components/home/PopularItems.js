import React from 'react'
import Card from '@/components/Cards/Card'
import Button from '@/components/Buttons/Button'
import Link from 'next/link'
import { AiOutlineRight } from 'react-icons/ai'

const PopularItems = () => {

    const PopularProducts = [
        {
            name: "3d Printer",
            photo: "https://http2.mlstatic.com/D_Q_NP_2X_922205-MLA41374470987_042020-G.webp"
        },
        {
            name: "Card",
            photo: "https://images-na.ssl-images-amazon.com/images/I/51QKvd62vVL._AC_SY240_.jpg"
        },
        {
            name: "Mouse",
            photo: "https://images-na.ssl-images-amazon.com/images/I/51QKvd62vVL._AC_SY240_.jpg"
        },
        {
            name: "Mouse",
            photo: "https://images-na.ssl-images-amazon.com/images/I/51QKvd62vVL._AC_SY240_.jpg"
        }
    ]
    
    return (
        <Card title="Popular Services" className="lg:hidden">  
            { PopularProducts.map((data)=> (
                <Link href="/">
                    <div className="my-3 flex items-center lg:w-3/5 mx-auto sm:flex-row shadow-separator p-1 bg-white">
                        <div className=" bg-contain bg-center h-24 w-24 bg-no-repeat " style= {{background: `url("${data.photo}")`}}>
                        </div>
                        <div className="flex-grow sm:text-left text-center my-auto">
                            <h2 className="text-gray-900 text-base title-font font-medium mb-2"> { data.name } </h2>
                            <h2 className="text-gray-900 text-lg title-font font-medium mb-2"> £ 99 </h2>
                            <div className="free-delivery">
                                Free delivery
                            </div>
                        </div>
                    </div>
                </Link>
            ))}
            <div className="flex justify-between">
                <Link href="/" className=" text-Blue ">
                    Source More 
                </Link>
                <AiOutlineRight className="ml-2 my-auto text-Blue"/>            
            </div>
        </Card>
    )
}

export default PopularItems
