import React, { useState, useEffect } from 'react'
import ProductList from '@/admin/components/Store/ProductList'
import { useSelector, useDispatch } from 'react-redux'
import Card from '@/components/Cards/Card'
import Layout from '@/admin/containers/Layout'
import {  adminProducts } from "@/redux/actions/productAction";
import  Button from '@/components/Buttons/Button'
import withAuth from '@/components/auth'
import { AiOutlineEllipsis, AiFillCamera, AiFillFileImage, AiOutlinePlus } from "react-icons/ai"
import { Dropdown, DropdownItem, Input } from '@windmill/react-ui'
import Link from 'next/link'


const Store = ({match}) => {
 const dispatch = useDispatch()
 const [isOpen, setIsOpen] = useState(false)
 const [ menu, setMenu ] = useState(0)  
 const { user } = useSelector((state) => state.auth);
 const { products } = useSelector((state) => state.admin.products);
 const [ status, setStatus ] = useState('active')
 const [ filteredProducts, setFilteredProducts ] = useState('')
 const [ isRemoved, setIsRemoved ] = useState(false)

 const State = [
    { name: "My products"},
    { name: "Delivered"},  
    { name: " On hold "},
]
function toggleDropdown() {
  setIsOpen(!isOpen)
}
 
  useEffect(() => {
      dispatch(adminProducts({authorId : user._id }))
       const filter = products && products.filter(function (el) {
              return el.status === status;
            });
        setFilteredProducts(filter)
    }, [ ]) 

    
    // useEffect will update the products with the status [' active' , ' draft ', ' inactive ' ]
    useEffect(() => {
        const filter = products && products.filter(function (el) {
              return el.status === status;
            });
        setFilteredProducts(filter)
    }, [status, products])

  const menuOptions = [ "active", "draft", "inactive" ]

  const handleMenu = (data, i) => {
      setMenu(i)
      setStatus(data)
  }
    const SelectionMenu = () => (
        <>
        <div className="shadow-separator">
            <div className="p-2">
                <ul className="flex flex-wrap">
                    { menuOptions.map((data, i)=> (
                        <li key= { i } className= {`${menu === i ? 'border-b-2 border-orange text-Black' : 'text-Black-medium'} w-auto p-2 cursor-pointer`} >
                            <div
                                onClick = { () => handleMenu( data, i )}
                                className="capitalize">
                            {data}
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
        </>
    )


    return (
        <Layout>

            <div className="px-4 flex justify-between my-4">
                <h2 className=" text-lg font-semibold text-Black-text"> Services </h2>
                <Link href= {`/admin/dashboard/services/add-service`}>
                    <Button className="text-base bg-white flex "> 
                        <AiOutlinePlus className="my-auto mr-2"/>
                    <span className="font-bold"> Add a service </span>
                    </Button>
                </Link>
            </div>

            <div className="bg-white shadow-button relative my-2 mb-8">
                <SelectionMenu />
                { filteredProducts &&
                    <ProductList
                                products= { filteredProducts }
                                status = { status }
                    />
                }
            </div>

        </Layout>
    )
}

export default withAuth(Store)
