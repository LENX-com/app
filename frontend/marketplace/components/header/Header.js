import React, { useState, useRef, useEffect, useMemo, useContext } from "react";
import logo from "@/marketplace/assets/logoNew.png";
import { NavLink } from '@/components/NavLink/NavLink'
import Link from 'next/link'
import Image from 'next/image'
import {useRouter} from 'next/router'
import Button from '@/components/Buttons/Button'
import { Avatar, Badge,Dropdown, DropdownItem, Input } from '@windmill/react-ui'
import SectionTitle from '@/components/Typography/SectionTitle'
import {signout} from '@/redux/actions'
import { SignInContext } from '@/context/SignInContext'
import {HiOutlineTruck } from "react-icons/hi";
import { getCategories } from '@/redux/actions/categoryAction'
import { useDispatch, useSelector } from "react-redux";
import SignInPop from '../auth/SignInPop'
import { AiOutlineHome, 
          AiOutlineShop, 
          AiFillCaretDown, 
          AiTwotoneSetting, 
          AiOutlineRight, 
          AiOutlineUser, 
          AiOutlineLogout, 
          AiFillMessage, 
          AiOutlineExpand, 
          AiOutlineCrown, 
          AiOutlineDollarCircle, 
          AiOutlineDashboard, 
          AiOutlineMenu }  from "react-icons/ai"
