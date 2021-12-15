import { Dialog, Transition } from '@headlessui/react'
import { useState, Fragment, useRef, useEffect, } from 'react'
import { AiOutlineShoppingCart, AiOutlineClose, AiFillStar } from "react-icons/ai";
import { useSelector, useDispatch } from 'react-redux'
import Cat from '@/marketplace/assets/icons/Cat.svg'
import Button from '@/components/Buttons/Button'
import { removeCart, addToCart } from '@/redux/actions/cartActions'  
import SectionTitle from '@/components/Typography/SectionTitle'
import Link from 'next/link'
import { ToastContainer, toast } from 'react-toastify';
import _ from 'lodash'

const CartPop = () => {
  let [isOpen, setIsOpen] = useState(false);
  let completeButtonRef = useRef(null);
  const dispatch = useDispatch();
  const [ count, setCount ] = useState(1);

  const cart = useSelector((state) => state.cart.cartItems);


  function closeModal() {
    setIsOpen(false)
  }

  function openModal() {
    setIsOpen(true)
  }

  const notify = () => toast("Product deleted succesfully", {
      toastId: _.uniqueId("gfg_")
  });

  const Count = ({product}) => (
      <div className="rounded-full shadow-button inline-block">
        <div className="flex text-sm">
          <button
              className="border-r border-Grey-border focus:outline-none focus:ring-2 focus:ring-orange focus:border-transparent rounded-l-full"
              onClick= { () => dispatch(addToCart(product.product, Math.max(1, product.qty - 1)))}>
              -
          </button>
          <div className="my-auto px-3 text-xs"> { product.qty } </div>
          <button
            className="border-l border-Grey-border focus:outline-none focus:ring-2 focus:ring-orange focus:border-transparent rounded-r-full"
            onClick= {() => dispatch(addToCart(product.product, Math.min(20, product.qty + 1)))}
            >
              +
          </button>
        </div>
      </div>
  )

  const Product = ({product}) => (
           <div className="my-3 relative bg-white rounded-sm shadow-product max-w-md mx-auto overflow-hidden">
          <div className="flex dark:bg-gray-800 h-32 shadow-separator">
        <div className=" h-32 w-32 bg-cover bg-center border-2 border-border rounded-sm" style={{backgroundImage: `url(${product.photo})`, backgroundColor:'#eee'}} />
        <div className="w-2/3 p-4 md:p-4">
          <Link href= {`/marketplace/products/${product.product}`} className="underline">
            <h1 className="text-base text-gray-800 dark:text-white truncate">{ product.name }</h1>
          </Link>  
            <div className="flex">
              <AiFillStar className="text-Blue text-sm mr-1" />
              <div className="text-xs">
                4.9
              </div>
            </div>
          <div className="free-delivery bg-transparent">
            Free Delivery
          </div>
          <div className="flex justify-between mt-3 item-center">
            <h1 className="text-xl font-bold text-Black dark:text-gray-200 md:text-xl">£ {product.price} </h1>
          </div>
        </div>
      </div>
        <div className="flex justify-between p-2">
            <div className="text-base font-bold">
                <Count product= {product} />
            </div>
            <div>
                <Button onClick= {() => dispatch(removeCart(product.product))} className=" text-sm">
                        Delete
                </Button>
            </div>
        </div>
      </div>
  )

 

  return (
    <div>
        <div
            ref={completeButtonRef}>
                <div className="wrapper text-center" onClick={openModal}> 
                    <div className="icon-wrapper mt-2 text-xl">
                        <AiOutlineShoppingCart className="mx-auto" />
                    </div>
                    <div className="text-sm">
                      <p> Cart </p>
                    </div>
                </div>
        </div>

      <Transition appear show={isOpen} as={Fragment}>
        <Dialog
          as="div"
          className="fixed inset-0 overflow-y-auto"
          style={{zIndex: '999'}} 
          onClose= { () => setIsOpen(false) }
          open= { isOpen }
          initialFocus={completeButtonRef}
        >
          <div className="min-h-screen text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Dialog.Overlay className="fixed inset-0 blur-lg bg-background bg-opacity-70" />
            </Transition.Child>

            {/* This element is to trick the browser into centering the modal contents. */}
            <span
              className="inline-block h-screen align-bottom"
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
                    className="fixed h-full bottom-0 w-full max-w-md overflow-hidden text-left align-middle transition-all transform bg-background shadow-xl  overflow-y-scroll"
                    >
                <Dialog.Title
                  as="div"
                  className="border-b-2 border-Grey border-solid"
                >
                  <div className="px-4 py-2 flex bg-white"> 
                  <h2 className="text-lg font-medium leading-6 text-gray-900 mt-2"> Cart items </h2>
                  <div onClick={ () => setIsOpen(false) } className="ml-auto text-xl text-white rounded-full p-2 bg-Black">
                      <AiOutlineClose  />
                  </div> 
                  </div> 
                </Dialog.Title>
                <div className="p-2">
                {cart.length === 0 ? 
                <div className="mt-4">
                    <SectionTitle> Ooops... your cart is empty </SectionTitle>
                    <div>
                        <Cat />
                    </div>
                    <div className="grid">
                        <Link href="/" className="mx-auto">
                            <Button className="bg-orange text-white"> Search products </Button>
                        </Link>
                    </div>
                </div>
                :
                (cart && cart.map((product => (
                    <Fragment>
                      <Product product = { product } />
                    </Fragment>
                    ))))
                }
                </div>
            </div>
            </Transition.Child>

                <div className="absolute bottom-0 border-t-2 border-Grey-border p-2 bg-white"
                      style={{width:'100vw'}}>
                    {cart.length === 0 ? <div> </div> :
                    <div className="flex justify-between">
                        <div className="text-sm font-bold my-auto">
                            Subtotal £{cart.reduce((acc, item) => acc + item.qty * item.price, 0).toFixed(2)}
                        </div>
                        <div className=" w-3/5 my-auto">
                            <Button className="bg-Black text-white"> Proceed to checkout </Button>
                        </div>
                    </div>
                    }
                </div>
            </div>
            <ToastContainer/> 
        </Dialog>
      </Transition>
    </div>
  )
}

export default CartPop