import React, { useState } from 'react'
import moment from 'moment'
import parse from 'html-react-parser';
import { Dropdown, DropdownItem } from '@windmill/react-ui'
import { AiOutlineEllipsis, AiOutlineClose, AiOutlineEdit } from "react-icons/ai"
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { deletePost } from '../../../actions/postAction'


const BlogCard = ({blog, i}) => {
    const MAX_LENGTH = 200
    const [isOpen, setIsOpen] = useState({
        index : false,
        open: false
    })

    const { index, open } = isOpen;

    const dispatch = useDispatch()
    
        //This functions makes the user click a pop up before removing the blog, we passing the blog id as a paramater.
    const removeBlog = (id) => {
        if(window.confirm('Delete the item?')){
            dispatch(deletePost(blog._id))
        }
    }
        const DropdownMenu = ({i}) => {
        return (
            <Dropdown isOpen={ open && index === i } onClose={() => setIsOpen({ open: false})} className="z-50 w-auto top-4 right-2 left-auto">
                <Link to = { `/admin/dashboard/blogs/edit/${blog._id}` } >
                    <DropdownItem tag="div"  className="flex">
                        <div> <AiOutlineEdit className="my-auto mr-2 text-lg" /> </div>
                    <div className="text-Black-medium">Edit Blog</div>
                    </DropdownItem>
                </Link>
                <DropdownItem className="flex mb-auto" onClick={ () => removeBlog(blog._id) } >
                <div> <AiOutlineClose className="my-auto mr-2 text-lg" /> </div>
                <div  className="text-Black-medium truncate "> Remove Blog</div>
                </DropdownItem>
            </Dropdown>
        )
    }
    
    return (
        <>
            <div className="max-w-2xl mx-auto overflow-hidden bg-white rounded-lg shadow-product relative">
                <img className="object-cover w-full h-48" src= { blog.photo[0]?.url } alt="Article" />
                <div className="p-6">
                <div>
                    <div className="block mt-2 text-2xl font-semibold text-gray-800 "> { blog.title } </div>
                </div>
                    <div className="mt-2 text-sm text-Black-medium dark:text-gray-400">
                        {parse(`${blog.text.substring(0, MAX_LENGTH)}${blog.text.length > MAX_LENGTH ? "..." : ""}`)}
                    </div>
                <div className="mt-4">
                    <div className="flex items-center">
                    <div className="flex items-center">
                        <img className="object-cover h-8 rounded-full" src= { blog.avatar } alt="Avatar" />
                        <a href="#" className="mx-2 font-semibold text-gray-700 dark:text-gray-200"> { blog.name } </a>
                    </div>
                    <span className="mx-1 text-xs text-gray-600 dark:text-gray-300">{ moment(blog.date).calendar() } </span>
                    </div>
                </div>
                </div>
                <button
                    className="absolute right-0 top-0"
                    onClick={() => setIsOpen({open: !open, index: i})}>
                    <div className="m-auto rounded-lg bg-Grey-light px-3">
                        <AiOutlineEllipsis className="text-white m-auto text-2xl font-bold" />
                    </div>
                </button>
                <DropdownMenu i = { i } /> 
            </div>
        </>
    )
}

export default BlogCard
