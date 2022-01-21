import React, { useState, useEffect, useRef } from 'react'
import InfoCard from '@/admin/components/Cards/InfoCard'
import SectionTitle from '@/admin/components/Typography/SectionTitle'
import { Service, Review } from '@/admin/icons'
import withAuth from '@/components/auth'
import { AiOutlineUser, AiOutlineMessage, AiOutlinePlusSquare, AiOutlinePlus } from 'react-icons/ai'
import {  adminProducts } from "@/redux/actions/productAction";
import { Swiper, SwiperSlide } from 'swiper/react';
import { useDispatch } from 'react-redux'
import UserCard from '@/admin/components/Cards/UserCard'
import Link from 'next/link'
import { NotFound } from '@/marketplace/assets/icons'
import Button from '@/components/Buttons/Button'
import { Order } from '@/marketplace/assets/icons'
import Layout from '@/admin/containers/Layout'
import { useMediaQuery } from 'react-responsive'
import { useSelector } from 'react-redux'

function Dashboard() {
  const dispatch = useDispatch();
  const isTabletOrMobile = useMediaQuery({ query: '(max-width: 768px)' })
  const { user }  = useSelector( state => state.auth);
  const { products } = useSelector((state) => state.admin.products);
  
  useEffect(() => {
      dispatch(adminProducts({authorId : user._id }))
  }, [])

  const NoResultsFound = () =>(  
    <div className="mb-4 mx-auto">
      <div className="m-auto text-center">
          <NotFound className="text-center mx-auto my-2"/>
          <span className="font-bold capitalize"> Sorry you have not upload any service </span>
      </div>
      <div className="my-3">
        <Link href= {`/admin/dashboard/services/add-service`}>
            <Button className="text-base bg-white flex mx-auto"> 
              <AiOutlinePlus className="my-auto mr-2"/>
              <span className="font-bold"> Add a service </span>
            </Button>
        </Link>
      </div>
    </div>
  )
  
  return (
    <Layout>
        <UserCard user= {user} />
        { isTabletOrMobile ?
              (
              <div className="bg-white mt-14">
                  <div className="py-3 shadow-separator">
                    <Link href="/admin/dashboard/services/add-service">
                        <a className="px-3 flex text-Black-text">
                            <AiOutlinePlusSquare className=" h-5 w-5 my-auto"/>
                            <span className="font-bold text-base my-auto ml-2">
                                Post service
                            </span>
                        </a>
                    </Link>
                  </div> 
                  <div className="py-3 shadow-separator">
                      <Link href="/admin/dashboard/profile">
                          <a className="px-3 flex text-Black-text">
                              <AiOutlineUser className=" h-5 w-5 my-auto"/>
                              <span className="font-bold text-base my-auto ml-2">
                                  Profile
                              </span>
                          </a>
                      </Link>
                  </div>                  
                  {/* <div className="py-3 shadow-separator">
                      <Link href="/admin/dashboard/my-orders">
                          <a className="px-3 flex text-Black-text">
                              <Order className="w-5 h-5 my-auto"/>
                              <span className="font-bold text-base my-auto ml-2">
                                  Orders
                              </span>
                          </a>
                      </Link>
                  </div>  */}
                  <div className="py-3 shadow-separator">
                      <Link href="/admin/dashboard/chat">
                          <a className="px-3 flex text-Black-text">
                              <AiOutlineMessage className="w-5 h-5 my-auto"/>
                              <span className="font-bold text-base my-auto ml-2">
                                  Chats
                              </span>
                          </a>
                      </Link>
                  </div>
                  <div className="py-3 shadow-separator">
                      <Link href="/admin/dashboard/services">
                          <a className="px-3 flex text-Black-text">
                              <Service className="w-6 h-6 my-auto"/>
                              <span className="font-bold text-base my-auto ml-2">
                                  My posts
                              </span>
                          </a>
                      </Link>
                  </div>
                  <div className="py-3 shadow-separator">
                      <Link href="/admin/dashboard/reviews">
                          <a className="px-3 flex text-Black-text">
                              <Review className="w-5 h-5 my-auto"/>
                              <span className="font-bold text-base my-auto ml-2">
                                  My reviews
                              </span>
                          </a>
                      </Link>
                  </div>
              </div>
      ) : (
    <div className="my-3">
      <SectionTitle> My Services </SectionTitle>
        <div>
          { products?.length === 0 ? 
              <div className="mt-4 overflow-hidden p-3">
                  <NoResultsFound />
              </div>
                : 
          <Swiper
            slidesPerView= {3}
            spaceBetween={25}
            freeMode={true}
          >
            {products?.map( (data, i) => (
              <SwiperSlide className="shadow-product rounded-md m-2 h-28 mobile:w-5/6 bg-white" key={i}>
                <div className="flex h-full">
                    <div className="w-1/3 h-full bg-cover bg-center rounded-tl-md rounded-bl-md mobile:w-2/4" style = {{background: `url("${data.photo[0].url}")`}}/>
                    <div className="w-2/3 text-center font-bold text-Black my-auto mobile:w-2/4">
                        <Link href= {`/marketplace/products/${data.slug}`} className="font-bold text-Black-text capitalize">
                            { data.name }
                        </Link>
                    </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
         }
        </div>
      </div>  
    )}
    </Layout>
  )
}

export default withAuth(Dashboard) 