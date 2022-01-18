import React, { useEffect, useState, useContext, Fragment } from "react";
import CategoryProduct from "@/marketplace/components/product/CategoryProduct";
import Card from "@/components/Cards/Card";
import { useSelector, useDispatch } from "react-redux";
import { SwiperSlide, Swiper } from 'swiper/react'
import { Tab } from '@headlessui/react'
import Layout from '@/containers/Layout'
import Button from '@/components/Buttons/Button'

import { useRouter } from 'next/router'
import Chat from '@/marketplace/components/chat/Chat'
import { AddLike, RemoveLike, Upvote, Downvote } from '@/redux/actions/reviewsAction'
import {
  MdArrowBack, MdLocationOn } from "react-icons/md";
import { AiFillWechat } from 'react-icons/ai'
import { getManufacturerProfile, getProductsBySlug } from '@/redux/actions/manufacturerAction'
import AboutManufacturer from "@/marketplace/components/manufacturer/AboutManufacturer";
import ReviewCard from '@/marketplace/components/review/ReviewCard'
import PopUp from '@/marketplace/components/pop/PopUp'
import { addWishList, getWishList } from "@/redux/actions/wishlistAction";
import { SignInContext } from '@/context/SignInContext'
import { getReviewsByManufacturer } from '@/actions/userActions'
import { useMediaQuery } from 'react-responsive'
import { getCategories } from '@/redux/actions/marketplace'
import { Star, NotFound } from '@/marketplace/assets/icons'
import SwiperCore, {
  Navigation, Pagination
} from 'swiper';

SwiperCore.use([Navigation, Pagination]);


const Manufacturer = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const [ isOpen, setIsOpen ] = useState(false)
  const { profile, products } = useSelector( state => state.manufacturer)
  const { reviews } = useSelector( state => state.admin)
  const [ rating, setRating ] = useState(false)
  const { isAuthenticated, following } = useSelector((state) => state.auth);
  const [ menu, setMenu ] = useState(0);
  const [ categories, setCategories ] = useState(false)
  const [ isFiltered, setIsFiltered ] = useState(false)
  const [ category, setCategory ] = useState(false)
  const [ content, setContent ] = useState("Products")
  const { manufacturerSlug } = router.query
  const isTabletOrMobile = useMediaQuery({ query: '(max-width: 768px)' })

  const { toggleSidebar,  OpenSign } = useContext(SignInContext)

  const handleWishlist = (product) => {
    !isAuthenticated ? toggleSidebar() : dispatch(addWishList(product));
    dispatch(getWishList())
  };

    useEffect(() => {
      dispatch(getWishList())
    }, [])


  useEffect(() => {
    if(manufacturerSlug){
      dispatch(getManufacturerProfile(manufacturerSlug))
      dispatch(getProductsBySlug(manufacturerSlug))
      dispatch(getReviewsByManufacturer(manufacturerSlug))
      getCategories().then( data => {
            setCategories(data) })
      }
  }, [dispatch, manufacturerSlug])

  const filteredReviews = reviews && reviews.filter(function (el) {
     return el.rating === rating;
  });

  const NoResult = () => (
      <div className="mb-4">
          <div className="m-auto text-center">
              <NotFound className="text-center mx-auto my-2"/>
              <span className="font-bold capitalize"> Sorry there are no {content} available </span>
          </div>
      </div>
 )
 
