import React, { useEffect, memo } from 'react'
import Card from '@/components/Cards/Card'
import { MdStarBorder, MdStar } from 'react-icons/md'
import Rating from 'react-rating'
import { Star, EmptyStar, Tree } from '@/marketplace/assets/icons'
import { getReviewsByManufacturer } from '@/redux/actions/userActions'
import { useSelector, useDispatch } from 'react-redux'
import Button from '@/components/Buttons/Button'
import { AiFillWechat, AiFillSecurityScan } from "react-icons/ai";

const ChatBox = ({product, handleChat, handleProfile}) => {
    const MAX_LENGTH = 150
    const { reviews } = useSelector( state => state.admin)
    const dispatch = useDispatch();
        
    useEffect(() => {
            setTimeout(() => {
                dispatch(getReviewsByManufacturer(product.author.slug))
            }, 100);
    }, [])

    const BrandRating = React.memo(() => (
        <div>
           <Rating
           className="mt-2 text-base"
           emptySymbol= { <EmptyStar style={iconStyle} /> }
           fullSymbol= { <Star style={iconStyle} /> }
           readonly
           initialRating={avg}
           />
       </div>
    ))


    var total = 0;
        for(var i = 0; i < reviews.length; i++) {
        total += reviews[i].rating;
    }
    var avg = total / reviews.length;
    const { author } = product

    
    const iconStyle = {
    width: "16px",
    height: "16px",
    fontWeight: "600",
    }

    return (
        <Card>
            {product && 
            <>
                <div className="justify-between flex">
                    <div className="flex">
                        <div className="flex">
                            <img className="h-12 w-12 rounded-full" src= {author.avatar} />
                            <div className="ml-2 my-auto">
                                <div className="text-sm ">
                                    <span className="font-semibold"> {author.name} </span>
                                </div>
                            </div>
                        </div>
                        <div className="my-auto ml-4 text-xs bg-Grey-dashboard px-3 py-1 rounded-lg cursor-pointer"
                            onClick={handleProfile}>
                            Visit Profile
                        </div>
                    </div>
                    <BrandRating />
                </div>
                
                <div className="my-2">
                {`${author?.about?.substring(0, MAX_LENGTH)}${author?.about?.length > 150 ? "..." : ""}`}
                </div>

                <div className="my-2">
                    <Button
                        onClick={handleChat} 
                        className="bg-Blue text-white flex">
                        <AiFillWechat className="my-auto text-lg mr-2"/>
                        Chat now
                    </Button>
                </div>
            </>
            }
        </Card>
    )
}

export default memo(ChatBox)
