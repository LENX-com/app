import React, { useState} from 'react'
import Card from '@/components/Cards/Card'
import Rating from 'react-rating'
import { useDispatch } from 'react-redux'
import { Star, EmptyStar, Tree } from '@/marketplace/assets/icons'
import { AddLike, RemoveLike } from '@/redux/actions/reviewsAction'
import { AiOutlineCaretUp, AiOutlineCaretDown } from 'react-icons/ai'
import moment from 'moment'

const Comment = ({reviews}) => {

    const dispatch = useDispatch()
    const [ hasLiked, setHasLiked ] = useState(false)
    const [ hasUnliked, setHasUnliked ] = useState(false)
    
    //function to capitalise first letter
    function capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }
    const handleLike = (review) => {
        dispatch(AddLike(review))
        setHasLiked(true)
    }
     const handleRemoveLike = (review) => {
        dispatch(RemoveLike(review))
        setHasLiked(false)
        setHasUnliked(true)
    }

    return (
        <>
            {
            reviews.length !== 0 ?
            
            reviews && reviews.map( comment => 
                <div className="lg:mx-auto lg:w-3/5 bg-white border-box p-4 my-2">
                    <div className="flex items-center">
                        <div
                            className="rounded-full p-1 relative"
                            style={{background: "#62D2A2"}}>
                            <a
                                className="block bg-white p-1 rounded-full transform transition hover:-rotate-12 duration-300"
                                href="#div"
                            >
                                <img
                                className="h-10 w-10 rounded-full"
                                src= {comment.author.avatar}
                                alt="jkay"
                                />
                            </a>
                            <div className="text-xs text-white bg-green-400 rounded-full p-1 absolute top-0 right-0 w-6 h-6 -mx-1" >
                                <div className="mx-auto">
                                    97
                                </div>
                            </div>
                            </div>
                        <div className="ml-2">
                            <div className="text-sm ">
                                <span className="font-semibold"> { comment.name } </span>
                            </div>
                            </div>
                        </div>
                        <div className="flex my-2 justify-between">
                            <Rating
                            className="mt-2 text-xl"
                            emptySymbol= { <EmptyStar className= "text-lg" style={{width:"16px", height: "16px"}}/> }
                            fullSymbol= { <Star className= "text-lg" style={{width:"16px", height: "16px"}}/>}
                            readonly
                            initialRating={comment.rating}
                            />
                            <div className="mt-2"> { capitalizeFirstLetter(moment(comment.date).startOf('day').fromNow())}</div> 
                        </div>
                        <div className="flex justify-between">
                            <div>
                                <h1 className="text-lg font-bold"> {comment.title} </h1>
                                <p className="text-gray-800 text-sm mt-2 leading-normal md:leading-relaxed"> { comment.review } </p>
                            </div>
                            <div className="text-xl relative">
                                <button className="m-auto cursor-pointer" 
                                        onClick= {() => handleLike (comment._id)}
                                >
                                    <AiOutlineCaretUp className="m-auto  text-Black-medium text-lg"/>
                                </button>
                                    <h1 className="text-center  text-Black-medium  text-2xl"> {comment.likes?.length} </h1>
                                <button className="m-auto  cursor-pointer"
                                        onClick={() => handleRemoveLike(comment._id)}
                                >
                                    <AiOutlineCaretDown  className=" text-Black-medium text-lg"/>
                                </button>
                            </div>
                        </div>
                </div>
            )
            :

            <div className="mb-4 h-full">
                <div className="m-auto text-center">
                    <Tree className="text-center mx-auto my-2"/>
                    <span className="font-bold"> Sorry there are no reviews for this product </span>
                </div>
            </div>
            }
        </>
    )
}

export default Comment
