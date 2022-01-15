import React from 'react'
import Link from 'next/link'
import { NavLink } from '@/components/NavLink/NavLink'
import * as Icons from '@/marketplace/assets/icons'
import Button from '@/components/Buttons/Button'

function Icon({ icon, ...props }) {
  const Icon = Icons[icon]
  return <Icon {...props} />
}

function SidebarContent() {
  return (
    <div className="py-4">
      <ul className="mt-6">
        <li className="">
            <NavLink exact href="/user/dashboard" 
                    activeClassName=" font-bold border-l-4 border-l-Blue icon-active"
                    className=" flex justify-between uppercase text-Black-text hover:font-bold py-2"
            >
                <h2 className=" text-base my-auto ml-4">
                    Dashboard
                </h2>
                <Icon className=" h-5 w-5 my-auto" icon="Home"/>
          </NavLink>
        </li>

        <li className="">
            <NavLink 
                    href="/user/dashboard/my-orders" 
                    activeClassName=" border-l-4 border-l-Blue icon-active font-bold"
                    className=" flex justify-between uppercase text-Black-text hover:font-bold py-2"
            >
                <h2 className=" text-base my-auto ml-4">
                    Orders
                </h2>
                <Icon className=" h-5 w-5 my-auto" icon="Order"/>
          </NavLink>
        </li> 

        <li className="">
            <NavLink 
                    href="/user/dashboard/chat" 
                    activeClassName=" border-l-4 border-l-Blue icon-active font-bold relative"
                    className=" flex justify-between uppercase text-Black-text hover:font-bold py-2"
            >
                <h2 className="text-base my-auto ml-4">
                    Chats
                </h2>
                <Icon className=" h-5 w-5 my-auto" icon="ChatIcon"/>
            </NavLink>
        </li>                  
        <li className="">
            <NavLink 
                    href="/user/dashboard/wishlist" 
                    activeClassName=" border-l-4 border-l-Blue icon-active font-bold"
                    className=" flex justify-between uppercase text-Black-text hover:font-bold py-2"
            >
                <h2 className=" text-base my-auto ml-4">
                    Wishlist
                </h2>
                <Icon className="w-10 h-10 my-auto pl-4" icon="Wishlist"/>
            </NavLink>
        </li>
      </ul>
    </div>
  )
}

export default SidebarContent
