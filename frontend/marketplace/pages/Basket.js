import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { removeCart, addToCart } from '../../actions/cartActions';  
import Card from '../../components/Cards/Card';
import Button from '../../components/Buttons/Button'
import animationData from '../../assets/lotties/people'
import chatData from '../../assets/lotties/chat'
import shippingData from '../../assets/lotties/shipping'
import { Link, Redirect, useHistory } from 'react-router-dom'
import {
  MdFavoriteBorder, 
  MdFavorite,
} from "react-icons/md";
import { paymentMethodProcess } from '../../actions/orderAction'
import { PayPal, Visa, MasterCard, AmericanExpress } from '../assets/icons'
import { Avatar, Label, Input } from '@windmill/react-ui'
import _ from 'lodash'
import { AiFillStar, AiFillWechat } from "react-icons/ai"; 
import SignInPop from '../components/auth/SignInPop'
import { addWishList, getWishList } from "../../actions/wishlistAction";
import MessagePop from '../components/pop/MessagePop'
import Lottie from 'react-lottie';

const Basket = () => {
    const dispatch = useDispatch();
    const cart = useSelector((state) => state.cart.cartItems);
    const [ paymentMethod, setPaymentMethod ] = useState(false)
    const [ note, setNote ] = useState("")
    const [ isOpen, setIsOpen ] = useState(false)
    const { isAuthenticated } = useSelector((state) => state.auth)
    const { wishlists } = useSelector((state) => state.wishlist);
    const subtotalPrice = cart.reduce((acc, item) => acc + item.qty * item.price, 0).toFixed(2)
    const shippingPrice = cart.reduce((acc, item) => acc + item.qty * item.shippingPrice, 0).toFixed(2) 
    const totalPrice = Math.trunc(parseInt(subtotalPrice) + parseInt(shippingPrice))
    const [ messageOpen, setMessageOpen ] = useState(false)

      
    useEffect(() => {
      dispatch(getWishList())
    }, [])

    const history = useHistory()

    
    //This functions makes the user click a pop up before removing the product, we passing the product id as a paramater.
    const handleRemoveCart = (product) => {
        if(window.confirm('Delete the item?')){
          dispatch(removeCart(product.product))
        }
    }

      const handleWishlist = (product) => (
      !isAuthenticated ? setIsOpen(true)  : dispatch(addWishList(product))
    )

      const handleMessage = (product) => ( 
      !isAuthenticated ? setIsOpen(true)  : setMessageOpen(true)
    )
      const handleCheckout = () => {
        !isAuthenticated ? setIsOpen(true) : history.push("/marketplace/checkout")
        paymentMethod && dispatch(paymentMethodProcess(paymentMethod))
      }

      const handlePayment = (e) => {
          setPaymentMethod(e.target.value)
      }

      console.log(paymentMethod)

       const defaultOptions = {
            loop: true,
            autoplay: true,
            animationData: animationData,
            rendererSettings: {
                preserveAspectRatio: "xMidYMid slice"
            }
        };
        
        const shippingOptions = {
            loop: true,
            autoplay: true,
            animationData: shippingData,
            rendererSettings: {
                preserveAspectRatio: "xMidYMid slice"
            }
        };
        
        const chatOptions = {
            loop: true,
            autoplay: true,
            animationData: chatData,
            rendererSettings: {
                preserveAspectRatio: "xMidYMid slice"
            }
        };
  
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
           <div className="my-4 relative bg-white rounded-md border-box mx-auto overflow-hidden">
          <div className="flex dark:bg-gray-800 h-48 shadow-separator">
        <div className=" h-48 w-48 bg-cover bg-center rounded-sm" style={{backgroundImage: `url(${product.photo[0].url})`, backgroundColor:'#eee'}} />
        <div className="w-2/3 p-4 md:p-4">
          <Link to= {`/marketplace/products/${product.product}`} className="underline">
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
          <div className="mt-3">
            <Count product= {product} />
          </div>
        </div>
      </div>
        <div className="flex justify-between p-2">
          <div className="flex">
            <button className="flex rounded-md p-2 hover:underline"
                    onClick = {() => handleWishlist(product.product)} >
                {/* This checks if the wishlist item is already added*/}
                <div className="my-auto ml-2 text-sm">
                  {wishlists?.some(e => e.product?._id === product.product) ? 
                    <div className="flex">
                      <MdFavorite className="w-5 h-5 my-auto mr-2"/>
                      <span> Product saved</span>
                    </div>
                  
                  : 
                    <div className="flex">  
                      <MdFavoriteBorder className="w-5 h-5 my-auto mr-2"/>
                      <span> Save for later </span> 
                    </div>
                  }
                </div>
              </button>
            </div>
            <div>
                <Button onClick= {(e) => {
                  e.preventDefault(); 
                  handleRemoveCart(product)}
                }
                  
                  className=" text-xs">
                        Delete
                </Button>
            </div>
        </div>
      </div>
  )

  const handleChange = (e) => {
    setNote(e.target.value)
  }

  const handleClick = (e) => setPaymentMethod(e.target.value)  

  


