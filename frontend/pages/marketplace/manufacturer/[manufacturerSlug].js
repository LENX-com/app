import React, { useEffect, useState, useContext, Fragment } from "react";
import CategoryProduct from "@/marketplace/components/product/CategoryProduct";
import Card from "@/components/Cards/Card";
import { useSelector, useDispatch } from "react-redux";
import { SwiperSlide, Swiper } from 'swiper/react'
import Layout from '@/containers/Layout'
import Button from '@/components/Buttons/Button'
import { useRouter } from 'next/router'
import {followManufacturer, getFollowing } from "@/redux/actions/userActions"
import Chat from '@/marketplace/components/chat/Chat'
import {
  MdArrowBack,
  MdLocationOn
} from "react-icons/md";
import { AiOutlineHeart, AiTwotoneStar, AiFillWechat } from 'react-icons/ai'
import { getManufacturerProfile, getProductsBySlug } from '@/redux/actions/manufacturerAction'
import AboutManufacturer from "@/marketplace/components/manufacturer/AboutManufacturer";
import ReviewCard from '@/marketplace/components/review/ReviewCard'
import PopUp from '@/marketplace/components/pop/PopUp'
import { SignInContext } from '@/context/SignInContext'
import { getReviewsByManufacturer } from '@/actions/userActions'
import { useMediaQuery } from 'react-responsive'
import { getCategories } from '@/redux/actions/marketplace'
import { Star, NotFound } from '@/marketplace/assets/icons'
import SwiperCore, {
  Navigation, Pagination
} from 'swiper';
// install Swiper modules
import Rating from 'react-rating'

SwiperCore.use([Navigation, Pagination]);


