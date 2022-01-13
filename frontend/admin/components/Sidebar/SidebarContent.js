import React from 'react'
import { NavLink } from '@/components/NavLink/NavLink'
import { AiOutlineUser, AiOutlineMessage, AiOutlinePlusSquare, AiOutlineHome } from 'react-icons/ai'
import { Service, Review } from '@/admin/icons'



function SidebarContent() {
  return (
    <div className="py-4 text-Black text w-4/5 mx-auto">
      <ul className="mt-6">
        <div className="py-3">
          <NavLink exact href="/admin/dashboard" activeClassName=" font-bold">
              <a className="px-3 flex text-Black-text hover:font-bold">
                  <AiOutlineHome className=" h-5 w-5 my-auto"/>
                  <h2 className=" text-base my-auto ml-2">
                      Dashboard
                  </h2>
              </a>
          </NavLink>
        </div>  
        <div className="py-3">
          <NavLink href="/admin/dashboard/services/add-service" activeClassName=" font-bold">
              <a className="px-3 flex text-Black-text hover:font-bold">
                  <AiOutlinePlusSquare className=" h-5 w-5 my-auto"/>
                  <h2 className=" text-base my-auto ml-2">
                      Post service
                  </h2>
              </a>
          </NavLink>
        </div> 
        <div className="py-3">
            <NavLink href="/admin/dashboard/profile" activeClassName=" font-bold">
                <a className="px-3 flex text-Black-text hover:font-bold text-base">
                    <AiOutlineUser className=" h-5 w-5 my-auto"/>
                    <h2 className="my-auto ml-2">
                        Profile
                    </h2>
                </a>
            </NavLink>
        </div>                  
        <div className="py-3">
            <NavLink href="/admin/dashboard/chat" activeClassName=" font-bold">
                <a className="px-3 flex text-Black-text hover:font-bold">
                    <AiOutlineMessage className="w-5 h-5 my-auto"/>
                    <h2 className=" text-base my-auto ml-2">
                        Chats
                    </h2>
                </a>
            </NavLink>
        </div>
        <div className="py-3">
            <NavLink href="/admin/dashboard/services" activeClassName=" font-bold">
                <a className="px-3 flex text-Black-text hover:font-bold">
                    <Service className="w-6 h-6 my-auto"/>
                    <h2 className=" text-base my-auto ml-2">
                        My posts
                    </h2>
                </a>
            </NavLink>
        </div>
        <div className="py-3">
            <NavLink href="/admin/dashboard/reviews" activeClassName=" font-bold">
                <a className="px-3 flex text-Black-text hover:font-bold">
                    <Review className="w-5 h-5 my-auto"/>
                    <h2 className=" text-base my-auto ml-2">
                        My reviews
                    </h2>
                </a>
            </NavLink>
        </div>
      </ul>
    </div>
  )
}

export default SidebarContent
