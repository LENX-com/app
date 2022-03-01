/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react'
import CardInfo from '@/dashboard/components/Cards/CardInfo'
import Layout from '@/dashboard/containers/Layout'
import UserCard from '@/admin/components/Cards/UserCard'
import { conversation as Conversation, order, Information} from '@/dashboard/icons'
import { Order, Blog, Wishlist } from '@/marketplace/assets/icons'
import RoundIcon from '@/dashboard/components/RoundIcon'
import { Avatar } from '@windmill/react-ui'
import SwiperCore, { Navigation, Pagination, Scrollbar, A11y } from 'swiper';
import { orderByUser } from '@/redux/actions/orderAction'
import Link from 'next/link'
import { NotFound } from '@/marketplace/assets/icons'  
import { HiChevronRight, HiOutlineChat } from 'react-icons/hi'
import { AiOutlineMessage, AiOutlineUser } from 'react-icons/ai'
import { useMediaQuery } from 'react-responsive'  
import { NavLink } from '@/components/NavLink/NavLink'
import moment from 'moment'
import OrderItem from '@/dashboard/components/orders/OrderItem' 
import { useSelector, useDispatch } from 'react-redux' 
import withAuth from '@/components/auth'

// install Swiper modules
SwiperCore.use([Navigation, Pagination, Scrollbar, A11y]);

const Dashboard = () => {
  const [page, setPage] = useState(1)
  const [data, setData] = useState([])
  const isTabletOrMobile = useMediaQuery({ query: '(max-width: 768px)' })
  const address = "/user/dashboard"
  const { user, isAuthenticated }  = useSelector( state => state.auth);
  const {conversations} = useSelector( state => state.chat);
  const {orders} = useSelector( state => state.order.myOrders)
  const MAX_LENGTH = 30

  const dispatch = useDispatch();

  const Conversations = () => (
    <>
     {conversations !== undefined && conversations?.length !== 0 ? 
         
         ( conversations.map( (data, i) => (   
            <div 
                className="py-2 shadow-separator px-3 hover:bg-Grey-dashboard"
                key={i}  
            >
              <Link 
                    href= {`/user/dashboard/chat/room/${data._id}`} 
                    className="w-full"
                    onClick={() => dispatch({
                       type: "CURRENT_CHAT",
                       payload: data,
                     })}
              >
                <div className="flex">
                  <div className="my-auto mr-3">
                    <Avatar size="large" src= {user._id === data.members[0]._id ? data.members[1].avatar : data.members[0].avatar}/>
                  </div>
                  <div className="w-full">  
                    <div className="font-bold text-Black text-left capitalize"> 
                      {user._id === data.members[0]._id ? data.members[1].name : data.members[0].name } 
                    </div>
                    <div className="flex text-Black-medium justify-between w-full text">
                      <div>
                        {data.lastMessage.substring(0, MAX_LENGTH)} {data.lastMessage.length > MAX_LENGTH ? "..." : ""} 
                      </div> 
                      <div className="my-auto ml-3"> 
                        {moment(data.updatedAt).format('LT')} 
                      </div> 
                    </div>
                  </div>
                </div>    
              </Link>
            </div>
        ))
      ) : (
        <div className="Center">
          <span className="font-bold capitalize"> Sorry there are no chats available </span>
       </div>
      )
      }
    </>
  )

  useEffect(() => {
    dispatch(orderByUser())
    }, [dispatch])

  return (
    <Layout>
        <UserCard user= {user} />
              { isTabletOrMobile ?
              (
              <div className="bg-white">
                  <div className="py-3 shadow-separator">
                      <Link href="/user/dashboard/profile">
                          <a className="px-3 flex text-Black-text">
                              <AiOutlineUser className=" h-5 w-5 my-auto"/>
                              <span className="font-bold text-base my-auto ml-2">
                                  Profile
                              </span>
                          </a>
                      </Link>
                  </div>                  
                  <div className="py-3 shadow-separator">
                      <Link href="/user/dashboard/my-orders">
                          <a className="px-3 flex text-Black-text">
                              <Order className="w-5 h-5 my-auto"/>
                              <span className="font-bold text-base my-auto ml-2">
                                  Orders
                              </span>
                          </a>
                      </Link>
                  </div> 
                  <div className="py-3 shadow-separator">
                      <Link href="/user/dashboard/chat">
                          <a className="px-3 flex text-Black-text">
                              <AiOutlineMessage className="w-5 h-5 my-auto"/>
                              <span className="font-bold text-base my-auto ml-2">
                                  Chats
                              </span>
                          </a>
                      </Link>
                  </div>
                  {/* <div className="py-3 shadow-separator">
                      <Link href="/user/dashboard/blog">
                          <a className="px-3 flex text-Black-text">
                              <Blog className="w-5 h-5 my-auto"/>
                              <span className="font-bold text-base my-auto ml-2">
                              Blogs
                              </span>
                          </a>
                      </Link>
                  </div> */}
                  <div className="py-3 shadow-separator">
                      <Link href="/user/dashboard/wishlist">
                          <a className="px-3 flex text-Black-text">
                              <div className="w-5 h-5">
                              <Wishlist className=" h-7 w-7 my-auto mr-2"/>
                              </div>
                              <span className="font-bold text-base my-auto ml-2">
                              Wishlist
                              </span>
                          </a>
                      </Link>
                  </div>   
              </div>
               

              ) : (
              <div className="grid gap-6 mb-8 md:grid-cols-2 xl:grid-cols-3 mt-5">
                  { orders &&
                  <CardInfo title="My orders"
                              button="See all"
                              link= {`${address}/my-orders`}
                      icon = {<RoundIcon
                      icon={order}
                      iconColorClass="text-orange-500 dark:text-orange-100"
                      bgColorClass="bg-orange-100 dark:bg-orange-500"
                      className="mr-4"
                      />}>
                      {<OrderItem/>}
                  </CardInfo>
                  }
          
              {/* Conversation Card */}
              <CardInfo
                  title="Conversations"
                  button="See all"
                  link = {`${address}/chat`} 
                  icon = {<RoundIcon
                  icon={Conversation}
                  className="mr-4"
                  />}>
                  < Conversations/>
              </CardInfo>

              {/* Resources */}
              <CardInfo title="Resources"          
                  icon = {<RoundIcon
                  icon={Information}
                  className="mr-4"
                  />}>
                  <div className="text-base mt-3" >
                  <NavLink href="/user/dashboard/faq">
                      <div className="flex ml-4 justify-between hover:bg-Hover">
                      <h1>FAQ</h1>
                          <div>
                          <HiChevronRight className="w-4 h-4 mr-3" aria-hidden="true" />
                          </div>
                      </div>
                      </NavLink>

                      <NavLink href="/user/dashboard/faq">
                      <div className="flex ml-4 justify-between hover:bg-Hover">
                      <h1> What is LENX?</h1>
                          <div>
                          <HiChevronRight className="w-4 h-4 mr-3" aria-hidden="true" />
                          </div>
                      </div>
                      </NavLink>

                      <NavLink href= "/user/dashboard/status-order">
                      <div className="flex ml-4 justify-between hover:bg-Hover">
                      <h1> Where is my order?</h1>
                          <div>
                          <HiChevronRight className="w-4 h-4 mr-3" aria-hidden="true" />
                          </div>
                      </div>
                      </NavLink>
                      </div>  
              </CardInfo>
          </div>
          )}
    </Layout>
   )
}

export default withAuth(Dashboard)

