import React from 'react'
import { NavLink } from '@/components/NavLink/NavLink'
import { AiOutlineUser, AiOutlineMessage, AiOutlinePlusSquare, AiOutlineHome } from 'react-icons/ai'
import { Service, Review } from '@/admin/icons'



function SidebarContent() {
  return (
    <div className="py-4">
      <ul className="mt-6">
        <li className="">
            <NavLink exact href="/admin/dashboard" 
                    activeClassName=" font-bold border-l-4 border-l-Blue icon-active"
                    className=" flex justify-between uppercase text-Black-text hover:font-bold py-2"
            >
                <h2 className=" text-base my-auto ml-4">
                    Dashboard
                </h2>
                <AiOutlineHome className=" h-6 w-6 my-auto"/>
          </NavLink>
        </li>

        <li className="">
            <NavLink 
                    exact href="/admin/dashboard/services/add-service" 
                    activeClassName=" border-l-4 border-l-Blue icon-active font-bold"
                    className=" flex justify-between uppercase text-Black-text hover:font-bold py-2"
            >
                <h2 className=" text-base my-auto ml-4">
                    Post service
                </h2>
                <AiOutlinePlusSquare className=" h-6 w-6 my-auto"/>
          </NavLink>
        </li> 

        <li className="">
            <NavLink 
                    href="/admin/dashboard/profile" 
                    activeClassName=" border-l-4 border-l-Blue icon-active font-bold relative"
                    className=" flex justify-between uppercase text-Black-text hover:font-bold py-2"
            >
                <h2 className="text-base my-auto ml-4">
                    Profile
                </h2>
                <AiOutlineUser className=" h-6 w-6 my-auto"/>
            </NavLink>
        </li>                  
        <li className="">
            <NavLink 
                    href="/admin/dashboard/chat" 
                    activeClassName=" border-l-4 border-l-Blue icon-active font-bold"
                    className=" flex justify-between uppercase text-Black-text hover:font-bold py-2"
            >
                <h2 className=" text-base my-auto ml-4">
                    Chats
                </h2>
                <AiOutlineMessage className="w-5 h-5 my-auto"/>
            </NavLink>
        </li>
        <li className="">
            <NavLink 
                    exact href="/admin/dashboard/services" 
                    activeClassName=" border-l-4 border-l-Blue icon-active font-bold"
                    className=" flex justify-between uppercase text-Black-text hover:font-bold py-2"
            >
                <h2 className=" text-base my-auto ml-4">
                    My posts
                </h2>
                <Service className="w-6 h-6 my-auto"/>
            </NavLink>
        </li>
        <li className="">
            <NavLink 
                    href="/admin/dashboard/reviews" 
                    activeClassName=" border-l-4 border-l-Blue icon-active font-bold"
                    className=" flex justify-between uppercase text-Black-text hover:font-bold py-2"
            >
                <h2 className=" text-base my-auto ml-4">
                    My reviews
                </h2>
                <Review className="w-5 h-5 my-auto"/>
            </NavLink>
        </li>
      </ul>
    </div>
  )
}

export default SidebarContent