const Manufacturer = ({ match }) => {
  const router = useRouter();
  const dispatch = useDispatch();
  const [ isOpen, setIsOpen ] = useState(false)
  const [ isOpenSign, setIsOpenSign ] = useState(false)
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

  const { OpenSign, closeSidebar, toggleSidebar } = useContext(SignInContext)


  useEffect(() => {
    dispatch(getManufacturerProfile(manufacturerSlug))
    dispatch(getProductsBySlug(manufacturerSlug))
     getCategories().then( data => {
           setCategories(data) })
    }
  , [dispatch, manufacturerSlug])

  useEffect(() => {
        dispatch(getReviewsByManufacturer(manufacturerSlug))
        dispatch(getFollowing())
    }, [dispatch])
  
  var categoryFilter = []
    for (let i=0; i<products.length; i++) {
        if(!categoryFilter.includes(products[i].category)){
    categoryFilter.push(products[i].category)
    }
}
const filteredCategories = categories && categories.filter((el) => {
  return categoryFilter.some((f) => {
    return f._id === el.id;
  });
});

const filteredReviews = reviews && reviews.filter(function (el) {
   return el.rating === rating;
});

const filteredProducts = products && products.filter(function (el) {
   return el.category._id === category;
});

 var total = 0;
        for(var i = 0; i < reviews.length; i++) {
        total += reviews[i].rating;  
    }
    var avg = total / reviews.length;


{/* Check if user already follows the manufacturer */}
const isFollowing = following?.some(e => e.user?._id === profile.id) ? "Unfollow" : "Follow"   

const handleCategory = (id) => {
  setCategory(id)
}

const handleFollow = (profile) => {
  if(isAuthenticated){
    dispatch(followManufacturer(profile));
    setTimeout(() =>{
      dispatch(getFollowing())
    }, 300)
  } else {
    toggleSidebar();
  }
}

   const handleProductMenu = () => {
      setMenu(0)
      setContent("Products")
   }

    const handleReviewsMenu = () => {
      setMenu(1)
      setContent("Reviews")
    }
    
    const handleRating = (data) => {
      setRating(data)
      setIsFiltered(true)
    }
   const handleAboutMenu = () => {
      setMenu(2)
      setContent("About")
   }

   const ratings = [1, 2, 3, 4, 5]
   
    const NoResult = () => (
        <div className="mb-4">
            <div className="m-auto text-center">
                <NotFound className="text-center mx-auto my-2"/>
                <span className="font-bold capitalize"> Sorry there are no {content} available </span>
            </div>
        </div>
    )

   const Products = () => (
     <div>
      <div className="lg:w-3/5 my-4">
          { isTabletOrMobile ?
            <Swiper
                    slidesPerView={4}
            >
              {filteredCategories && filteredCategories.map( data => 
                <SwiperSlide
                  spaceBetween={20}
                  className={`px-3 py-1 m-1 rounded-md cursor-pointer text-center hover:bg-Grey-hover mobile:w-auto ${ data.id === category ? "bg-Grey-hover" : "bg-Grey-dashboard"}`}
                  onClick= {() => handleCategory(data.id)}
                  key={data.id}      
                >
                  <span className="text-Black-medium font-bold ml-1 text-center"> {data.name} </span>
                </SwiperSlide>
                )}
            </Swiper>
              :
            <div className="grid grid-cols-6 gap-4">
                {filteredCategories && filteredCategories.map( data => 
                  <div 
                    className={`px-3 py-1 rounded-md cursor-pointer text-center hover:bg-Grey-hover mobile:w-auto ${ data.id === category ? "bg-Grey-hover" : "bg-Grey-dashboard"}`}
                    onClick= {() => handleCategory(data.id)}
                    key={data.id}      
                  >
                    <span className="text-Black-medium font-bold ml-1 text-center"> {data.name} </span>
                  </div>
                )}
            </div>
          }
      </div>
      <div className="grid mobile:grid-cols-2 gap-4 grid-cols-5 my-4">
        {
            filteredProducts.length  !== 0 ?
              filteredProducts.map((product, i) =>
                <Fragment key={i}>
                  <CategoryProduct product={product} />
                </Fragment> 
              )
                :

            products && products.length !== 0 ?
              products.map((product, i) =>
                <Fragment key={i}> 
                  <CategoryProduct product={product} />
                </Fragment>
              )
              :
            <NoResult /> 
            }
      </div>
     </div>
   )
   
   // switch case to change the tabs to services, reviews and about
     const value = () => {
       switch (content) {
         case "Products":
           return (
             <Products />
           )
           ;
         case "Reviews":
           return (
             <Reviews />
           )
         case"About":
           return (
             <AboutManufacturer profile={profile} isTabletOrMobile={isTabletOrMobile} />
           )
         
         default:
           return <Products />;
       }
     }

   const Reviews = () => (
     <>
      <div className="flex w-3/4 px-2 mobile:w-full mobile:grid">
        <div className="my-auto text-Black-medium mr-5 text-lg">
          Filter
        </div>
        <div className={`${!isTabletOrMobile ? "grid grid-cols-5 gap-4" : "flex"} my-3`}>
          {ratings.map( (data, i) =>
            <div 
              className="px-1"
              key={i}
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
          <Fragment key={i}> 
            <ReviewCard review= { data } />
          </Fragment>   
          )
          :
          <NoResult />
          
          :
          reviews && reviews.length !== 0 ? 
            reviews.map( (data, i) =>
            <Fragment key={i}> 
              <ReviewCard review= { data } />
            </Fragment>   
            )
          :
          <NoResult />
      }
     </>
   )

  const ManufacturerProfile = () => (
    <>
     <div className="relative">
        {/**/}
        <div className="lg:grid lg:grid-cols-2 lg:gap-5 lg:p-4">
          <div className="relative">
            <div className="lg:Center w-full">
                <div className="flex justify-center mx-auto text-center">
                  <div>
                    <div className="bg-cover bg-center shadow-button h-20 w-20 rounded-lg bg-white m-auto transform transition hover:-rotate-6 cursor-pointer duration-300 border-2 border-white" 
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
                { profile.skilss &&
                <div className="grid grid-cols-4 gap-5 my-5">
                  {profile.skills?.map( (data, i) =>
                  <div key={i}>
                    <div className="px-3 py-2 font-bold text-Black-medium bg-Grey-dashboard rounded-md text text-center cursor-pointer"> 
                      {data.skill}
                    </div>
                  </div>  
                  )}
               </div>
               }
         
              <div>
              <div className="my-2 pb-3 lg:text-center text-Black-text">
                {profile.summary}
              </div>
              <div className="grid grid-cols-2">
                <div className="ml-auto my-auto">
                  <Button 
                    className="border-2 border-Blue text-Blue rounded shadow-none mr-1" 
                    >
                    <a href={`tel:${profile.mobile}`}>
                      { profile.mobile }
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
        </div>
            
            <div className="lg:w-3/5 mx-auto">
              { profile.photos && profile.photos.length >= 1 &&
              <Swiper
                  freeMode={true}
                  navigation={true}
                  className="w-full cursor-pointer rounded-md"
                  spaceBetween={20}
                  slidesPerView={1}
              >
                  <SwiperSlide 
                      className="bg-cover bg-center h-72 w-full mobile:h-48 rounded-md m-auto shadow-button" 
                      style= {{backgroundImage: `url(${profile?.photos[0]?.url})`}} 
                  />
                  <SwiperSlide 
                      className="bg-cover bg-center h-72 w-full mobile:h-48 rounded-md m-auto shadow-button" 
                      style= {{backgroundImage: `url(${profile?.photos[1]?.url})`}} 
                  />
                  <SwiperSlide 
                      className="bg-cover bg-center h-72 w-full mobile:h-48 rounded-md m-auto shadow-button" 
                      style= {{backgroundImage: `url(${profile?.photos[2]?.url})`}} 
                  />
                  <SwiperSlide 
                      className="bg-cover bg-center h-72 w-full mobile:h-48 rounded-md m-auto shadow-button" 
                      style= {{backgroundImage: `url(${profile?.photos[3]?.url})`}} 
                  />
              </Swiper>
              }
            </div>

          </div>
        {/**/}
      </div>
  
      </>
  )

  const ProfileMenu = () => (
    <div className="flex justify-between mobile:grid mobile:grid-cols-1 mobile:gap-4">
      <div className="grid grid-cols-3 gap-3 rounded-none w-1/2 mobile:w-full ">
        <div
          className={`text-center font-bold cursor-pointer px-3 py-2 hover:bg-Grey-dashboard ${
            menu === 0 ? "border-b-2 border-Blue text-Blue" : "text-Black-medium rounded-md"
          }`}
          onClick={handleProductMenu}
        >
          Services
        </div>
        <div
          className={`text-center font-bold cursor-pointer px-3 py-2 hover:bg-Grey-dashboard ${
            menu === 1 ? "border-b-2 border-Blue text-Blue" : "text-Black-medium rounded-md"
          }`}
          onClick={handleReviewsMenu}
        >
          Reviews
        </div>
        <div
          className={`text-center font-bold cursor-pointer px-3 py-2 hover:bg-Grey-dashboard ${
            menu === 2 ? "border-b-2 border-Blue text-Blue" : "text-Black-medium rounded-md"
          }`}
          onClick={handleAboutMenu}
        >
          About
        </div>
      </div>
    </div>
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
                <Fragment key={i}>
                  <SwiperSlide className=" py-1 font-bold text-Black-medium bg-Grey-dashboard rounded-md text text-center cursor-pointer"> 
                    {data.skill}
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
                slidesPerView={3}
                freeMode={true}
                spaceBetween={10}
                className="mb-3 mt-1"
              >
                {profile.locations?.map( (data, i) =>
                <Fragment key={i}>
                  <SwiperSlide className=" py-1 font-bold text-Black-medium bg-Grey-dashboard rounded-md text text-center cursor-pointer">
                    <div className="flex m-auto">
                      <MdLocationOn className="my-auto ml-1 mr-1"/>
                      <span className="font-bold"> 
                        {data}
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
      <Card className="min-h-screen">
        {value()}
      </Card>
      <div className="sticky bottom-0 shadow-button bg-white z-50 py-2">
        <div className="grid grid-cols-2">
          <div className="ml-auto my-auto">
            <Button 
              className="border-2 border-Blue text-Blue rounded shadow-none mr-1" 
            >
              <a href={`tel:${profile.mobile}`}>
                { profile.mobile }
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
  
  const DesktopLayout = () => (
      <Layout>
        <div className="lg:w-5/6 lg:mx-auto lg:py-3">
          <Card className="my-2">
            <ManufacturerProfile/>
            <ProfileMenu />
          </Card>

            <Card>
              {value()}
            </Card>
            <PopUp isOpen={isOpen} setIsOpen={setIsOpen} >
              <Chat receiver={profile} />
            </PopUp>
        </div>
      </Layout>
  )

  return (
    <div>
      {isTabletOrMobile ? (
          <MobileLayout />
      ) : (
        <DesktopLayout />
      )}
    </div>
  );
};

export default Manufacturer;
