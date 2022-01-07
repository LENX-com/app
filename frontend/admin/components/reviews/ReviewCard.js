import React, { useState } from 'react'
import { Avatar, Dropdown, DropdownItem } from '@windmill/react-ui'
import Rating from 'react-rating'
import Button from '../elements/Button'
import Card from '../../../components/Cards/Card'
import { MdStarBorder, MdStar} from 'react-icons/md'
import { AiOutlineCaretUp, AiOutlineCaretDown, AiOutlineClose, AiOutlineEllipsis } from 'react-icons/ai'

const ReviewCard = ({i, review, setCurrentReview, setIsOpen, full= false }) => {  
    const MAX_LENGTH = 125
     const [isOpenMenu, setIsOpenMenu] = useState({
        index : false,
        open: false
    })

    const handleMenu = () => {
      setCurrentReview(review)
      setIsOpen(true)
    }
    const closeMenu = () => {
       setIsOpenMenu({ open: false})
    }

    const { index, open } = isOpenMenu;

    const DropdownMenu = ({i}) => {
        return (
            <Dropdown isOpen={ open && index === i } onClose={closeMenu} className="z-50 w-auto top-4 right-2 left-auto">
                <DropdownItem className="flex mb-auto" >
                <div> <AiOutlineClose className="my-auto mr-2 text-lg" /> </div>
                <div
                    className="text-Black-medium truncate "
                    onClick = {handleMenu}
                >
                    Respond review</div>
                </DropdownItem>
            </Dropdown>
        )
    }

    return (
    <div className="p-3 bg-white border-box relative">
      <div>
        <div className="flex my-2">
          <Avatar src= {review.author.avatar} size="regular"/>
          <div className="ml-2 capitalize">
            { review.author.name } 
          </div>
        </div>
        <div className="font-bold text-lg">
          { review.title }
        </div>
        <div className="my-2 text-sm text-Black-medium dark:text-gray-400">

        { full ?
        <>
          {`${ review.review.substring(0, MAX_LENGTH)}${review.review.length > MAX_LENGTH ? "..." : ""}`}
        </>
        :
        <>
          { review.review }
        </>
        }

        </div>
      </div>
      <div className="my-2">
         <Rating
            className="mt-2 text-xl"
            emptySymbol= { <MdStarBorder/> }
            fullSymbol= { <MdStar/> }
            readonly
            initialRating={review.rating}
          />
      </div>
      { full ?
      <>
        <button
          className="absolute right-0 top-0"
          onClick={() => setIsOpenMenu({ open: !open, index: i })}>
            <div className="m-auto rounded-lg">
                <AiOutlineEllipsis className="text-Black m-auto text-2xl font-bold" />
            </div>
        </button>
        <DropdownMenu i = { i } />
        </>
       :
       null } 
    </div>
    )
}

export default ReviewCard
