import React, { useState, useEffect } from "react";
import { useSelector, useDispatch, connect } from "react-redux";
import { Disclosure } from '@headlessui/react'
import withAuth from '@/components/auth'
import Layout from '@/dashboard/containers/Layout'
import Button from '@/components/Buttons/Button'
import { NotFound } from '@/marketplace/assets/icons'
import { Up } from '@/marketplace/assets/icons'
import moment from 'moment'
import SectionTitle from "@/components/Typography/SectionTitle";
import {
  Pagination,
} from "@windmill/react-ui";
import Link from 'next/link'
import { orderByUser } from "@/redux/actions/orderAction";


function MyOrders({ filterdIdlist }) {
  const dispatch = useDispatch();
  const {orders, count } = useSelector((state) => state.order.myOrders);
  const [orderPerPage] = useState(5);

  useEffect(() => {
    dispatch(orderByUser());
  }, [dispatch]);

  const subtotal = (products) => (
    products.reduce((acc, item) => acc + item.qty * item.price, 0).toFixed(1 )
  )

  return (
    <Layout>
       <SectionTitle>Purchase History</SectionTitle>
       {/* <SearchBar /> */}
       <div className="my-3">
       { !orders ? (
           "no result"
       ) : orders ? (
           <div className="border-box bg-white rounded-md">
           <div className=" p-3 bg-Grey">
               <div className="grid grid-cols-4 mobile:grid-cols-3 gap-4 rounded-t-md w-4/5">
               <div className="text-Black-text font-bold">
                   Brand
               </div>
               <div className="text-center text-Black-text font-bold mobile:hidden">
                   Subtotal £
               </div>
               <div className="text-center text-Black-text font-bold">
                   Date
               </div>
               <div className="text-center text-Black-text font-bold">
               Status
               </div>
           </div>
           </div>
           { !orders.length ? 
               <div className="mb-4 mx-auto">
               <div className="m-auto text-center">
                   <NotFound className="text-center mx-auto my-2 w-12 h-12"/>
                   <span className="font-bold "> No orders </span>
               </div>
               </div>
               :
               orders.map((h, i) => (
                   <div className="shadow-separator bg-white text-Black-text">
                   <Disclosure>
                       {({open}) => (
                       <>
                       <Disclosure.Button className="py-2 flex justify-between w-full">
                           <div className="grid grid-cols-4 mobile:grid-cols-3 gap-4 w-4/5">
                           <div className="flex mobile:block">
                               <section className="h-12 w-12 bg-cover bg-center rounded-md shadow-button cursor-pointer" style={{background: `url("${h.manufacturerId.avatar}")`}}/>
                               <div className="my-auto ml-3 mobile:m-auto text-Black-text font-bold capitalize mobile:text-left"> {h.manufacturerId.name} </div>
                           </div>
                           <div className="m-auto mobile:hidden text font-bold">
                               £{subtotal(h.products)}
                           </div>
                           <div className="m-auto text">
                               {moment(h.date).format("MMM Do YY")}
                           </div>
                           <div className="m-auto text">
                               {h.status}
                           </div>
                           </div>
                           <div className="bg-Grey-dashboard rounded-full p-1 hover:bg-Grey-hover">
                               <Up
                                   className={`${
                                   open ? '' : 'transform rotate-180'
                               } text-lg text-Black-medium m-auto font-bold`}
                               />
                           </div>
                       </Disclosure.Button>
                       <Disclosure.Panel className="text-Black-text p-3">
                           <table class="table-auto">
                           <thead>
                               <tr>
                               <th class="w-1/2 font-bold text">Products</th>
                               <th class="w-1/4 font-bold text">Quantity</th>
                               <th class="w-1/4 font-bold text">Price</th>
                               </tr>
                           </thead>
                           { h.products.map( data => 
                           <tbody>
                               <tr>
                               <td className="m-auto border border-Grey-dashboard px-4 py-2 ">
                                   <div className="m-auto text-center mobile:text-auto">
                                   <section className="h-12 w-12 bg-cover bg-center rounded-md shadow-button cursor-pointer mx-auto" style={{background: `url("${data.product?.photo[0].url}")`}}/>
                                   <span className="capitalize text-sm"> { data.name } </span>
                                   </div>
                               </td>
                               <td className="m-auto  border border-Grey-dashboard px-4 py-2 text "> { data.qty } </td>
                               <td className=" border border-Grey-dashboard px-4 py-2 font-bold text "> £{data.price} </td>
                               </tr>
                           </tbody>

                           )}
                           </table>
                           <div className="my-2">
                           <Link href={`/user/dashboard/my-orders/${h._id}`}>
                               <Button className="font-bold text-Black-text text-sm"> See order </Button>
                           </Link>
                           </div>
                       </Disclosure.Panel>
                       </>
                       )}
                   </Disclosure>
                   
               </div>

               ))}
               <div className="px-3 py-1">
               <Pagination
                   totalResults={count ? count : 0}
                   resultsPerPage={10}
                   onChange={() => {}}
                   label="Page navigation"
                   />
               </div>
           </div>
       ) : (
           <h1>No orders yet</h1>
       )}
                       

       </div>
    </Layout>
  );
}

export default withAuth(MyOrders);
