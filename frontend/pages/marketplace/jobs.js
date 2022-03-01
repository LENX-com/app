import React, { useEffect, useState, useMemo, Fragment, memo } from "react";
import { useDispatch, useSelector } from "react-redux";
import StoreCard from "@/marketplace/components/stores/StoreCard";
import CategorySlider from "@/marketplace/components/stores/CategorySlider";
import SectionTitle from '@/components/Typography/SectionTitle'
import { getCategories } from "@/redux/actions/categoryAction";
import { getJobs } from "@/redux/actions/jobsAction";
import NavBar from '@/marketplace/components/navBar/NavBar'
import { NavLink } from '@/components/NavLink/NavLink'
import Layout from '@/containers/Layout'
import { MdHandyman } from 'react-icons/md'
import Link from 'next/link'
import { useRouter } from 'next/router'
import parse from 'html-react-parser'
import { useMediaQuery } from 'react-responsive'
import Button from '@/components/Buttons/Button'
import { NotFound } from '@/marketplace/assets/icons'
import { getAllManufacturer } from "@/redux/actions/userActions";
import { AiTwotoneShopping, AiFillShop, AiOutlineSearch, AiFillCar, AiOutlineDown, AiOutlineClose } from 'react-icons/ai'
import Up from '@/marketplace/components/pop/PopUp'
import {  Pagination } from "@windmill/react-ui";

