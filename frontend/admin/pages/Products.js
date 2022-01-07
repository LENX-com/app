import React, { useState, useEffect } from 'react'
import SectionTitle from "../components/Typography/SectionTitle";
import Profile from '../components/Store/Profile'
import ProductList from '../components/Store/ProductList'
import { useSelector, useDispatch } from 'react-redux'
import Card from '../../components/Cards/Card'
import {  adminProducts } from "../../actions/productAction";
import  Button from '../../components/Buttons/Button'
import { AiOutlineEllipsis, AiFillCamera, AiFillFileImage, AiOutlinePlus } from "react-icons/ai"
import { Dropdown, DropdownItem, Input } from '@windmill/react-ui'
import { Link } from 'react-router-dom'


const Store = ({match}) => {
 const dispatch = useDispatch()
 const [isOpen, setIsOpen] = useState(false)
 const [ menu, setMenu ] = useState(0)  
 const { user } = useSelector((state) => state.auth);
 const { products } = useSelector((state) => state.admin);
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
      dispatch(adminProducts({author : user._id }))
       const filter = products.filter(function (el) {
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

  const DropdownMenu = () => (

      <Dropdown isOpen={isOpen} onClose={() => setIsOpen(false)} className="z-50 w-auto top-8">
        <DropdownItem tag="a" href="#" className="flex">
          <div> <AiFillCamera className="my-auto mr-2 text-lg" /> </div>
          <div className="text-Black-medium">Update Logo</div>
        </DropdownItem>
        <DropdownItem className="flex" >
          <div> <AiFillFileImage className="my-auto mr-2 text-lg" /> </div>
          <div  className="text-Black-medium truncate ">Update Frame</div>
        </DropdownItem>
      </Dropdown>
  )
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
        <div className="p-2 my-2 shadow-separator">
            <Input aria-label="Bad" placeholder="Search for products" className="p-2 border-2 border-border rounded-md"/>
        </div>
        </>
    )


    return (
        <div>
            {/* <div className="flex justify-between px-4 mt-4">
                <div>
                    <SectionTitle> Store </SectionTitle>
                </div>
                <div className="relative w-1/2 h-10">
                    <button
                        className=" border-box absolute right-2 p-2"
                        onClick={toggleDropdown}>
                        <div className="m-auto">
                            <AiOutlineEllipsis className="m-auto text-xl font-bold" />
                        </div>
                    </button>
                    <DropdownMenu />
                </div>
            </div> */}
            
            {/* <Profile /> */}

            <div className="px-4 flex justify-between my-4">
                <h2 className=" text-lg font-semibold text-gray-600 dark:text-gray-300"> Products </h2>
                <Link to= {`${match.url}/add-product`}>
                    <Button className="text-base bg-white flex "> 
                        <AiOutlinePlus className="my-auto mr-2"/>
                    <span className="font-bold"> Add product </span>
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

        </div>
    )
}

export default Store
