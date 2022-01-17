import React from 'react'
import moment from 'moment'
import Rating from 'react-rating'
import { AiOutlineCaretUp, AiOutlineCaretDown } from 'react-icons/ai'
import { Star, EmptyStar } from '../../assets/icons'


const ReviewCard = ({review, handleLike, handleRemoveLike}) => {
  
    const MAX_LENGTH = 150

    return (
         <div className=" grid mobile:grid-cols-2 relative mobile:shadow-separator mobile:pb-2 mb-8">
            <div className="mobile:col-span-full">
                <div className="flex mobile:ml-3 my-auto lg:shadow-separator w-full col-span-5 lg:mb-3 lg:pb-2">
                    <div>
                        <img className="h-12 w-12 rounded-full" src= {review.author.avatar} />
                    </div>
                    <div className="ml-3 my-auto">
                        <div className="text-sm ">
                            <span className="font-bold text-Black capitalize"> {review.author.name} </span>
                            <div className="text-Black-medium text-xs capitalize"> {(moment(review.date).startOf('day').fromNow())} </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="my-auto mobile:col-span-full">
                <div className="flex">
                    <div className="w-1/10">
                        <div className="text-center">
                            <button className="m-auto cursor-pointer" 
                                onClick= {() => handleLike (review._id)}
                                >
                                <AiOutlineCaretUp className="m-auto  text-Black-medium text-lg mobile:text-sm"/>
                            </button>
                            <h1 className="text-center  text-Black-medium text-2xl mobile:text-sm"> {review.score } </h1>
                            <button className="m-auto  cursor-pointer"
                                onClick={() => handleRemoveLike(review._id)}
                                >
                                <AiOutlineCaretDown  className=" text-Black-medium text-lg mobile:text-sm"/>
                            </button>
                        </div>
                    </div>
                    <div className="w-full mt-2 pl-2">
                        <div className="flex justify-between ">
                            <Rating
                                className=""
                                fullSymbol= { <Star className= "text-lg" style={{width:"16px", height: "16px"}}/> }
                                emptySymbol ={ <EmptyStar className= "text-lg" style={{width:"16px", height: "16px"}}/>}
                                readonly
                                initialRating={review.rating}
                            />
                            <div className="text-Black-medium text-xs capitalize"> {(moment(review.date).startOf('day').fromNow())} </div>
                        </div>
                        <div className="mt-2 text-base">
                            {`${review.review.substring(0, MAX_LENGTH)}${review.review >= 100 ? "..." : ""}`}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ReviewCard
