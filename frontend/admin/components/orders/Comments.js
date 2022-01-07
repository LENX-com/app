import React from 'react'
import SectionTitle from '../Typography/SectionTitle'
import Rating from 'react-rating'
import { MdStarBorder, MdStar} from 'react-icons/md'
import { Avatar } from '@windmill/react-ui'
import Button from '../../../components/Buttons/Button'
import { AiOutlineComment } from 'react-icons/ai'


const Comments = ({handleReview}) => {
    return (
    <section className="my-6 bg-white p-3">
      <SectionTitle className="p-2"> 
        {`${'User-Pedro'} has left you a review`}
      </SectionTitle>
      
      <div className="border-box mb-3">
        <div className="shadow-separator">
          <div class="flex p-3">
            <div>
               <Avatar size="regular" src="https://cdn.dribbble.com/users/1615584/avatars/small/657733f5cf034c8778c3e07d4c9e4c4e.jpg?1488390406" alt="Judith" className="my-auto"/>
            </div>
            <div className="ml-3 my-auto">
              <Rating
                className="mt-2 text-base "
                emptySymbol= { <MdStarBorder/> }
                fullSymbol= { <MdStar/> }
                readonly
                initialRating={4.5}
              />
            </div>
          </div>
      </div>
      <div class="mt-3 p-3">
        <span class="font-bold">Sapien consequat eleifend!</span>
        <p class="mt-1">Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
      </div>
      <div className="ml-auto mt-2 mb-3">
          <Button className="text-sm bg-Black m-auto flex text-white shadow-none" onClick={handleReview}>  
            <AiOutlineComment className="my-auto text-lg mr-1" />
              Reply Review
          </Button>
      </div>
    </div>
  </section>
    
    )
}

export default Comments