var total = 0;
        for(var i = 0; i < reviews.length; i++) {
        total += reviews[i].rating;  
    }
 var avg = total / reviews.length;

    const handleReviewsMenu = () => {
      setMenu(1)
      setContent("Reviews")
    }
    
    const handleRating = (data) => {
      setRating(data)
      setIsFiltered(true)
    }

    const handleLike = (review) => {
    if(!isAuthenticated) {
        toggleSidebar()
    } 
    else {
    dispatch(AddLike(review))
    }
  }

   const handleUpvote = (reviewId) => {
     console.log('reviewId', reviewId)
    if(!isAuthenticated) {
        toggleSidebar()
    } 
    else { 
      dispatch(Upvote(reviewId))
      setTimeout(() => {
        dispatch(getReviewsByManufacturer(manufacturerSlug))
      },  2000);
    }
  }

   const handleDownvote = (reviewId) => {
    if(!isAuthenticated) {
        toggleSidebar()
    } 
    else {
    dispatch(Downvote(reviewId))
    setTimeout(() => {
      dispatch(getReviewsByManufacturer(manufacturerSlug))
    },  2000);
    }
  }


   const ratings = [1, 2, 3, 4, 5]


   const Products = React.memo(() => (
     <div>
      <div className="grid mobile:grid-cols-1 gap-6 grid-cols-2 ">
        {
            products && products.length !== 0 ?
              products.map((product, i) =>
                <Fragment key={i=product._id}> 
                  <CategoryProduct product={product} handleWishlist={handleWishlist}/>
                </Fragment>
              )
              :
            <div className="mb-4">
                <div className="m-auto text-center">
                    <NotFound className="text-center mx-auto my-2"/>
                    <span className="font-bold capitalize"> Sorry there are no {content} available </span>
                </div>
            </div>
        }
      </div>
     </div>
   ));
  

   const Reviews = React.memo(() => (
     <>
      <div className="flex w-3/4 px-2 mobile:w-full mobile:grid mb-5">
        <div className="my-auto text-Black-medium mr-5 text-lg mobile:hidden">
          Filter
        </div>
        <div className={`${!isTabletOrMobile ? "grid grid-cols-5 gap-4" : "flex"} my-3`}>
          {ratings.map( (data, i) =>
            <div 
              className="px-1"
              key={data}
            > 
              <div 
                  className= {`mobile:w-auto px-3 mobile:px-2 py-1 rounded-md flex cursor-pointer hover:bg-Grey-hover ${rating === data ? "bg-Grey-hover" : "bg-Grey-dashboard" }`}
                  onClick={() => handleRating(data)}      
              >
                <Star style={{width: "16px", height:"16px"}} className="my-auto"/>
                <span className="text-Black-medium font-bold ml-1"> {data} </span>
              </div>
            </div>
          )}
        </div> 
      </div>
      {isFiltered && filteredReviews ?
        filteredReviews.length !== 0 ?
          filteredReviews.map( (data, i) =>
          <Fragment key={data._id}> 
            <ReviewCard review= { data } handleLike= {handleUpvote} handleRemoveLike={handleDownvote}/>
          </Fragment>   
          )
          :
          <NoResult />
          
          :
          reviews && reviews.length !== 0 ? 
            reviews.map( (data, i) =>
            <Fragment key={data._id}> 
              <ReviewCard review= { data } handleLike= {handleUpvote} handleRemoveLike={handleDownvote}/>
            </Fragment>   
            )
          :
          <NoResult />
      }
     </>
   ))

   const Photos = React.memo(() => (     
      <div className="grid grid-cols-2 gap-6 mobile:grid-cols-1">
        {
          profile.photos && profile.photos.length !== 0 ?
            ( profile.photos.map((photo, i) => (
                <div key={photo.url} className="w-full cursor-pointer shadow-product">
                  <img src={photo.url} alt="photo" className="w-full h-full object-cover rounded-md shadow-product"/>
                </div>
              ))
            ) : (
              <div className="mb-4 col-span-2">
                <div className="m-auto text-center">
                    <NotFound className="text-center mx-auto my-2"/>
                    <span className="font-bold capitalize"> Sorry there are no photos available </span>
                </div>
              </div>
            ) 
        }
      </div>
    ))
   
  const ProfileMenu = () => (
      <Tab.Group>
            <Tab.List>
              <div className="my-5">
                <Tab as={Fragment}>
                  {({ selected }) => (
                    <button
                      className={
                        selected ? 'font-bold text-Blue border-b-2 border-blue' : 'bg-white text-Black-text font-bold'
                      }
                    >
                      Services
                    </button>
                  )}
                </Tab>
                <Tab as={Fragment}>
                  {({ selected }) => (
                    <button
                      className={
                        selected ? 'font-bold text-Blue border-b-2 border-blue' : 'bg-white text-Black-text font-bold'
                      }
                    >
                      Reviews
                    </button>
                  )}
                </Tab>
                <Tab as={Fragment}>
                  {({ selected }) => (
                    <button
                      className={
                        selected ? 'font-bold text-Blue border-b-2 border-blue' : 'bg-white text-Black-text font-bold'
                      }
                    >
                      Photos
                    </button>
                  )}
                </Tab>
              </div>
              {/* ...  */}
            </Tab.List>
            <Tab.Panels>
              <Tab.Panel> 
                <Products /> 
              </Tab.Panel>
              <Tab.Panel> 
                <Reviews /> 
              </Tab.Panel>
              <Tab.Panel> 
                <Photos /> 
              </Tab.Panel>
              {/* ... */}
            </Tab.Panels>
          </Tab.Group>
  );


  const MobileLayout = () => (
    <div className="min-h-screen">
      <div className="mx-auto relative">
        { profile.photos && profile.photos.length >= 1 &&
          <Swiper
              freeMode={true}
              slidesPerView={'auto'}
              pagination={{ "type": "fraction" }}
              className="w-full cursor-pointer"
              spaceBetween={20}
          >
            <SwiperSlide 
                className="bg-cover bg-center h-72 w-full mobile:h-48 m-auto shadow-button" 
                style= {{backgroundImage: `url(${profile?.photos[0]?.url})`}} 
            />
            <SwiperSlide 
                className="bg-cover bg-center h-72 w-full mobile:h-48 m-auto shadow-button" 
                style= {{backgroundImage: `url(${profile?.photos[1]?.url})`}} 
            />
            <SwiperSlide 
                className="bg-cover bg-center h-72 w-full mobile:h-48 m-auto shadow-button" 
                style= {{backgroundImage: `url(${profile?.photos[2]?.url})`}} 
            />
            <SwiperSlide 
                className="bg-cover bg-center h-72 w-full mobile:h-48 m-auto shadow-button" 
                style= {{backgroundImage: `url(${profile?.photos[3]?.url})`}} 
            />
          </Swiper>
        }
        <div className=" absolute top-2 left-0 z-50">
          <div className="flex">
            <button
              className="rounded-full w-8 h-8 bg-Grey-light p-0 border-0 inline-flex items-center justify-center text-white ml-4"
              onClick={() => setTimeout(() => router.back(), 150)}
            >
              <MdArrowBack className="w-5 h-5"/>
            </button>
          </div>
        </div>
      </div>
      <Card className="px-6">
        <div className="w-full">
            <div className="flex">
              <div>
                <div className="bg-cover bg-center shadow-button h-12 w-12 rounded-lg bg-white m-auto transform transition hover:-rotate-6 cursor-pointer duration-300 border-2 border-white" 
                  style= {{backgroundImage: `url("${profile.avatar}")`}}
                />
              </div>
              <div className="my-auto pl-3">
                <h1 className="font-bold text-2xl capitalize my-auto"> {profile.name} </h1>
                {/* If there are no reviews, do not show the rating */}
                { reviews.length > 0 &&
                  <div>
                    <div className="flex ml-2">  
                      <Star className= "text-lg my-auto" style={{width:"16px", height: "16px"}}/>
                      <span className="my-auto text-Black-medium font-bold pl-1"> {avg} </span>
                      <div className="my-auto pl-2 text font-bold text-Black-medium underline cursor-pointer"
                        onClick={handleReviewsMenu}
                      > 
                        {reviews.length > 1? `(${reviews.length}) reviews` : `(${reviews.length}) review`} 
                      </div>
                    </div>
                  </div>
                } 
              </div>
            </div>
            <div className="my-3">
              <h2 className="font-bold text-Black-text "> Skills </h2>
              <Swiper
                slidesPerView={3}
                freeMode={true}
                spaceBetween={10}
                className="mb-3 mt-1"
              >
                {profile.skills?.map( (data, i) =>
                <Fragment key={data}>
                  <SwiperSlide className=" py-1 font-bold text-Black-medium bg-Grey-dashboard rounded-md text text-center cursor-pointer capitalize"> 
                    {data}
                  </SwiperSlide>
                </Fragment>
                )}
              </Swiper>
            </div>
            <div className="my-3">
              <h2 className="font-bold text-Black-text pb-1"> Summary </h2>
              <div className="lg:text-center text-Black-text">
                {profile.summary}
              </div>
            </div>
            <div className="my-3">
              <h2 className="font-bold text-Black-text "> Locations </h2>
              <Swiper
                slidesPerView={2}
                freeMode={true}
                spaceBetween={10}
                className="mb-3 mt-1"
              >
                {profile.locations?.map( (data, i) =>
                <Fragment key={data.location}>
                  <SwiperSlide className=" w-auto py-1 font-bold text-Black-medium bg-Grey-dashboard rounded-md text text-center cursor-pointer px-2">
                    <div className="flex m-auto">
                      <MdLocationOn className="my-auto ml-1 mr-1"/>
                      <span className="font-bold"> 
                        {data.location}
                      </span>
                    </div>
                  </SwiperSlide>
                </Fragment>
                )}
              </Swiper>
            </div>
          </div>
          <ProfileMenu />
        </Card>

        <div className="sticky bottom-0 shadow-button bg-white z-50 py-2">
          <div className="grid grid-cols-2">
            <div className="ml-auto my-auto">
              <Button 
                className="border-2 border-Blue text-Blue rounded shadow-none mr-1" 
              >
                <a href={`tel: 0${profile.mobile}`}>
                  {`0${profile.mobile}`}
                </a>
              </Button>
            </div>
            <div className="mr-auto">
              <Button
                onClick={() => setIsOpen(true)} 
                className="bg-Blue text-white flex border-2 border-Blue"
              >
                <AiFillWechat className="my-auto text-lg mr-2"/>
                Chat now
              </Button>
            </div>
          </div>
        </div>
      </div>
  )

  return (
    <div>
      {isTabletOrMobile ? (
          <MobileLayout />
      ) : (
          <Layout>
            <div className="my-4">
              <div className="lg:w-4/6 lg:mx-auto lg:py-3 border-box bg-white">
                <div className="relative">
                    {/**/}
                    <div className="">
                      <div className="relative">
                        <div className="w-full shadow-separator p-3">
                          <div className="flex justify-between my-3">
                            <div className="flex">
                              <div>
                                <div className="bg-cover bg-center shadow-button h-20 w-20 rounded-lg bg-white m-auto transform transition hover:-rotate-6 cursor-pointer duration-300 border-2 border-white" 
                                      style= {{backgroundImage: `url("${profile.avatar}")`}}
                                />
                                </div>
                                <div className="my-auto pl-3">
                                  <h1 className="font-bold text-2xl capitalize my-auto"> {profile.name} </h1>
                                  <h2 className="text-base capitalize my-auto"> {profile.title} </h2>
                                  {/* If there are no reviews, do not show the rating */}
                                  { reviews.length > 0 &&
                                  <div>
                                    <div className="flex ml-2">  
                                      <Star className= "text-lg my-auto" style={{width:"16px", height: "16px"}}/>
                                      <span className="my-auto text-Black-medium font-bold pl-1"> {avg} </span>
                                      <div className="my-auto pl-2 text font-bold text-Black-medium underline cursor-pointer"
                                      > 
                                        {reviews.length > 1? `(${reviews.length}) reviews` : `(${reviews.length}) review`} 
                                      </div>
                                    </div>
                                  </div>
                                  } 
                                </div>
                              </div>
                              <div className="grid grid-cols-2">
                                <div className="ml-auto my-auto">
                                  <Button 
                                    className="border-2 border-Blue text-Blue rounded shadow-none mr-1" 
                                    >
                                    <a href={`tel: 0${profile.mobile}`}>
                                      {`0${profile.mobile} `}
                                    </a>
                                  </Button>
                                </div>
                                <div className="m-auto">
                                    <Button
                                      onClick={() => setIsOpen(true)} 
                                      className="bg-Blue text-white flex border-2 border-Blue"
                                      >
                                      <AiFillWechat className="my-auto text-lg mr-2"/>
                                      Chat now
                                    </Button>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    {/**/}
                    </div>
                      <Tab.Group>
                          <div className="grid grid-cols-10">
                            <div className="col-span-3">
                            <Tab.List className="shadow-separator w-full">
                              <div className="shadow-separator w-full p-3">
                                <Tab as={Fragment}>
                                  {({ selected }) => (
                                    <div>
                                      <button
                                        className={
                                          selected ? 'font-bold text-Blue border-l-2 border-Blue' : 'bg-white text-Black-text font-bold'
                                        }
                                      >
                                        Services
                                      </button>
                                    </div>
                                  )}
                                </Tab>
                                <Tab as={Fragment}>
                                  {({ selected }) => (
                                    <div>
                                      <button
                                        className={
                                          selected ? 'font-bold text-Blue border-l-2 border-Blue' : 'bg-white text-Black-text font-bold'
                                        }
                                      >
                                        Reviews
                                      </button>
                                    </div>
                                  )}
                                </Tab>
                                <Tab as={Fragment}>
                                  {({ selected }) => (
                                    <div>
                                      <button
                                        className={
                                          selected ? 'font-bold text-Blue border-l-2 border-Blue' : 'bg-white text-Black-text font-bold'
                                        }
                                      >
                                        Photos
                                      </button>
                                    </div>
                                  )}
                                </Tab>
                              </div>
                            {/* ...  */}
                            </Tab.List>
                            <div>
                              <div className="my-3 p-3">
                                <h2 className="font-bold text-Black-text "> About </h2>
                                <h3 className="text-Black-medium text mt-2"> { profile.summary } </h3>
                              </div>
                              { profile.skills && profile.skills.length !== 0 &&
                                <div className="my-3 p-3">
                                  <h2 className="font-bold text-Black-text "> Skills </h2>
                                  <div className="grid grid-cols-3 gap-5 pt-2">
                                    {profile.skills?.map( (data, i) =>
                                      <div key={data} className="bg-Grey-dashboard rounded-md px-3 py-2 w-full">
                                        <div className="font-bold text-Black-medium text text-center cursor-pointer capitalize"> 
                                          {data}
                                        </div>
                                      </div>  
                                    )}
                                  </div>
                                </div>
                              }
                              { profile.locations && profile.locations.length !== 0 &&
                                <div className="my-3 p-3">
                                  <h2 className="font-bold text-Black-text"> Locations </h2>
                                  <div className="grid grid-cols-2 gap-5 pt-2">
                                    {profile.locations?.map( (data, i) =>
                                      <div key={data._id} className="bg-Grey-dashboard rounded-md px-3 py-2 w-full text-center cursor-pointer mx-auto">
                                        <div className=" capitalize mx-auto text-Black-medium text font-bold text-center">
                                          {/* <MdLocationOn className="text-Black-medium h-5 w-5 m-auto"/> */}
                                          {data.location}
                                        </div>
                                      </div>  
                                    )}
                                  </div>
                                </div>
                              }
                            </div>
                          </div>

                          <div className="col-span-7 border-l border-Grey">
                            <div className="w-5/6 mx-auto py-10">
                              <Tab.Panels>
                                <Tab.Panel> 
                                  <Products /> 
                                </Tab.Panel>
                                <Tab.Panel> 
                                  <Reviews /> 
                                </Tab.Panel>
                                <Tab.Panel> 
                                  <Photos /> 
                                </Tab.Panel>
                                {/* ... */}
                              </Tab.Panels>
                            </div>
                          </div>
                        </div>
                      </Tab.Group>
              </div>
            </div>

            <div className="lg:w-5/6 lg:mx-auto lg:py-3">
                <PopUp isOpen={isOpen} setIsOpen={setIsOpen} >
                  <Chat receiver={profile}/>
                </PopUp>
            </div>
          </Layout>
      )}
    </div>
  );
};

Manufacturer.whyDidYouRender = true;
export default Manufacturer;
