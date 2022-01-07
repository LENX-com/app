import React, { useContext, useState, useRef } from 'react'
import {useSelector} from "react-redux"
import { SidebarContext } from '../context/SidebarContext'
import {
  BellIcon,
  MenuIcon,
  OutlinePersonIcon,
  OutlineCogIcon,
  OutlineLogoutIcon,
} from '../icons'
import { AiFillCaretDown, AiTwotoneSetting, AiOutlineRight, AiOutlineUser, AiOutlineLogout, AiFillMessage, AiOutlineExpand } from 'react-icons/ai'
import SearchBar from './elements/SearchBar'
import { Avatar, Badge,Dropdown, DropdownItem, Input } from '@windmill/react-ui'
import SectionTitle from './Typography/SectionTitle'
import '../assets/css/Header.scss'
import { NavLink, useRouteMatch, Redirect, Link, withRouter, useLocation } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import {signout} from '../../actions'
import _ from 'lodash'
  
const Header = ( props, { history} ) => {
  const auth = useSelector(state => state.auth)
  const { user } = auth
  const { path } = useRouteMatch();
  const dispatch = useDispatch(); 
  const MAX_LENGTH = 30
  const chatArray = new Array(10).fill(10)
  const dummyText = "lorem ipsum loem pasert tusumeric"
  const location = useLocation();
 
  // const { mode, toggleMode } = useContext(WindmillContext)

  const { toggleSidebar } = useContext(SidebarContext)

  const [isNotificationsMenuOpen, setIsNotificationsMenuOpen] = useState(false)
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false)

  function handleNotificationsClick() {
    setIsNotificationsMenuOpen(true)
  }

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

  return (
    <header className=" dashboard-header z-40 py-4 bg-white shadow-bottom dark:bg-gray-800 relative h-16">
      <div className="container flex items-center justify-between h-full px-6 mx-auto text-purple-600 dark:text-purple-300">

        {/* <!-- Mobile hamburger --> */}
        <div className="lg:hidden">
          <button
            className="p-1 mr-5 -ml-1 rounded-md lg:hidden focus:outline-none focus:shadow-outline-purple"
            onClick={toggleSidebar}
            aria-label="Menu"
          >
            <MenuIcon className="w-6 h-6" aria-hidden="true" />
          </button>
        </div>
        <div className="mobile:right-2 mobile:top-2 flex absolute right-4 top-3">

          {/* If the location is in chat do not display the chat notification in header */}
          { !location.pathname.includes("/admin/dashboard/chat") &&
            <div className="relative my-auto mr-3">
              <button
                className="relative align-middle bg-Grey-dashboard p-2 rounded-full"
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

              <Dropdown
                align="right"
                isOpen={isNotificationsMenuOpen}
                onClose={_.debounce(() => setIsNotificationsMenuOpen(false))}
                className="w-96 overflow-y-scroll"
                style={{height: chatArray.length !== 0 && "70vh"}}
              >
              {chatArray.length !== 0 || undefined ? 
              <>
                <div className="flex justify-between px-3 mt-3 ">
                  <div>
                    <SectionTitle> Messages </SectionTitle>
                  </div>
                  <Link to="/admin/dashboard/chat">
                    <div className="cursor-pointer">
                      <AiOutlineExpand className="my-auto text-lg "/>
                    </div>
                  </Link>
              </div>
                <Input placeholder="Search for chats" className="p-3 bg-Grey-dashboard rounded-lg mb-3"/>
                {chatArray?.map(data => (   
                    <DropdownItem tag="div" className="py-4">
                      <div className="flex">
                        <div className="my-auto mr-3">
                          <Avatar size="large" src={user.avatar}/>
                        </div>
                        <div>
                          <div className="font-bold text-Black"> Pedro  </div>
                          <div className="flex text-Black-medium"> {dummyText.substring(0, MAX_LENGTH)} {dummyText.length > MAX_LENGTH ? "..." : ""} <span className="my-auto ml-3"> 3d </span> </div>
                        </div>
                      </div>
                    </DropdownItem>
                ))}
              </>
              :
              <NoResultsFound /> 
              }

              </Dropdown>
            </div>
          }
          

          
          {/* <!-- Profile menu --> */}  
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
                src={auth.user.avatar}
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
                  <Link to={`${path}/profile`}>
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
                <Link to={`${path}/settings`} className="text-base font-bold my-auto">Settings</Link>
              </div>
                <AiOutlineRight className="text-Black my-auto text-lg"/>
              </DropdownItem>
              <DropdownItem tag="div" className="justify-between">
                <Link className="flex" to={`${path}/faq`}>
                  <div className="bg-Grey-dashboard p-2 rounded-full mr-3">
                    <AiOutlineUser className="text-xl text-Black" />
                  </div>
                  <div className="text-base font-bold my-auto"> FAQ </div>
                </Link>
                <AiOutlineRight className="text-Black my-auto text-lg"/>
              </DropdownItem>
              {auth.isAuthenticated && (
              <DropdownItem
               className="justify-between"
               onClick={() =>
                            signout(() => {
                                <Redirect to="/" />
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
                <Link to="" className="text-base font-bold my-auto">Log out</Link>
              </div>
                 <AiOutlineRight className="text-Black my-auto text-lg"/>
              </DropdownItem>
              )}
            </Dropdown>

          </div>
        </div>
      </div>
    </header>
  )
}

const HeaderComponent = withRouter(Header)

export default HeaderComponent