const Stores = () => {
  const MAX_LENGTH = 50
  const categories = useSelector((state) => state.category.categories);
  const { jobs, count } = useSelector((state) => state.jobs.jobs);
  const { user, isAuthenticated } = useSelector((state) => state.auth);
  const [orderPerPage] = useState(5);
  const dispatch = useDispatch();
  const [ brand, setBrand ] = useState(false)
  const [ parameter, setParameter ] = useState("")
  const [ isOpen, setIsOpen ] = useState(false)
  const [ category, setCategory ] = useState("")
  const [ value, setValue ] = useState("")
  const [ pagination, setPagination ] = useState(false)
  const [ brandss, setBrandss ] = useState(false)
  const isTabletOrMobile = useMediaQuery({ query: '(max-width: 768px)' })

  console.log("jobs", jobs)

    const categoriesStyle = {
        display: "inline-block",
        fontSize: "12px",
        lineHeight: "12px",
        fontWeight: "200",
        textTransform: "uppercase",
        letterSpacing: ".1em",
        background: "#e6e6dd",  
        borderRadius: "4px",
        padding: "0.4em 1em",
        marginRight: "0.6em",
        marginBottom: "0.6em",
    }

  let location = typeof window !== 'undefined' && window.location.search
  const resultsPerPage = 1

  const Router = useRouter();

  useEffect(() => {
    dispatch(getCategories());
    dispatch( getJobs());
     dispatch(getCategories());
  }, []);

  const handleProfile = React.useCallback((data) => {
    setBrand(data)
    setTimeout(
      setIsOpen(true)
    , 300)
  }, [brand])

  const handleCategory = React.useCallback((data) => {
    setCategory(data)
    Router.push(`?search=${value ? value : "" }&category=${data}`)
    setTimeout( 
      () => dispatch(getJobs(0, `?search=${value ? value : "" }&category=${data}`))
    , 300)
  }, [category])

const handleSearch = React.useCallback((e) => {
  Router.push(`?search=${e.target.value}&category=${category}`)
  setValue(e.target.value)
}, [value])

const handlePagination = (value) => {
    setPagination(value - 1)
    setTimeout( 
      () => dispatch( getJobs(value - 1, location.search))
    , 300)
  };

  const handleSubmit = (e) => {
   e.preventDefault()
   dispatch( getJobs(0, location)) 
  }
  
  const handleFilters = () => {
    setValue("")
    setCategory("")
    Router.push(`?search=${""}&category=${""}`)
    dispatch( getJobs());
  }

  return (
    <Layout>
      <div className="lg:grid lg:grid-cols-8">
      { !isTabletOrMobile &&
        <div className="lg:col-span-2">
            <NavBar>
                <form onSubmit= { handleSubmit }>
                <div className="shadow-separator pb-4">
                  <div className="text-center">
                    <SectionTitle> Marketplace </SectionTitle>
                  </div>
                  <div className="px-3 mb-4">
                    <div className="flex bg-Grey-dashboard rounded-lg px-3 py-1 border-box">
                        <AiOutlineSearch className="my-auto ml-1  text-Black-medium"/>
                        <input 
                              className="bg-Grey-dashboard focus:outline-none focus:border-purple-50 " 
                              value= { value } 
                              placeholder= "Search Jobs" 
                              onChange= { handleSearch } 
                        />
                    </div>
                    { (value || category) && 
                        <button 
                                className=" text-white px-3 py-1 text-sm flex rounded-md my-3 bg-Black-text"
                                type="button"
                                onClick= { handleFilters }        
                        >
                          Clear filters
                          <AiOutlineClose className="my-auto ml-2" />
                        </button>
                    }
                    </div>
                </div>
                <div className="mt-3">
                    <div className="text-center">
                      <SectionTitle> Filter by category </SectionTitle>
                        <div className="px-3">
                            <div>
                                {categories?.map( data => 
                                    <div className= {`p-3 rounded-md flex hover:bg-Grey-hover cursor-pointer my-1 ${category === data.id && "bg-Grey-hover"}`}
                                        onClick={() => handleCategory(data.id)}
                                        key= { data.id }
                                    >
                                        <div className="rounded-full bg-Grey-dashboard p-2">
                                            <AiFillCar className="m-auto"/>
                                        </div>
                                        <span className="font-bold text-base my-auto ml-2 text-Black capitalize">
                                            { data.name }
                                        </span>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
                <div className="px-3 text-center">
                    <Button type="submit" className="text font-bold text-Black-text py-1 px-3"> Apply filter </Button>
                </div>
                </form>
                        
            </NavBar>
        </div>
      }

       <div className="mobile:ml-0 lg:col-span-5 mobile:mt-3 lg:mt-6">
        <div className="bar">
          <div className="grid grid-cols-2 max-w-sm">
            <div className="text-Black-medium">
            <NavLink exact href="/marketplace" className="p-2 border-b-2 justify-center font-bold text-center cursor-pointer flex "  activeClassName="border-orange text-orange" >
                  <MdHandyman className="my-auto w-5 h-5 mr-1" />
                  Search professionals
            </NavLink>
            </div>

            <div className="text-Black-medium">
            <NavLink href="/marketplace/jobs" className="p-2 border-b-2 justify-center font-bold text-center cursor-pointer flex "  activeClassName="border-orange text-orange" >
                <AiTwotoneShopping className="my-auto h-5 w-5 mr-1"/>
                Search jobs
              </NavLink>
            </div>
          </div>

      { isTabletOrMobile &&
        <>
          <div className="my-3">
            <CategorySlider 
              categories= { categories } 
              handleCategory= { handleCategory } 
              category= { category }
            />
          </div>
          <div className="px-3 mb-4">
              <div className="flex bg-white rounded-lg px-3 border-box relative">
                <input className="bg-white focus:outline-none focus:border-purple-50 py-1 w-full " value={value} placeholder="Search Stores" onChange= {handleSearch} />
                <button className=" absolute right-0 top-0 bg-Blue" style={{height:"34px", borderRadius: "12px 12px 12px 12px"}}
                        onClick={handleSubmit}
                >
                  <AiOutlineSearch className="my-auto ml-1  text-white text-xl"/>
                </button>
              </div>
              { (value || category) &&
                <button className="bg-lightBlack text-white px-3 py-1 text-sm flex rounded-md my-3"
                        type="button"
                        onClick={handleFilters}        
                >
                  Clear filters
                  < AiOutlineClose className="my-auto ml-2" />
                </button>
              }
          </div>
        </>
      }

      { jobs?.length > 0 ? (
        <>
          <div className={ !isTabletOrMobile && "grid grid-cols-1 gap-2 mt-10 w-4/5 mx-auto" }>
            { jobs.map(( job, i ) =>
              <Fragment key={i}>
                <Link href={`/marketplace/jobs/${job._id}`}>
                  <div className= {
                                  `cursor-pointer group p-3 bg-white 
                                  ${!isTabletOrMobile ? "border-box hover:bg-Grey-dashboard" 
                                    : 'shadow-separator'} 
                                  transform duration-500 hover:-translate-y-2 `
                  }>
                    <div className="m-auto px-3 py-2">
                      <div className= "mb-3 mt-1">
                        <div>
                          <span className="text-Black-title hover:text-orange my-auto capitalize text-lg"> { job.title } </span>
                        </div>
                        <div>
                          <span className="text-Black-title font-bold my-auto capitalize"> 
                            { job.location && ` ${ job.location?.location }, ${ job.location?.city } `} 
                          </span>
                        </div>
                      </div>
                      <div className=" text-base text-Black-medium mb-3">
                          { parse( job.description && `${job.description?.substring(0, MAX_LENGTH)} ${job.description.length >= MAX_LENGTH ? "..." : ""}` )}
                      </div>
                      <div className= "flex justify-between" >
                        <div>
                            <h2 className=" text-base text-Black-text"> Budget: </h2>
                            <span 
                                className="text-Black-title font-bold my-auto capitalize text-lg"
                                >
                                £{ job.budget }
                            </span>
                        </div>
                        <div>
                            <h2 className= "text"> Posted: 12 hours ago</h2>
                        </div>
                      </div>
                    </div>
                </div>    
              </Link>
            </Fragment> 
            )}
          </div>
        </>
      ) : (
            <div className="mb-4 mx-auto">
              <div className="m-auto text-center">
                  <NotFound className="text-center mx-auto my-2"/>
                  <span className="font-bold "> Sorry there are no stores that match your request </span>
              </div>
            </div>
        )}
        <div className="p-3 mt-3">
          <Pagination
                totalResults={count ? count : 0}
                resultsPerPage={18}
                onChange={(value) => handlePagination(value)}
            />
        </div>
    </div>
    </div>
    
      </div>
    
    </Layout>
    
    
  );
};

export default memo (Stores);
