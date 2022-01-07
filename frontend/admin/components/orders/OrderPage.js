import React, { useState } from "react";
import { HiChevronRight } from "react-icons/hi";
import { Avatar, Select, Label } from '@windmill/react-ui'
import { Link } from "react-router-dom";
import Button from '../../../components/Buttons/Button'
import Card from '../../../components/Cards/Card'
import { ListStatus } from './ListsOrder'
import { AiOutlineComment, AiOutlinePlus, AiOutlineClose } from 'react-icons/ai'
import PopUp from '../pop/PopUp'
import Comments from '../orders/Comments'


const OrderPage = () => {
  const [isOpen, setIsOpen ] = useState(false)
  const [title, setTitle ] = useState(false)
  const [content, setContent ] = useState(false)
  const [ notes, setNotes ] = useState([
      {
        note: "We need to ship this product as soon as possibel to Croatia, otherwise the customer will demand us for having a boring vibe."
      },
      { note: "The customer has explicitedly asked for support"
      }
    ])
  const fakeArray = Array(5).fill(5)
  const RANDOM_NUMBER =  Math.floor(Math.random() * 100)

  //UI Components for the PopUp
  const InputChat = () => (
    <div>
      <input className="shadow appearance-none border rounded py-2 h-28 text-Black w-full focus:outline-none focus:ring-2 focus:ring-orange focus:border-transparent p-2" />
    </div>
  )

  const InputReview = () => (
    <div>
      <input className="shadow appearance-none border rounded py-2 h-28 text-Black w-full focus:outline-none focus:ring-2 focus:ring-orange focus:border-transparent p-2" />
      <div className="absolute bottom-0 border-t-2 border-Grey-border p-2 bg-white"
        style={{width:'100vw'}}>
        <div className="grid px-2">
        <Button className="bg-Black text-white"> Post answer </Button>
        </div>
      </div>
    </div>
  )

  const ProductCard = () => (
      <div>
        <div className="flex bg-white shadow-separator px-2">
            <div className="w-2/5">
              <div className="p-3">
                <img
                  alt="ecommerce"
                  className="lg:w-1/2 lg:h-auto  h-22 w-22 object-cover object-center rounded" 
                  src="https://dummyimage.com/400x400"
                  />
              </div>
            </div>
            <div className="my-auto">
              <div className=" text-Black-medium text-sm mx-auto text-center">
                Desktop
              </div>
              <div className="p-3 my-auto font-bold text-Black text-base">
                £21.99
              </div>
              <div className="text-sm text-Black font-bold text-center">
                QTY: <span className="text-sm text-Black-medium"> { RANDOM_NUMBER } </span>
              </div>
            </div>
          </div>
        </div>
  )

  const NotesCard = ({ note }) => (
      <div
        className="relative my-3 border-box"
      >
        <div className="shadow-separator">
          <div className="p-2 flex">
            <Avatar size="regular" src="https://cdn.dribbble.com/users/1615584/avatars/small/657733f5cf034c8778c3e07d4c9e4c4e.jpg?1488390406" alt="Judith" className="my-auto"/>
            <div className="my-auto ml-2">
                <h1 className="text-sm font-bold"> Pedro </h1>
            </div>
          </div>
        </div>
        <div className="p-2">
          { note }
        </div>
        <div className="absolute top-2 right-2 p-1 bg-Grey-sd rounded-md">
          <AiOutlineClose className="text-sm text-Black"/>
        </div>
      </div>
  )

  const handleChat = () => {
    setIsOpen(true)
    setContent(<InputChat />)
    setTitle(`Contact ${'userName'}`)
  }

  const handleReview = () => {
    setIsOpen(true)
    setContent(<InputReview />)
    setTitle(`Contact ${'userName'}`)
  }

  const handleNote = () => {
    setIsOpen(true)
    setContent(<InputReview />)
    setTitle(`Contact ${'userName'}`)
  }

  const Bottom = () => (
      <div className="absolute bottom-0 border-t-2 border-Grey-border p-2 bg-white"
        style={{width:'100vw'}}>
        <div className="grid px-2">
          <Button className="bg-Black text-white"> Post answer </Button>
        </div>
      </div>
  )

  return (
    <section className="my-2">
      <div>
        <div className="flex p-2 justify-between my-5">
          <div className="flex">
            <Avatar size="large" src="https://cdn.dribbble.com/users/1615584/avatars/small/657733f5cf034c8778c3e07d4c9e4c4e.jpg?1488390406" alt="Judith" />
            <h1 className="my-auto text-lg font-bold ml-2"> Pedro </h1>
          </div>
          <div className="my-auto">
            <Button
              className="text-sm bg-white m-auto flex"
              onClick={handleChat}
            >  
              <AiOutlineComment className="my-auto text-lg mr-1" />
              Contact Pedro
            </Button>
          </div>  
        </div>
      </div>

    {fakeArray.map((data => (
      <ProductCard />
    )))}
        <div className="bg-white my-3">
          <div className="shadow-separator px-5 py-2 flex max-w-xs">
            <div className="w-1/5 font-bold text-sm p-1 m-auto"> Customer Notes </div>
            <div className="mr-auto  ml-4 w-4/5 text-center text-Black-medium p-2">
                Please Ship to my address as soon as possible
            </div> 
          </div>
        </div>

        <div className="bg-white my-3">
            <div className="shadow-separator px-5 py-2 flex max-w-xs">
              <div className="w-1/5 font-bold text-sm p-1 m-auto">  Shipping Address </div> 
              <div className="ml-2 w-4/5 text-center text-Black-medium">
                2 evergreeen, N15 6DN, London, United Kingdom
              </div>
            </div>
            <div className="shadow-separator px-5 py-2 flex max-w-xs">
              <div className="w-1/5 font-bold text-sm p-1 m-auto"> Email</div>
              <div className="mx-auto w-4/5 text-center">
                <a className="underline text-Black-medium" href="mailto:kk@gmail.com">
                  person@gmail.com
                </a>
              </div> 
            </div>
            <div className="shadow-separator px-5 py-2 flex max-w-xs">
              <div className="w-1/5 font-bold text-sm p-1 m-auto"> Payment Method </div>
              <div className="mx-auto w-4/5 text-center my-auto">
                <h1 className="text-Black-medium">
                  Paypal Checkout
                </h1>
              </div> 
            </div>
            <div className="shadow-separator px-5 py-2 flex max-w-xs">
              <div className="w-1/5 font-bold text-sm p-1 m-auto"> Total </div>
              <div className="mx-auto w-4/5 text-center">
                <h1 className="text-base text-Black-medium">
                  £239
                </h1>
              </div> 
            </div>
            <div className="shadow-separator px-5 py-2 flex max-w-xs ">
              <div className="w-1/5 font-bold text-sm p-1 m-auto"> Update Status </div>
              <div className="mx-auto w-4/5 text-center my-auto relative">
                  <ListStatus title="Update status" />
              </div> 
            </div>
          <div className="py-4 text-center">
            <Button className="bg-orange-light text-white text-sm"> Update Order </Button>
          </div>
        </div>
        

        <div className="bg-white shadow-separator px-5 py-2 max-w-xs my-3">
          <div className="mt-2">
            <Button
              className="whitespace-nowrap font-bold my-auto flex px-2 py-1 "
              onClick={handleNote}
            >
            <AiOutlinePlus className= "text-base my-auto mr-1" />
            <span className="text-sm">
              Add note
            </span>
            </Button>
          </div>
            {notes.map((({note}) => (
              <NotesCard note = { note }/>
            )))}
        </div>

        <PopUp title={title} isOpen={isOpen} setIsOpen={ setIsOpen }>
          {content && content}
        </PopUp>

        <Comments handleReview={handleReview} />

    </section>
  );
};

export default OrderPage;
