import React, { useState, useEffect, useRef } from 'react'
import InfoCard from '@/admin/components/Cards/InfoCard'
import SectionTitle from '@/admin/components/Typography/SectionTitle'
import { Service } from '@/admin/icons'
import RoundIcon from '@/admin/components/RoundIcon'
import withAuth from '@/components/auth'
import Link from 'next/link'
import { AiOutlineUser, AiOutlineMessage, AiOutlinePlusSquare } from 'react-icons/ai'
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
import Listbox from '@/admin/components/Listbox/Listbox'

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

  return (
    <Layout>
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
      <>
      <section style={{background: `url('https://images.unsplash.com/photo-1595853035070-59a39fe84de3?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=3925&q=80')`, width: "100vw"}} className="h-40 bg-cover bg-center relative">
          <div className="Center w-full">
            <div
                className="bg-cover bg-center shadow-button h-20 w-20 rounded-sm bg-white m-auto"
                style={{backgroundImage: 'url("https://http2.mlstatic.com/D_Q_NP_871989-MLA25801430807_072017-T.webp")'}} />
            <div className="text-center">
              <h1 className="font-bold text-lg mt-1"> Cooperative </h1>
            </div>
          </div>
      </section>
      {/* <!-- Cards -->
      <div className="grid gap-6 mb-8 md:grid-cols-2 xl:grid-cols-4">
        <InfoCard title="Total clients" value="6389">
          <RoundIcon
            icon={PeopleIcon}
            iconColorClass="text-orange-500 dark:text-orange-100"
            bgColorClass="bg-orange-100 dark:bg-orange-500"
            className="mr-4"
          />
        </InfoCard>

        <InfoCard title="Account balance" value="$ 46,760.89">
          <RoundIcon
            icon={MoneyIcon}
            iconColorClass="text-green-500 dark:text-green-100"
            bgColorClass="bg-green-100 dark:bg-green-500"
            className="mr-4"
          />
        </InfoCard>

        <InfoCard title="New sales" value="376">
          <RoundIcon
            icon={CartIcon}
            iconColorClass="text-blue-500 dark:text-blue-100"
            bgColorClass="bg-blue-100 dark:bg-blue-500"
            className="mr-4"
          />
        </InfoCard>

        <InfoCard title="Pending contacts" value="35">
          <RoundIcon
            icon={ChatIcon}
            iconColorClass="text-teal-500 dark:text-teal-100"
            bgColorClass="bg-teal-100 dark:bg-teal-500"
            className="mr-4"
          />
        </InfoCard>
      </div> */}

    <div className="my-3">
      <SectionTitle> Customers </SectionTitle>
      <TableContainer>
        <Table>
          <TableHeader>
            <tr>
              <TableCell>Client</TableCell>
              <TableCell>Amount</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Date</TableCell>
            </tr>
          </TableHeader>
          <TableBody>
            {data.map((user, i) => (
              <TableRow key={i}>
                <TableCell>
                  <div className="flex items-center text-sm">
                    <Avatar className="hidden mr-3 md:block" src={user.avatar} alt="User image" />
                    <div>
                      <p className="font-semibold">{user.name}</p>
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <span className="text-sm">$ {user.amount}</span>
                </TableCell>
                <TableCell>
                  <Badge type={user.status}>{user.status}</Badge>
                </TableCell>
                <TableCell>
                  <span className="text-sm">{new Date(user.date).toLocaleDateString()}</span>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <TableFooter>
          <Pagination
            totalResults={totalResults}
            resultsPerPage={resultsPerPage}
            label="Table navigation"
            onChange={onPageChange}
            />
        </TableFooter>
      </TableContainer>
      </div>
    </>
    )}
    </Layout>
  )
}

export default withAuth(Dashboard) 