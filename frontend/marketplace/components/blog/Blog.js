import React from 'react'
import { AiOutlineFieldTime } from 'react-icons/ai'
import { Link } from 'react-router-dom'

const Blog = ({BlogId}) => {
    return (
        <Link to= { BlogId && `/blog/${BlogId}`}>
            <div className="flex max-w-md mx-auto overflow-hidden bg-white border-t-2 border-b-2 border-Grey-border p-2">
                <div className="w-1/3 bg-cover rounded-md p-2" style={{backgroundImage: 'url("https://images.unsplash.com/photo-1494726161322-5360d4d0eeae?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=334&q=80")'}} />
                    <div className="w-2/3 p-4 md:p-4">
                        <h1 className="text-2xl font-bold text-gray-800 dark:text-white">Backpack</h1>
                    <div className="flex">
                        <AiOutlineFieldTime className="my-auto"/>
                        <p className=" text-sm text-gray-600 dark:text-gray-400">Uploaded three days ago</p>
                    </div>
                </div>
            </div>
        </Link>
    )
}

export default Blog
