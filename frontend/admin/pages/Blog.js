import React, { useState, useEffect } from 'react'
import SectionTitle from "../components/Typography/SectionTitle";
import BlogCard from '../components/Blog/BlogCard'
import { useSelector, useDispatch } from 'react-redux'
import Card from '../../components/Cards/Card'
import {  getPostsByUser } from "../../actions/postAction";
import animationData from '../../assets/lotties/blogging'
import  Button from '../../components/Buttons/Button'
import { AiOutlineEllipsis, AiFillCamera, AiFillFileImage, AiOutlinePlus } from "react-icons/ai"
import { Dropdown, DropdownItem, Input } from '@windmill/react-ui'
import { Link } from 'react-router-dom'
import Lottie from 'react-lottie';



const Blog = ({match}) => {
 const dispatch = useDispatch()
 const [isOpen, setIsOpen] = useState(false)
 const [ menu, setMenu ] = useState(0)
 const { user } = useSelector((state) => state.auth);
 const { blogs } = useSelector((state) => state.admin);
 const [ status, setStatus ] = useState('active')
 const [ filteredBlogs, setFilteredBlogs ] = useState('')
 const [ isRemoved, setIsRemoved ] = useState(false)

 
  useEffect(() => {
      dispatch(getPostsByUser())
       const filter = blogs?.filter(function (el) {
              return el.status === status;
            });
        setFilteredBlogs(filter)
    }, [ dispatch ]) 

    
    // useEffect will update the products with the status [' active' , ' draft ', ' inactive ' ]
    useEffect(() => {
        const filter = blogs && blogs.filter(function (el) {
              return el.status === status;
            });
        setFilteredBlogs(filter)
    }, [status, blogs])

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
            <Input aria-label="Bad" placeholder="Search for blogs" className="p-2 border-2 border-border rounded-md"/>
        </div>
        </>
    )

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
                    <SectionTitle> { `No ${status} blogs found` } </SectionTitle>
                </div>
                <Lottie 
                    options={defaultOptions}
                    height={275}
                    width={275}
                />
            </div>
        )
    }


    return (
        <div>
            <div className="px-4 flex justify-between my-4">
                <h2 className=" text-lg font-semibold text-gray-600 dark:text-gray-300"> Blogs </h2>
                <Link to= {`${match.url}/add-blog`}>
                    <Button className="text-base bg-white flex "> 
                        <AiOutlinePlus className="my-auto mr-2"/>
                    <span className="font-bold"> Add a blog </span>
                    </Button>
                </Link>  
            </div>

            <div className="bg-white shadow-button relative my-2 lg:rounded-md mb-5"> 
                <SelectionMenu />
                { filteredBlogs && filteredBlogs.length !== 0 ?
                <div className="pb-4">
                    <div className="grid sm:grid-cols-1  lg:grid-cols-4 md:grid-cols-3 gap-10 p-4">
                    {filteredBlogs && filteredBlogs.map( (blog, i) => (
                        <BlogCard blog= { blog } i = {i} />
                    ))}
                    </div>
                </div>
                :
                <NoResultsFound />
                }
            </div>

        </div>
    )
}

export default Blog