import axios from 'axios'
import moment from 'moment'
import { useMediaQuery } from 'react-responsive'
import NotFound from '../../assets/icons/NotFound.svg'
import HamburguerMenu from '../pop/HamburguerMenu'
import { API } from '@/config/config'
import { api } from "@/utils/api";
import _ from 'lodash'

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const Router = useRouter();
  const { isAuthenticated, user } = useSelector(state => state.auth)
  const {page, pathID, conversations} = useSelector( state => state.chat);
  const MAX_LENGTH = 30
  const isTabletOrMobile = useMediaQuery({ query: '(max-width: 768px)' })
  const chatArray = new Array(10).fill(10)

  //context provider for sign in pop
  const { OpenSign, closeSidebar, toggleSidebar } = useContext(SignInContext)

  const [isNotificationsMenuOpen, setIsNotificationsMenuOpen] = useState(false)
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false)
  const [ isMobileMenu, setIsMobileMenu ] = useState(false)

  function handleNotificationsClick() {
    setIsNotificationsMenuOpen(true)
  }

  useEffect(() => {
    dispatch(getCategories())
  }, [])

  const dispatch = useDispatch();

  const closeMenu = () => {
       setIsProfileMenuOpen(false)
    }
  const NoResultsFound = () => (
    <div>
      <div className="text-center my-2 text-lg">
      You have no chats available
      </div>
      <AiFillMessage className="m-auto text-2xl" />
    </div>
  )
  
  
  useEffect(() => {
    if(user){
    const getConversations = async (user) => {
      try {
        const res = await api.get(`${API}/conversation/` + user);
        dispatch({
                    type: "CONVERSATION",
                    payload: res.data,
                    })
      } catch (err) { 
        console.log(err);
      }
    };
    setTimeout( () => getConversations(user?._id), 200);
    }
  }, [user && user]);

  console.log({isTabletOrMobile})

  return (
    <header className="bg-Black shadow-button w-full px-3 sticky top-0" style={{height:"64px", zIndex:"500"}}>
      <div className="lg:w-5/6 m-auto">
      { !isTabletOrMobile ?
        <div className="Center" style={{height:"64px"}}>
          <div className="my-auto">
            <div className="grid grid-cols-4 gap-6" style={{height:"64px"}}>
              <div className="text-Grey hover:bg-lightBlack px-3 rounded-md my-1"> 
                <NavLink exact href="/" className="p-2 justify-center font-bold text-center cursor-pointer flex h-full" activeClassName=" border-b-2 border-orange text-orange " >
                  <AiOutlineHome className="w-7 h-7 my-auto" />
                </NavLink>
              </div>
            <div className="text-Grey hover:bg-lightBlack px-3 rounded-md my-1">
                <NavLink href="/marketplace" className="p-2 justify-center font-bold text-center cursor-pointer flex h-full" activeClassName=" border-b-2 border-orange text-orange" >
                  <AiOutlineShop className="w-7 h-7 my-auto" />
                </NavLink>
              </div>
              <div className="text-Grey hover:bg-lightBlack px-3 rounded-md my-1">
                <NavLink href="/user/dashboard" className="p-2 justify-center font-bold text-center cursor-pointer flex h-full" activeClassName=" border-b-2 border-orange text-orange" >
                  <AiOutlineDashboard className="w-7 h-7 my-auto" />
                </NavLink>
              </div>
            </div>
          </div>
        </div>
      :
      null  
    }
        
        <div className=" flex justify-between">
          <div className="w-36 mt-2 cursor-pointer">
            <Link className="cursor-pointer" href="/">
              <Image src={logo} alt="logo"/>
            </Link>
          </div>

          { isAuthenticated ? 
          
          ( <div className="lg:relative my-auto mr-3 flex">
            <div> 
              <button
                  className="relative align-middle p-2 rounded-full mt-2"
                  style={{background: '#eee'}}
                  onClick={handleNotificationsClick}
                  aria-label="Notifications"
                  aria-haspopup="true"
              >
                  <AiFillMessage className="w-5 h-5 text-Black-medium" aria-hidden="true" />
                  {/* <!-- Notification badge --> */}
                  <span
                    aria-hidden="true"
                    className="absolute top-0 right-0 inline-block w-3 h-3 transform translate-x-1 -translate-y-1 bg-Blue border-2 border-white rounded-full dark:border-gray-800"
                  ></span>
                </button>
              </div>

                  <div className="mr-2">
                    <Dropdown
                      align="right"
                      isOpen={isNotificationsMenuOpen}
                      onClose={_.debounce(() => setIsNotificationsMenuOpen(false))}
                      className="w-96 overflow-y-scroll z-50 mobile:w-full mobile:mt-10"
                      style={{height: chatArray.length !== 0 && "70vh"}}
                    >
                    {chatArray.length !== 0 || undefined ? 
                    <>
                      <div className="flex justify-between px-3 mt-3 ">
                        <div>
                          <SectionTitle> Messages </SectionTitle>
                        </div>
                        <Link href="/user/dashboard/chat">
                          <div className="cursor-pointer">
                            <AiOutlineExpand className="my-auto text-lg "/>
                          </div>
                        </Link>
                    </div>
                      {/* <Input placeholder="Search for chats" className="p-3 bg-Grey-dashboard rounded-lg mb-3"/> */}
                      {conversations !== undefined && conversations?.length !== 0 ? 
                       
                       ( conversations.map((data, i) => (   
                          <DropdownItem tag="div" className="py-4 relative" key={i}>
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
                                <div className="font-bold text-Black capitalize"> {user._id === data.members[0]._id ? data.members[1].name : data.members[0].name } </div>
                                <div className="flex text-Black-medium justify-between w-full">
                                  <div>
                                    {data.lastMessage.substring(0, MAX_LENGTH)} {data.lastMessage.length > MAX_LENGTH ? "..." : ""} 
                                  </div> 
                                  <div className="my-auto ml-3"> {moment(data.updatedAt).format('LT')} </div> 
                                </div>
                              </div>
                            </div>
                            </Link>
                          </DropdownItem>
                      ))
                    ) : (
                      <div className="mb-4 mx-auto">
                         <div className="m-auto text-center">
                             <NotFound className="text-center mx-auto my-2"/>
                             <span className="font-bold capitalize"> Sorry there are no chats available </span>
                         </div>
                     </div>
                    )
                    }
                    </>
                    :
                    <NoResultsFound /> 
                    }

                    </Dropdown>
                  </div>

                    {/* Show different menu hamburgue if mobile screen, otherwise, menu for profile */}
                  { isTabletOrMobile ?
                  ( 
                    <div className="my-auto">
                    <button onClick={ () =>  setIsMobileMenu( !isMobileMenu )}>
                      <AiOutlineMenu className="text-Grey w-6 h-6 my-auto"/>
                    </button>
                      <HamburguerMenu isOpen={isMobileMenu} setIsOpen={setIsMobileMenu} />
                    </div>
                  ) : (
                    
                  <div>
                    <div className="relative">
                      <button
                        className="rounded-full focus:shadow-outline-purple focus:outline-none flex"
                        style= {{background:"#eff2f5"}}
                        onClick={() => setIsProfileMenuOpen(true) }
                        aria-label="Account"
                        aria-haspopup="true"
                      >
                        <Avatar
                          className="align-middle"
                          src={user.avatar}
                          alt=""
                          aria-hidden="true"
                        />
                        <div className="my-auto px-2 text-Black-medium font-bold"> { user.name }  </div>
                        <AiFillCaretDown  className="my-auto text-Black"/>
            
                      </button>
                      <Dropdown
                        align="right"
                        isOpen={isProfileMenuOpen}
                        onClose={_.debounce(() => setIsProfileMenuOpen(false))}
                        className="lg:w-72"
                      >
                        <DropdownItem tag="div" className="my-2 shadow-separator ">
                            <Link href={`/user/dashboard/profile`}>
                              <div className="flex">
                              <Avatar size="large" src={ user.avatar } className="mr-2 my-2"/>
                              <div>
                                <div className="text-lg font-bold text-Black"> 
                                  {user.name}
                                </div>
                                <div className="text-base text-Black-medium">
                                  See your profile
                                </div>
                              </div>
                              </div>
                            </Link>
                        </DropdownItem>
                        <DropdownItem tag="div" className="justify-between">
                        <div className="flex">
                          <div className="bg-Grey-dashboard p-2 rounded-full mr-3">
                            <AiTwotoneSetting className="text-xl text-Black" />
                          </div>
                          <Link href={`/user/dashboard/settings`} className="text-base font-bold my-auto">
                            <div className="text-base font-bold my-auto">
                              Settings
                            </div>
                          </Link>
                        </div>
                          <AiOutlineRight className="text-Black my-auto text-lg"/>
                        </DropdownItem>
                        <DropdownItem tag="div" className="justify-between">
                          <Link href={`/marketplace/faq`}>
                            <a className="flex">
                              <div className="bg-Grey-dashboard p-2 rounded-full mr-3">
                                <AiOutlineUser className="text-xl text-Black" />
                              </div>
                              <div className="text-base font-bold my-auto"> FAQ </div>
                            </a>
                          </Link>
                          <AiOutlineRight className="text-Black my-auto text-lg"/>
                        </DropdownItem>
                        <DropdownItem tag="div" className="justify-between">
                          <Link href={`/shipping`}>
                            <a className="flex">
                              <div className="bg-Grey-dashboard p-2 rounded-full mr-3"> 
                                <HiOutlineTruck className="text-xl text-Black" />
                              </div>
                              <div className="text-base font-bold my-auto"> Find my order </div>
                            </a>
                          </Link>
                          <AiOutlineRight className="text-Black my-auto text-lg"/>
                        </DropdownItem>
                        {isAuthenticated && (
                        <DropdownItem
                        className="justify-between"
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
                        <div className="flex">
                          <div className="bg-Grey-dashboard p-2 rounded-full mr-3">
                            <AiOutlineLogout className="text-Black my-auto text-lg" />
                          </div>
                          <Link href="/" className="text-base font-bold my-auto">
                            <div className="text-base font-bold my-auto">
                              Log out
                            </div>
                          </Link>
                        </div>
                          <AiOutlineRight className="text-Black my-auto text-lg"/>
                        </DropdownItem>
                        )}
                      </Dropdown>
                  </div>
                

              </div>
                  )}
            </div>
          ) : (
            <div className="h-auto my-auto flex">
              <div className="mr-3">
                <Button className="my-auto bg-orange text-white" onClick={toggleSidebar}>
                  Log in
                </Button>
              </div>
              { !isTabletOrMobile ?
              ( 
                <div className="relative my-auto">
                      <button
                        className="rounded-full focus:shadow-outline-purple focus:outline-none flex mt-1"
                        style= {{background:"#eff2f5"}}
                        onClick={() => setIsProfileMenuOpen(true) }
                        aria-label="Account"
                        aria-haspopup="true"
                      >
                        <AiFillCaretDown  className="my-auto text-Black"/>
            
                      </button>
                      <Dropdown
                        align="right"
                        isOpen={isProfileMenuOpen}
                        onClose={_.debounce(() => setIsProfileMenuOpen(false))}
                        className="lg:w-72"
                      >
                        <DropdownItem tag="div" className="justify-between">
                        <div className="flex">
                          <div className="bg-Grey-dashboard p-2 rounded-full mr-3">
                            <AiOutlineCrown className="text-xl text-Black" />
                          </div>
                          <Link href={`/about`} className="text-base font-bold my-auto"> 
                            <div className="text-base font-bold my-auto">
                              About Wabei
                            </div> 
                          </Link>
                        </div>
                          <AiOutlineRight className="text-Black my-auto text-lg"/>
                        </DropdownItem>
                        <DropdownItem tag="div" className="justify-between">
                          <Link href={`/marketplace/faq`}>
                            <a className="flex">
                              <div className="bg-Grey-dashboard p-2 rounded-full mr-3">
                                <AiOutlineUser className="text-xl text-Black" />
                              </div>
                              <div className="text-base font-bold my-auto"> FAQ </div>
                            </a>
                          </Link>
                          <AiOutlineRight className="text-Black my-auto text-lg"/>
                        </DropdownItem>
                        <DropdownItem tag="div" className="justify-between">
                          <Link href={`/marketplace/become-seller`}>
                            <a className="flex">
                              <div className="bg-Grey-dashboard p-2 rounded-full mr-3"> 
                                <AiOutlineDollarCircle className="text-xl text-Black" />
                              </div>
                              <div className="text-base font-bold my-auto"> Become a seller </div>
                            </a>
                          </Link>
                          <AiOutlineRight className="text-Black my-auto text-lg"/>
                        </DropdownItem>
                       <DropdownItem tag="div" className="justify-between">
                          <Link href={`/shipping`}>
                            <a className="flex">
                              <div className="bg-Grey-dashboard p-2 rounded-full mr-3"> 
                                <HiOutlineTruck className="text-xl text-Black" />
                              </div>
                              <div className="text-base font-bold my-auto"> Find my order </div>
                            </a>
                          </Link>
                          <AiOutlineRight className="text-Black my-auto text-lg"/>
                        </DropdownItem>
                      </Dropdown>
                  </div>
              ) : (
                  <div className="my-auto">
                    <button onClick={ () =>  setIsMobileMenu( !isMobileMenu )}>
                      <AiOutlineMenu className="text-Grey w-6 h-6 my-auto"/>
                    </button>
                      <HamburguerMenu isOpen={isMobileMenu} setIsOpen={setIsMobileMenu} />
                  </div>
              )
              }
            </div>

            

          )
              }
          </div>
          {!isAuthenticated && <SignInPop isOpen={ OpenSign} />}
      </div>
    </header>
  );
} 