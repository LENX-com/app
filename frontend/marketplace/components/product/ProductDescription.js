import React, { useState, useRef, Fragment } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import parse from 'html-react-parser';
import { AiOutlineClose, AiOutlineRight } from 'react-icons/ai'
import Button from '@/components/Buttons/Button'
import SectionTitle from '@/components/Typography/SectionTitle'
import { MdDescription, MdLocalShipping, MdVerifiedUser } from 'react-icons/md'
import { addToCart} from "@/redux/actions/cartActions";
import { useDispatch } from 'react-redux'

const ProductDescription = ({product}) => {

    const [isOpen, setIsOpen] = useState({
        state: false,
        title:"",
        content:"",
    })
    const { content, state } = isOpen;

    const completeButtonRef = useRef(null);

    const dispatch = useDispatch();

    const Warranty = () => (
        <div>
            <div>
                <SectionTitle> LENX is always on your side !</SectionTitle>
            </div>
            <div className="p-3 border-box rounded-lg my-2">
                <div>
                    We will refund your money if the item hasn't been delivered within 30 days after purchase.
                    <br/>
                    You have 2 weeks to request a refund - until day 44.
                </div>
            </div>
           <div className="p-3 border-box rounded-lg my-2">
                <div>
                    Product doesn't match the description?
                    Contact us within 30 days after you receive it!
                </div>
            </div>
           <div className="p-3 border-box rounded-lg my-2">
                <div>
                    In case of cancellation, money will be refunded to your account within 14 days.
                </div>
            </div>
        </div>
    )

    const ProductDescription = () => (
        <>
            {parse(product.description)}
        </>
    )
    const ProductDelivery = () => (
        <div>
            <div className="flex my-3">
                <span className="text-lg mr-3"> Shipping price </span>
                <h1 className="text-lg font-bold"> £{product.shippingPrice} </h1>
            </div>
            <div className="text-lg"> 
                This product takes
                <span className="font-bold text-Blue text-lg "> {product.shippingTime} </span> 
                to be shipped
            </div>
        </div>
    )

    const handleWarranty = () => {
        setIsOpen({
            state:true,
            title: "Warranty",
            content : <Warranty />
        })
    }

      const handleDescription = () => {
        setIsOpen({
            state:true,
            title: "Description",
            content : <ProductDescription />
        })
    }

       const handleDelivery = () => {
        setIsOpen({
            state:true,
            title: "Delivery Options",
            content : <ProductDelivery />
        })
    }

    return (
        <div className="bg-white rounded shadow-button relative my-2 overflow-x-hidden">
            { product &&
            <>
            <div className="flex justify-between shadow-separator p-2"
                onClick = {handleDescription}
                ref= { completeButtonRef} >
                <div className="flex">
                    <MdDescription className="my-auto mr-2 text-xl" />
                    Description
                </div>
                <AiOutlineRight className="my-auto" />
            </div>

            <div className="flex justify-between shadow-separator p-2"
                 onClick = {handleDelivery}>
                <div className="flex">
                    <MdLocalShipping className="my-auto mr-2 text-xl" />
                    Delivery Options
                </div>
                 <AiOutlineRight className="my-auto" />
            </div>

           <div className="flex justify-between p-2"
                 onClick = {handleWarranty}>
                <div className="flex">
                    <MdVerifiedUser className="my-auto mr-2 text-xl" />
                    Warranty
                </div>                       
                 <AiOutlineRight className="my-auto" />
            </div>

        <Transition appear show={state} as={Fragment}>
            <Dialog
            as="div"
            className="fixed inset-0 overflow-y-auto "
            style={{zIndex: '999'}} 
            onClose= { () => setIsOpen
                        ({state:false})
                        }
            open= { state }
            initialFocus={completeButtonRef}
            >
                <div className="min-h-screen text-center">

            {/* This element is to trick the browser into centering the modal contents. */}
                <span
                className="inline-block align-bottom"
                aria-hidden="true"
                >
              &#8203;
            </span>
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <div
                    className="absolute bottom-0 w-full max-w-md overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-t-xl overflow-y-scroll"
                    style= {{height:'60vh'}}
              >
                <Dialog.Title
                  as="div"
                  className="border-b-2 border-Grey border-solid"
                >
                  <div className="px-4 py-2 flex bg-Grey"> 
                  <h2 className="text-lg font-medium leading-6 text-gray-900 mt-2"> {isOpen && isOpen.title } </h2>
                  <div onClick={ () => setIsOpen({state: false}) } className="ml-auto text-xl text-white rounded-full p-2 bg-Black">
                      <AiOutlineClose  />
                  </div> 
                  </div> 
                </Dialog.Title>

                <div>
                    <div className="p-3">
                        {content}
                    </div>
                </div>   
            </div>
            </Transition.Child>
            </div>
        </Dialog>
      </Transition>
      </>
        }
        </div>
    )
}

export default ProductDescription
