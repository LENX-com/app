import React from 'react'
import {  MdStar} from 'react-icons/md'
import SearchBar from '@/components/searchbar/SearchBar'


const ReviewSearch = ({reviews}) => {
  
    return ( 
        <div className="relative p-2 my-2">
            <div className="flex">
                {reviews &&
                <h1 className="text-2xl font-semibold text-gray-700 dark:text-gray-200 flex"> 
                   <MdStar className="text-orange"/>
                    { reviews.length === 1 ? `${reviews.length} review` : `${reviews.length} reviews` }
                </h1>
                }
            </div>
        </div>
    )
}

export default ReviewSearch