//this functions maps all orders and gets the different manufacturers for the orders
var manufacturer = []
for (let i=0; i<cart.length; i++) {
  if(!manufacturer.includes(cart[i].manufacturerId)){
    manufacturer.push(cart[i].manufacturerId)
  }
}

// This functions maps the manufacturers and assign the products to each manufacturer.
// Each manufacturer products will create a new order

var orders = manufacturer.map( data => (
 cart.filter(el => el.manufacturerId === data)
))


orders.map(data => (
  data.map(product => (
    console.log(product)
  ))
))

    return (
        <div className="lg:w-2/3 m-auto">
          <div className="grid grid-cols-3 gap-5">
            
            <div className="col-span-2 mobile:col-span-full">
              <Card className="p-4">
                  { orders && orders.map((data => (
                    <div className="mb-10 shadow-separator pb-8">
                      <div className="flex justify-between">
                        <div className="flex">
                          <Avatar src={data[0].manufacturerAvatar} />
                          <div className="my-auto ml-2">
                          {data[0].manufacturerName}
                          </div>
                        </div>
                        <div>
                          <Button className="my-auto text-sm ml-3 flex"
                                  onClick={handleMessage}>
                            <AiFillWechat className="my-auto mr-2 text-lg" />
                            Message seller
                          </Button>
                        </div>
                      </div>
                    { data.map( product => (
                    <Product product = { product } />
                    ))}
                      {/* <textarea value= {note} onChange = { handleChange } className="w-50" placeholder =  {`Add a note to ${data[0].manufacturerName} (optional)`}/> */}
                    </div>
                  )))}
              </Card>
            </div>
            
            <div className="mobile:col-span-full">
              <Card className="relative mb-0">
                <div>
                  <div className="my-3">
                    <div>
                      Select how you're paying
                    </div>

                    <div className="flex my-2">
                      <Input type="checkbox"  className="my-auto mr-3 cursor-pointer" onClick={handleClick} value="Paypal" checked={paymentMethod === "Paypal"}/>
                      <div className="border-box h-16 w-16 p-2">
                        <PayPal />
                      </div>
                    </div>
                    <div className="flex my-2">
                      <Input type="checkbox"  className="my-auto mr-3 cursor-pointer" onClick={handleClick}  value="Stripe" checked={paymentMethod === "Stripe"}/>
                      <div className="border-box h-16 w-16 p-2">
                        <Visa />
                      </div>
                      <div className="border-box h-16 w-16 p-2 mx-3">
                        <AmericanExpress />
                      </div>
                    
                      <div className="border-box h-16 w-16 p-2">
                        <MasterCard />
                      </div>
                    
                    </div>
                  </div>
                  

                <div className="my-3 text-center shadow-separator">
                  <Button className="bg-Blue text-white transform hover:scale-105 motion-reduce:transform-none mb-4 w-full mx-auto text-center"
                          onClick= {handleCheckout}
                  > 
                    Checkout out securely
                  </Button>
                </div>  
                  <div className="my-2 p-2 shadow-separator">
                    <div className="text-base text-Black-medium my-auto flex justify-between">
                      Subtotal
                      <div>
                      £{subtotalPrice}
                      </div>
                    </div>
                    <div className="text-base my-2 text-Black-medium flex justify-between">
                      Shipping Price
                      <div>
                      £{shippingPrice}
                      </div>
                    </div>
                  </div>
                  <div className="text-Black text-lg font-bold flex justify-between">
                    TOTAL PRICE
                    <div className="font-bold">
                    £{totalPrice}
                    </div>
                  </div>
                </div>           
              </Card> 
              <Card className="mt-0">
               <div>
                  <div className="flex">
                        <div>
                          <Lottie 
                            options={defaultOptions}
                            className="m-0"
                            height={50}
                            width={50}
                          />
                        </div>
                        <span className="my-auto ml-3">
                          Buy directly from brands
                        </span>
                      </div>
                      <div className="flex">
                        <div>
                          <Lottie 
                            options={shippingOptions}
                            height={75}
                            className="m-0"
                            width={50}
                            />
                        </div>
                        <span className="my-auto ml-3">
                          Fast shipping
                        </span>
                      </div>
                      <div className="flex">
                        <div>
                          <Lottie 
                            options={chatOptions}
                            height={50}
                            className="m-0"
                            width={50}
                            />
                        </div>
                        <span className="my-auto ml-3">
                          Easy chat
                        </span>
                    </div>
                </div>  
              </Card>       
            </div>                                                                                                                          
            
            {!isAuthenticated && <SignInPop isOpen={isOpen} setIsOpen ={setIsOpen} />}

            <MessagePop messageOpen={messageOpen} setMessageOpen={setMessageOpen}/>

          </div>
        </div>
    )
}

export default Basket
