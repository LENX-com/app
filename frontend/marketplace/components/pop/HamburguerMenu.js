import { Dialog, Transition } from '@headlessui/react'
import { useState, Fragment, useRef, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { AiOutlineClose, AiOutlineRight, AiFillShop, AiTwotoneShopping, AiOutlineThunderbolt, AiOutlineDollarCircle, AiOutlineMessage, AiOutlineBook, AiTwotoneSetting, AiOutlineLogout  } from "react-icons/ai";
import {HiOutlineTruck } from "react-icons/hi";
import {logout} from '@/redux/actions/authAction'
import {signout} from '@/redux/actions'
import { useSelector, useDispatch } from 'react-redux'
import { Carpenter, Plumber, Electrician, Handyman } from '@/marketplace/assets/icons'
import Button from '@/components/Buttons/Button'


const HamburguerMenu = ({ title, isOpen = false, setIsOpen }) => {
  let completeButtonRef1 = useRef(null);
  const dispatch = useDispatch();
  const { isAuthenticated } = useSelector(state => state.auth)
  const Router = useRouter()


  function closeModal() {
    setIsOpen(false)
  }
  
  function openModal() {
    setIsOpen(true)
  }

  const handleLogOut = () => {
        dispatch (logout())
        Router.push('/')
        setIsOpen(false)
    }

  const categories = [
     {
        icon: <Carpenter className="w-7 h-7"/>,
        link: "/marketplace/category/carpenter",
        name: "Carpenter"
      },
    {
        icon: <Plumber className="w-7 h-7"/>,
        link: "/marketplace/category/plumber",
        name:"Plumber"
    },
    {
        icon: <Electrician className="w-7 h-7"/>,
        link: "/marketplace/category/electrician",
        name:"Electrician"
    },
    {
        icon: <Handyman className="w-7 h-7"/>,
        link: "/marketplace/category/handyman",
        name:"Handyman"
    },
]

  return (
    <div>
        <div
            ref={completeButtonRef1}>
        </div>
          <Transition appear show={isOpen} as={Fragment}>
          <Dialog
            as="div"
            className="fixed inset-0 overflow-y-auto"
            style={{zIndex: '999'}} 
            onClose= { () => setIsOpen(false) }
            open= { isOpen }
            initialFocus={completeButtonRef1}
          >
            <div className="text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0"
                enterTo="opacity-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <Dialog.Overlay className="fixed inset-0 blur-lg bg-background bg-opacity-70" />
              </Transition.Child>

              {/* This element is to trick the browser into centering the modal contents. */}
              <span
                className="inline-block align-bottom"
                aria-hidden="true"
              >
                &#8203;
              </span>
            <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <div
                      className={` fixed h-full w-full max-w-lg overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl  overflow-y-scroll fill`}
                      >
                  <Dialog.Title
                    as="div"
                    className="border-b-2 border-Grey border-solid"
                  >
                    <div className="px-4 py-2 flex bg-background">  
                    <h2 className="text-lg font-medium leading-6 text-gray-900 mt-2"> {title} </h2>
                    <div onClick={ () => setIsOpen(false) } className="ml-auto text-xl text-white rounded-full p-2 bg-Black">
                        <AiOutlineClose  />
                    </div> 
                    </div> 
                  </Dialog.Title>

                  <div className="w-full">
                      <div className="pb-4 shadow-separator my-4">
                          <div className="px-3">
                                <div>
                                <h1 className="font-bold text" style={{color: "#8898aa"}}>
                                   FIND A PROFESSIONAL
                                </h1>
                                </div>
                                <div className="my-4">
                                    { categories.map( data => (
                                        <Link href= {data.link}
                                              onClick={() => setIsOpen(false)}
                                        >
                                            <div className="flex justify-between py-3">
                                                <div className="flex">
                                                    { data.icon}
                                                    <h2 className="text ml-2 font-bold text-Black-text my-auto"> {data.name} </h2>
                                                </div>
                                                <AiOutlineRight className="my-auto"/>
                                            </div>
                                        </Link>
                                    ))}
                                </div>
                          </div>
                      </div>
                      <div className="pb-4 shadow-separator my-4">
                          <div className="px-3">
                            <div>
                                <h1 className="font-bold text" style={{color: "#8898aa"}}>
                                    MARKETPLACE
                                </h1>
                            </div>
                            <div className="my-4 grid grid-cols-2 gap-4">

                                <Link href= {'/marketplace'}
                                      onClick={() => setIsOpen(false)}
                                >
                                    <div className="flex py-3">
                                        <div className="flex">
                                            <AiTwotoneShopping className=" my-auto w-7 h-7 text-Black-text"/>
                                            <h2 className="text ml-2 font-bold text-Black-text my-auto"> Services </h2>
                                        </div>
                                    </div>
                                </Link>
                                <Link href= {'/marketplace/stores'}
                                      onClick={() => setIsOpen(false)}
                                >
                                    <div className="flex py-3">
                                        <div className="flex">
                                            <AiFillShop className=" my-auto w-7 h-7 text-Black-text"/>
                                            <h2 className="text ml-2 font-bold text-Black-text my-auto"> Professionals </h2>
                                        </div>
                                    </div>
                                </Link>

                            </div>
                          </div>
                      </div>
                  </div>
                   <div className="my-4 grid grid-cols-1 gap-4 px-3 pb-6">
                    { !isAuthenticated ? 
                     ( <>
                        <Link href= {'/about'}
                              onClick={() => setIsOpen(false)}
                        >
                            <div className="flex py-3">
                                <div className="flex">
                                    <AiOutlineThunderbolt className=" my-auto w-5 h-5 text-Black-text"/>
                                    <h2 className="text ml-2 font-bold text-Black-text my-auto"> About Wabei </h2>
                                </div>
                            </div>
                        </Link>
                        <Link href= {'/marketplace/become-seller'}
                              onClick={() => setIsOpen(false)}
                        >
                            <div className="flex py-3">
                                <div className="flex">
                                    <AiOutlineDollarCircle className=" my-auto w-5 h-5 text-Black-text"/>
                                    <h2 className="text ml-2 font-bold text-Black-text my-auto"> Becomer a professional </h2>
                                </div>
                            </div>
                        </Link>
                        <Link href= {'/marketplace/stores'}
                              onClick={() => setIsOpen(false)}
                        >
                            <div className="flex py-3">
                                <div className="flex">
                                    <AiOutlineBook className=" my-auto w-5 h-5 text-Black-text"/>
                                    <h2 className="text ml-2 font-bold text-Black-text my-auto"> Blog </h2>
                                </div>
                            </div>
                        </Link>
                        <Link href= {'/marketplace/stores'}
                              onClick={() => setIsOpen(false)}
                        >
                            <div className="flex py-3">
                                <div className="flex">
                                    <AiOutlineMessage className=" my-auto w-5 h-5 text-Black-text"/>
                                    <h2 className="text ml-2 font-bold text-Black-text my-auto"> Support </h2>
                                </div>
                            </div>
                        </Link>
                        {/* <Link href= {'/shipping'}
                              onClick={() => setIsOpen(false)}
                        >
                            <div className="flex py-3">
                                <div className="flex">
                                    <HiOutlineTruck className=" my-auto w-5 h-5 text-Black-text"/>
                                    <h2 className="text ml-2 font-bold text-Black-text my-auto"> Find a professiona </h2>
                                </div>
                            </div>
                        </Link> */}
                </>
                    ) : (
                    <>
                         <Link href= {'/user/dashboard/settings'}
                              onClick={() => setIsOpen(false)}
                        >
                            <div className="flex py-3">
                                <div className="flex">
                                    <AiTwotoneSetting className=" my-auto w-5 h-5 text-Black-text"/>
                                    <h2 className="text ml-2 font-bold text-Black-text my-auto"> Settings </h2>
                                </div>
                            </div>
                        </Link>
                        <Link href= {'/marketplace/stores'}
                              onClick={() => setIsOpen(false)}
                        >
                            <div className="flex py-3">
                                <div className="flex">
                                    <AiOutlineBook className=" my-auto w-5 h-5 text-Black-text"/>
                                    <h2 className="text ml-2 font-bold text-Black-text my-auto"> Blog </h2>
                                </div>
                            </div>
                        </Link>
                        {/* <Link href= {'/shipping'}
                              onClick={() => setIsOpen(false)}
                        >
                            <div className="flex py-3">
                                <div className="flex">
                                    <HiOutlineTruck className=" my-auto w-5 h-5 text-Black-text"/>
                                    <h2 className="text ml-2 font-bold text-Black-text my-auto"> Find my order </h2>
                                </div>
                            </div>
                        </Link> */}
                        <Link href= {'/user/dashboard/chat'}
                              onClick={() => setIsOpen(false)}
                        >
                            <div className="flex py-3">
                                <div className="flex">
                                    <AiOutlineMessage className=" my-auto w-5 h-5 text-Black-text"/>
                                    <h2 className="text ml-2 font-bold text-Black-text my-auto"> Chat </h2>
                                </div>
                            </div>
                        </Link>
                        <Link href= {'/'}
                              onClick={() =>
                               signout(() => {
                                   Router.push('/')
                                   dispatch ({
                                       type: "LOGOUT",
                                       payload: null
                                   })
                               })
                             }            
                        >
                            <div className="flex py-3">
                                <div className="flex">
                                    <AiOutlineLogout  className=" my-auto w-5 h-5 text-Black-text"/>
                                    <h2 className="text ml-2 font-bold text-Black-text my-auto"> Sign Out </h2>
                                </div>
                            </div>
                        </Link>
                    </>
                )}
                </div>

                {  !isAuthenticated &&               
                    <div className="sticky block w-full bottom-0 px-3 text-center bg-background h-16">
                        <div className="mx-auto pt-2 relative h-full">
                            <Link href="/signin"
                                    onClick={ () => setIsOpen(false) }
                            >
                                <a className="bg-Blue rounded-full px-6 py-2 text text-white font-bold mx-auto text Center">
                                    Sign in
                                </a>
                            </Link>
                        </div>
                    </div>
                }

              </div>
              </Transition.Child>
              </div>
          </Dialog>
        </Transition>
    </div>
  )
}

export default HamburguerMenu