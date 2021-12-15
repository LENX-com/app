import React from 'react'
import moment from 'moment'
import Rating from 'react-rating'
import { AiOutlineCaretUp, AiOutlineCaretDown } from 'react-icons/ai'
import { Star, EmptyStar, Tree } from '../../assets/icons'


const ReviewCard = ({review, handleLike, handleRemoveLike}) => {

     //function to capitalise first letter
    function capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }
  
    const MAX_LENGTH = 150

    return (
         <div className="grid grid-cols-3 gap-4 p-3 mobile:grid-cols-2 relative mobile:shadow-separator">
            <div className="flex mobile:col-span-full">
                    <div className="text-center p-1 mr-1 lg:mr-3 lg:p-2 my-auto mobile:absolute mobile:top-0 mobile:right-2">
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
                <div className="flex ml-3 my-auto">
                    <div>
                        <img className="h-12 w-12 rounded-full" src= {review.author.avatar} />
                    </div>
                    <div className="ml-3 my-auto">
                        <div className="text-sm ">
                            <span className="font-bold text-Black "> {review.author.name} </span>
                            <div className="text-Black-medium text-xs capitalize"> {(moment(review.date).startOf('day').fromNow())} </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="my-auto mobile:col-span-full">
                <Rating
                    className=""
                    fullSymbol= { <Star className= "text-lg" style={{width:"16px", height: "16px"}}/> }
                    emptySymbol ={ <EmptyStar className= "text-lg" style={{width:"16px", height: "16px"}}/>}
                    readonly
                    initialRating={review.rating}
                />
                <div className="mt-2">
                    {`${review.review.substring(0, MAX_LENGTH)}${review.review >= 100 ? "..." : ""}`}
                </div>
            </div>
        </div>
    )
}

export default ReviewCard
