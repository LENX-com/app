import React, { useState, useEffect, memo } from 'react'
import Link from 'next/link'
import { useDispatch, useSelector } from 'react-redux'
import { Tree, Star, EmptyStar } from '../../assets/icons'
import { AiOutlineCaretUp, AiOutlineCaretDown } from 'react-icons/ai'
import moment from 'moment'
import Chat from '../chat/Chat'
import { getReviewsByManufacturer } from '@/redux/actions/userActions'
import Rating from 'react-rating'


const Profile = ({author, handleLike, handleRemoveLike}) => {
    const menuOptions = [ "About", "Reviews", "Contact" ]
     const [ menu, setMenu ] = useState(0)  
     const { reviews } = useSelector( state => state.admin)
     const [ content, setContent ] = useState("")
     
     const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getReviewsByManufacturer(author.slug))
    }, [author])

    const handleMenu = (data, i) => {
      setMenu(i)
      setContent(data)
    }


    const NoReview = () => (
        <div className="mb-4">
            <div className="m-auto text-center">
                <Tree className="text-center mx-auto my-2"/>
                <span className="font-bold"> Sorry there are no reviews available </span>
            </div>
        </div>
    )  

    const About = () => (
        <div className="p-4">
            <h1 className="font-bold text-Black mb-2 mt-1">
                <span className="capitalize font-bold text-Black"> {author.name} </span> summary
            </h1>
            <div>
                {author.about}
            </div>
        </div>
    )

    const value = () => {
        switch (content) {
            case "About":
                return (
                    <About />
                );
            case "Reviews":
                return (
                    reviews.length > 0 ?
                        reviews && reviews.map( data => (
                                <div className="my-2 p-3">
                                    <ReviewCard review={data}/>
                                </div>
                        ))
                    : (
                        <>
                            <NoReview />
                        </>
                    )
                        );
            case "Contact":
                return (
                    <Chat receiver={author}/>
                );
            default:
            return <About /> ;
        }
    }


    const ReviewCard = React.memo(({review}) => (
        <div className="border-box p-3">
            <div className="flex justify-between">
                <div>
                    <div className="flex">
                        <div>
                            <img className="h-12 w-12 rounded-full" src= {review.author.avatar} alt={review.name} />
                        </div>
                        <div className="ml-2 m-auto">
                            <div className="text-sm ">
                                <span className="font-semibold"> {review.name} </span>
                                <div className="text-Black-medium text-xs m-auto "> { moment(review.date).startOf('hour').fromNow()} </div>
                                    <Rating
                                        className=""
                                        fullSymbol= { <Star className= "text-lg" style={{width:"16px", height: "16px"}}/> }
                                        emptySymbol ={ <EmptyStar className= "text-lg" style={{width:"16px", height: "16px"}}/>}
                                        readonly
                                        initialRating={review.rating}
                                    />
                            </div>
                        </div>
                    </div>
                    <div className="mt-4">
                        {review.review}
                    </div>
                </div>
                <div>
                    <div className="text-center">
                      <button className="m-auto cursor-pointer" 
                          onClick= {() => handleLike (review.id)}
                          >
                          <AiOutlineCaretUp className="m-auto  text-Black-medium text-lg mobile:text-sm"/>
                      </button>
                      <h1 className="text-center  text-Black-medium text-lg mobile:text-base"> {review.likes.length > 0 ? review.likes.length : '0'} </h1>
                      <button className="m-auto  cursor-pointer"
                          onClick={() => handleRemoveLike(review.id)}
                          >
                          <AiOutlineCaretDown  className=" text-Black-medium text-lg mobile:text-sm"/>
                      </button>
                  </div>
                </div>
            </div>
        </div>
    ))

    return (
        <div>
            <div className="relative h-full">
                <div className="relative h-28 rounded-sm mb-3 bg-center bg-cover" style={{background: `url("${author.photos[0]?.url}")`}}>
                    <div className="Center">
                        <div className="relative p-3">
                            <section 
                                    className="h-12 w-12 bg-center bg-cover shadow-button rounded-sm bg-white mx-auto" 
                                    style={{background: `url("${author.avatar}")`}}
                            />
                        </div>
                        <Link 
                                className=""
                                href={`/marketplace/manufacturer/${author.slug}`}
                        >
                            <a className="rounded-lg bg-Black text-white text-xs px-3 py-1 m-auto font-bold">
                                See full profile
                            </a>
                        </Link>
                    </div>
                </div>
                <div className="grid grid-cols-3 gap-3">
                    { menuOptions.map((data, i)=> (
                        <div key= { i } className= {`${menu === i ? 'border-b-2 border-orange text-orange' : 'text-Black-medium'} w-auto text-center p-2 cursor-pointer`} >
                            <div
                                onClick = { () => handleMenu( data, i )}
                                className="capitalize">
                            {data}
                            </div>
                        </div>
                    ))}
                </div>
                {value()}
            </div>
        </div>
    )
}

export default memo(Profile)
