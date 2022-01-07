import React, { useState, Fragment } from 'react'
import { Dropdown, DropdownItem, Badge, Input, Label } from '@windmill/react-ui'
import { AiOutlineEllipsis, AiOutlineClose, AiOutlineEdit, AiOutlinePlus } from "react-icons/ai"
import { deleteProduct } from '@/actions/productAction'
import { useDispatch } from 'react-redux'
import Lottie from 'react-lottie';
import Button from '@/components/Buttons/Button'
import SectionTitle from '@/components/Typography/SectionTitle'
import {  adminProducts } from "@/redux/actions/productAction";
import animationData from '@/assets/lotties/shopping'
import Link from 'next/link'
import { Desktop, Mobile } from '@/config/ScreenSize'

const ProductList = ({products, status }) => {
    
    const [isOpen, setIsOpen] = useState({
        index : false,
        open: false
    })
    const dispatch = useDispatch();

    const { index, open } = isOpen;

    //This functions makes the user click a pop up before removing the product, we passing the product id as a paramater.
    const removeProduct = (id) => {
        if(window.confirm('Delete the item?')){
            dispatch(deleteProduct(id))
            dispatch(adminProducts({authorId : user._id }))
        }
    }

    const NoResultsFound = () => {
        const defaultOptions = {
            loop: true,
            autoplay: true,
            animationData: animationData,
            rendererSettings: {
                preserveAspectRatio: "xMidYMid slice"
            }
        };

        return (
            <div>
                <div className="text-center">
                    <SectionTitle> { `No ${status} services found` } </SectionTitle>
                </div>
                <Lottie 
                    options={defaultOptions}
                    height={275}
                    width={275}
                />
            </div>
        )
    }

      const DropdownMenu = ({i, product}) => {
        return (
            <Dropdown isOpen={ open && index === i } onClose={() => setIsOpen({ open: false})} className="z-50 w-auto top-4 left-4">
                <Link href = { `/admin/dashboard/services/edit/${product.slug}` } >
                    <DropdownItem tag="div"  className="flex">
                        <div> <AiOutlineEdit className="my-auto mr-2 text-lg" /> </div>
                        <div className="text-Black-medium">Edit Product</div>
                    </DropdownItem>
                </Link>
                <DropdownItem className="flex mb-auto" onClick={ () => removeProduct(product._id) } >
                    <div> <AiOutlineClose className="my-auto mr-2 text-lg" /> </div>
                    <div  className="text-Black-medium truncate "> Remove Product</div>
                </DropdownItem>
            </Dropdown>
        )
    }

  const ProductCard = ({i, product}) => (
    <div className="flex bg-white shadow-separator px-2">
        <div className="w-2/5 my-3 nr-3">
             <div
                className="relative rounded-md bg-cover bg-center h-28 bg-Grey p-2" 
                style = {{backgroundImage: `url(${product.photo && product.photo[0]?.url})`}}
            />
        </div>

        <div className="relative w-3/5 my-auto">
            <div className="w-1/2 h-full ml-2">
                <div className="my-auto">
                    <div className=" text-Black-medium text-sm mx-auto text-center">
                        {product.name}
                    </div>
                    <div className="p-3 my-auto font-bold text-Black text-base text-center">
                        £{product.price}
                    </div>
                    <div className="text-center">
                         <Badge type={ product.status === "active" ? `success` : 'neutral' }> { product.status } </Badge>
                    </div>
                </div>
            </div>
            <button
                className="absolute right-0 top-0"
                onClick={() => setIsOpen({open: !open, index: i})}>
                <div className="m-auto">
                   <AiOutlineEllipsis className="m-auto text-2xl font-bold" />
                </div>
            </button>
            <DropdownMenu i = { i } product = { product}/>
        </div>
    </div>
  ) 

    return (
        <>
            <Desktop>
                <div className="flex flex-col text-left">
                    <div className="-my-2 sm:-mx-6 lg:-mx-8">
                      <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
                        <div className="shadow border-b border-gray-200 sm:rounded-lg">
                           { products.length === 0 ? 
                                    <div className="mt-4 overflow-hidden p-3">
                                        <NoResultsFound />
                                    </div>
                                :

                            <table className="min-w-full divide-y divide-gray-200">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-Black-medium uppercase tracking-wider">
                                            Product
                                        </th>
                                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-Black-medium uppercase tracking-wider">
                                            Title
                                        </th>
                                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-Black-medium uppercase tracking-wider">
                                            Status
                                        </th>
                                        <th scope="col" className="relative px-6 py-3">
                                            <span className="sr-only">Edit</span>
                                        </th>
                                        </tr>
                                </thead>
                                
                                <tbody className="bg-white divide-y divide-gray-200">
                                    { products && products.map( (product, i) => (
                                    <>
                                        <tr className="relative">
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="">
                                                        <div
                                                            className="relative rounded-md bg-cover bg-center h-28 w-28 bg-Grey p-2 " 
                                                            style = {{backgroundImage: `url(${product.photo && product.photo[0]?.url})`}}
                                                        />
                                                </div>
                                            </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="text-base text-Black-medium"> { product.name } </div>
                                            <div className="text-base font-bold"> £ { product.price } </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <Badge type={ product.status === "active" ? `success` : 'neutral' } className="px-2 inline-flex text-xs leading-5">
                                                { product.status }
                                            </Badge>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium relative">
                                            <button
                                                className="m-auto"
                                                onClick={() => setIsOpen({open: !open, index: i})}>
                                                <div className="m-auto">
                                                <AiOutlineEllipsis className="m-auto text-2xl font-bold" />
                                                </div>
                                            </button>
                                            <DropdownMenu i = { i } product = { product}/>
                                        </td>
                                    </tr>
                                </>
                                    ))}
                            </tbody>
                        
                        </table>
                        }
                        </div>
                    </div>
                    </div>
                </div>
            </Desktop>

            <Mobile>
                { products.length === 0 ? 
                    <div className="mt-4 overflow-hidden p-3">
                        <NoResultsFound />
                    </div>
                : 
                <>
                    {products?.map( (product, i) => (
                        <Fragment key={ i }>
                            <ProductCard i = {i} product= { product } />
                        </Fragment>
                    ))}
                </>
            }
            </Mobile>
        </>
    )
}

export default ProductList

