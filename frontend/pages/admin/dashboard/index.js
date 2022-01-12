import React, { useState, useEffect, useRef } from 'react'
import InfoCard from '@/admin/components/Cards/InfoCard'
import SectionTitle from '@/admin/components/Typography/SectionTitle'
import { Service } from '@/admin/icons'
import RoundIcon from '@/admin/components/RoundIcon'
import withAuth from '@/components/auth'
import Link from 'next/link'
import { AiOutlineUser, AiOutlineMessage, AiOutlinePlusSquare } from 'react-icons/ai'
import UserCard from '@/admin/components/Cards/UserCard'
import { Order } from '@/marketplace/assets/icons'
import { data as table } from '@/admin/utils/demo/tableData'
import Layout from '@/admin/containers/Layout'
import { useMediaQuery } from 'react-responsive'
import {
  TableBody,
  TableContainer,
  Table,
  TableHeader,
  TableCell,
  TableRow,
  TableFooter,
  Avatar,
  Badge,
  Pagination,
} from '@windmill/react-ui'
import { useSelector } from 'react-redux'

function Dashboard() {
  const [page, setPage] = useState(1)
  const [data, setData] = useState([])
  const isTabletOrMobile = useMediaQuery({ query: '(max-width: 768px)' })


  // pagination setup
  const resultsPerPage = 10
  const totalResults = table.length

  // pagination change control
  function onPageChange(p) {
    setPage(p)
  }

  // on page change, load new sliced data
  // here you would make another server request for new data
  useEffect(() => {
    setData(table.slice((page - 1) * resultsPerPage, page * resultsPerPage))
  }, [page])

  const { user, isAuthenticated }  = useSelector( state => state.auth);

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
              </div>
      ) : (
    <div className="my-3">
      <SectionTitle> My Services </SectionTitle>
        <div>

        </div>
      </div>  
    )}
    </Layout>
  )
}

export default withAuth(Dashboard) 