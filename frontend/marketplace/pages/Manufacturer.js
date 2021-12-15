import React, { useEffect, useState, useContext } from "react";
import ProductList from "../components/manufacturer/ProductList";
import CategoryProduct from "../components/product/CategoryProduct";
import Card from "../../components/Cards/Card";
import { useSelector, useDispatch } from "react-redux";
import { SwiperSlide, Swiper } from 'swiper/react'
import Button from '../../components/Buttons/Button'
import {followManufacturer, getFollowing } from "../../actions/userActions"
import Chat from '../components/chat/Chat'
import { AiOutlineHeart, AiTwotoneStar, AiFillWechat } from 'react-icons/ai'
import { getManufacturerProfile, getProductsBySlug } from '../../actions/manufacturerAction'
import AboutManufacturer from "../components/manufacturer/AboutManufacturer";
import ReviewCard from '../components/review/ReviewCard'
import PopUp from '../components/pop/PopUp'
import { SignInContext } from '../../context/SignInContext'
import SignInPop from '../components/auth/SignInPop'
import { getReviewsByManufacturer } from '../../actions/userActions'
import { useMediaQuery } from 'react-responsive'

import { getCategories } from '../../actions/marketplace'
import { Star, EmptyStar, NotFound } from '../assets/icons'
import Rating from 'react-rating'

const Manufacturer = ({ match }) => {
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
  const slug = match.params.manufacturerSlug
  const isTabletOrMobile = useMediaQuery({ query: '(max-width: 768px)' })

  const { OpenSign, closeSidebar, toggleSidebar } = useContext(SignInContext)


  useEffect(() => {
    dispatch(getManufacturerProfile(slug))
    dispatch(getProductsBySlug(slug))
     getCategories().then( data => {
           setCategories(data) })
    }
  , [dispatch])

  useEffect(() => {
        dispatch(getReviewsByManufacturer(slug))
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
              filteredProducts.map(product => 
                <CategoryProduct product={product} />
              )
                :

            products && products.length !== 0 ?
              products.map(product => 
                <CategoryProduct product={product} />
              )
              :
            <NoResult /> 
            }
      </div>
     </div>
   )
   
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
            <div className="px-1"> 
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
          filteredReviews.map( data => 
            <ReviewCard review= { data } />   
          )
          :
          <NoResult />
          
          :
          reviews && reviews.length !== 0 ? 
            reviews.map( data => 
              <ReviewCard review= { data } />   
            )
          :
          <NoResult />
      }
     </>
   )

  const ManufacturerProfile = () => (
    <>
     <div className="min-w-sm h-44 relative">
        {/**/}
        <div className="w-full mobile:h-32 mobile:w-auto h-36 bg-cover bg-center" style={{background: `url("${profile.bgImage}")`}}/>
        <div className=" absolute bottom-0 w-full">
            <div className="bg-cover bg-center shadow-button h-20 w-20 rounded-lg bg-white m-auto transform transition hover:-rotate-6 cursor-pointer duration-300 border-2 border-white" style= {{backgroundImage: `url("${profile.avatar}")`}}/>
              <div className="flex justify-center mx-auto text-center">
                <div className="flex m-auto">
                  <h1 className="font-bold text-2xl capitalize my-auto"> {profile.name} </h1>
                  {/* If there are no reviews, do not show the rating */}
                    { reviews.length > 0 &&
                    <div className="flex ml-2">  
                      <Star className= "text-lg my-auto" style={{width:"16px", height: "16px"}}/>
                      <span className="my-auto text-Black-medium font-bold pl-1"> {avg} </span>
                    </div>
                    } 
                  </div>
              </div>
         </div>
        {/**/}
      </div>
  
      </>
  )

  const Profile = () => (
    <div className="flex justify-between mobile:grid mobile:grid-cols-1 mobile:gap-4">
      <div className="grid grid-cols-3 gap-3 rounded-none w-1/2 mobile:w-full ">
        <div
          className={`text-center font-bold cursor-pointer px-3 py-2 hover:bg-Grey-dashboard ${
            menu === 0 ? "border-b-2 border-Blue text-Blue" : "text-Black-medium rounded-md"
          }`}
          onClick={handleProductMenu}
        >
          Products
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
      <div>
         <div className="">
          <div>
            <div className="grid grid-cols-2">
                <div className="ml-auto my-auto">
                    <Button 
                            className="border-2 border-Blue text-Blue rounded shadow-none mr-1" 
                            onClick={()=> handleFollow(profile.id)}   
                    >
                      { isFollowing }
                    </Button>
                </div>
                <div className="mr-auto">
                    <Button
                        onClick={() => setIsOpen(true)} 
                        className="bg-Blue text-white flex border-2 border-Blue">
                         <AiFillWechat className="my-auto text-lg mr-2"/>
                        Chat now
                    </Button>
                </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );


  return (
    <div className="lg:w-5/6 lg:mx-auto">

      <Card className="my-2">
        <ManufacturerProfile/>
        <Profile />
      </Card>

        <Card>
          {value()}
        </Card>
        <PopUp isOpen={isOpen} setIsOpen={setIsOpen} >
          <Chat receiver={profile} />
        </PopUp>
    </div>
  );
};

export default Manufacturer;
