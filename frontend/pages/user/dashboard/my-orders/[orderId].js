import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux'
import { BsLightningFill } from "react-icons/bs";
import moment from 'moment'
import Layout from '@/dashboard/containers/Layout'
import { AiOutlineClose } from 'react-icons/ai'
import { Star, EmptyStar, Tree } from '@/marketplace/assets/icons'
import Rating from 'react-rating'
import {useRouter} from 'next/router'
import * as Yup from "yup";
import withAuth from '@/components/auth'
import { Formik } from "formik";
import { AiFillEdit } from "react-icons/ai";
import MessagePop from '@/marketplace/components/pop/MessagePop'
import PopUp from '@/marketplace/components/pop/PopUp'
import Button from '@/components/Buttons/Button'
import { singleOrder, addNoteOrder, removeNoteOrder, getSingleReview } from '@/actions/orderAction'
import { RemoveReview } from '@/redux/actions/reviewsAction'
import { addReviewManufacturer } from '@/redux/actions/userActions'
import { Badge } from '@windmill/react-ui'

const SingleOrder = ({match}) => {
  const [ messageOpen, setMessageOpen ] = useState(false)
  const [ isOpen, setIsOpen ] = useState(false)
  const [ review, setReview ] = useState('')
  const [ rating, setRating ] = useState(0)
  const [ title, setTitle ] = useState('')
  const [ note, setNote ] = useState("")
  const [ok, setOk ] = useState(false)
  const [ isSubmitting, setIsSubmitting ] = useState(false)
  const { order, Id } = useSelector( state => state.order.order)
  const { singleReview } = useSelector( state => state.order)
  const { user } = useSelector( state => state.auth)
  const router = useRouter();

  const { orderId } = router.query;

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(singleOrder(orderId))
    setOk(true)
  }, [dispatch, orderId])

  useEffect(() => {
    if(order) {
    setTimeout( () => { 
      const storeId = order[0].manufacturerId._id
      dispatch(getSingleReview({storeId}))}
      , 600)
    }
  }, [order, dispatch])

  
   const iconStyle = {
   width: "20px",
   height: "20px",
   fontWeight: "600",
   }

  const addNote = (e) => {
    const formData ={
      orderId : match.params.orderId,
      note: note
    }
    e.preventDefault()
    dispatch(addNoteOrder(Id, formData))
    setIsOpen(!isOpen)
    setNote("")
    dispatch(singleOrder(match.params.orderId))
  }

  const handleRemoveNote = (noteId) => {
    const formData ={
      orderId : match.params.orderId,
      note: note,
      noteId: noteId
    }
    dispatch(removeNoteOrder(Id, formData))
    setTimeout(() => {
      dispatch(singleOrder(match.params.orderId))
    }, 300)
  }

  const handleRemoveReview = (id) => {
    dispatch(RemoveReview(id))
    setTimeout( () => { 
      const storeId = order[0].manufacturerId._id
      dispatch(getSingleReview({storeId}))}
      , 600)
    }
  
  const subtotal = order && order[0].products?.reduce((acc, item) => acc + item.qty * item.price, 0).toFixed(1 )
  const shippingPrice = order && order[0].products?.reduce((acc, item) => acc + item.qty * item.product.shippingPrice, 0).toFixed(2) 
  const totalPrice = Math.trunc(parseInt(shippingPrice) + parseInt(shippingPrice))

  const RatingReview = React.memo( () => ( 
    <Rating
      className="mt-2"
      fullSymbol= { <Star className=""style={iconStyle} /> }
      emptySymbol ={ <EmptyStar className="" style={iconStyle}/>}
      onClick={(e) => setRating(e)}
    />
   ))
   
  const RateReview = React.memo( ({rating}) => ( 
    <Rating
      className="mt-2"
      readOnly = {true}
      initialRating= {rating}
      fullSymbol= { <Star className=" w-4 h-4" /> }
      emptySymbol ={ <EmptyStar className=" w-4 h-4 "/>}
    />
   ))

  const validatorForm = Yup.object().shape({
                 title: 
                    Yup.string()
                    .required("A title is required"),
                    
                    rating:
                    Yup.number()
                    .required("Required")
                    .integer()
                    .min(1),
                    
                    review:
                    Yup.string()
                    .required("A review is required"),
                  })

     const AddReview = () => ( 
         <Formik
          initialValues={{
            rating: rating,
            title: "",
            review: "",
     
          }}

          validationSchema={validatorForm}
          validateOnChange={isSubmitting}
          validateOnBlur={isSubmitting}

          onSubmit= { async (values, {resetForm, validate}) => {


            let formData = new FormData();

            formData.append("rating", rating);
            formData.append("userId", order[0].manufacturerId._id);
            formData.append("title", values.title);
            formData.append("review", values.review);

            dispatch(addReviewManufacturer(formData))
            dispatch(singleOrder(match.params.orderId))
            resetForm({values: ''})
          }}>

              
        {(formik) => {
        const {
          values,
          handleChange,
          handleSubmit,
          errors,
          touched,
          setFieldValue,
          handleBlur,
          isValid,
          dirty
        } = formik;
        
        return (
      <form className="my-10"
            onSubmit={handleSubmit}
      >
        <div className="shadow-separator mb-2 pb-2">
        <h2 className="mb-1 text-lg font-semibold text-Black-text">Add Review </h2>
        </div>
        <div>
        <RatingReview />
        </div>
        <div>
          <input 
                className=" w-1/4 h-10 border-box p-3 my-2 mobile:w-full" 
                onChange={handleChange} 
                value={values.title} 
                placeholder="Add review's title"
                id="title"
                name="title"
          />
        {errors.title && (
          <div className="input-feedback">{errors.title}</div>
        )} 
        </div>
        <div>
          <input 
                className=" w-1/4 h-36 border-box p-3 mobile:w-full" 
                onChange={handleChange} 
                value={values.review} 
                placeholder="Add review"
                id="review"
                name="review"  
        />
        {errors.review && (
          <div className="input-feedback">{errors.review}</div>
        )} 
        </div>
        <Button className="text bg-white my-3" type="submit" > Add review </Button>
     </form>
    )
        }}
      </Formik>
    )
     

  return (
    <Layout>
            { order &&
            <section className="px-3 my-3 lg:col-span-5">
              <div className="my-5">
                  <div className="my-10">
                    <div className="shadow-separator mb-2 pb-2">
                    <h2 className="mb-1 text-lg font-semibold text-Black-text"> Products </h2>
                    </div>
                    <table class="">
                    <thead>
                      <tr>
                        <th class="w-1/2 font-bold text">Products</th>
                        <th class="w-1/4 font-bold text">Quantity</th>
                        <th class="w-1/4 font-bold text">Price</th>
                      </tr>
                    </thead>
                  { order[0].products?.map( data => 
                    <tbody>
                      <tr>
                        <td className="m-auto border border-Grey-dashboard px-4 py-2 ">
                          <div className="m-auto text-center mobile:text-auto">
                              <section className="h-12 w-12 bg-cover bg-center rounded-md shadow-button cursor-pointer mx-auto" style={{background: `url("${data.product?.photo[0].url}")`}}/>
                              <span className="capitalize text-sm"> { data.name } </span>
                          </div>
                        </td>
                        <td className="m-auto  border border-Grey-dashboard px-4 py-2 text "> { data.qty } </td>
                        <td className=" border border-Grey-dashboard px-4 py-2 font-bold text "> £{data.price} </td>
                      </tr>
                    </tbody>
                  )}
                  </table>
                  </div>


              <div className="grid grid-cols-1 gap-4 my-10">
                <div className="">
                  <div className="">
                    <div className="w-full shadow-separator pb-3">
                      <div className="flex text-Black-light text-lg">
                        <BsLightningFill className="my-auto"/>
                        <h2 className="mb-1 text-lg  font-semibold text-Black-text"> Payment </h2>
                        <div className="ml-3">
                          <Badge  type="success" className="my-auto">
                            Succeeded
                          </Badge>
                        </div>
                      </div>
                      <div className="w-1/4 mobile:w-full">
                        <div className="grid grid-cols-3">
                          <div className="border-r border-Grey mx-2 text">
                            <span className="text-Black-light"> Date </span>
                            <h1> {moment(order[0].date).format("MMM Do YY")} </h1>
                          </div>
                          <div className="border-r border-Grey mx-2 text">
                            <span className="text-Black-light"> Company </span>
                            <span className="capitalize block">{(order[0].manufacturerId.name)} </span>
                          </div>
                          <div className="border-r border-Grey mx-2 text">
                            <span className="text-Black-light"> Payment Method </span>
                            <span> PayPal </span> 
                          </div>
                        </div>
                    </div>
                  </div>
                    <div className="w-1/4 my-3 mobile:w-full">
                      <div className="text">
                        <div className="text text-Black-medium my-auto flex justify-between">
                          Subtotal
                          <div>
                            £{subtotal}
                          </div>
                        </div>
                        <div className="text my-2 text-Black-medium flex justify-between">
                          Shipping Price
                          <div>
                            £{shippingPrice}
                          </div>
                        </div>
                      </div>
                    <div className="text-Black text flex justify-between">
                      TOTAL PRICE
                      <div className="font-bold">
                        £{totalPrice}
                      </div>
                    </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="my-10">
                <div className="shadow-separator mb-2 pb-2">
                  <h2 className="mb-1 text-lg font-semibold text-Black-text"> Shipping </h2>
                </div>
                <div className="max-w-sm text">
                  <div className="flex justify-between">
                    <div className="text-Black-text">
                      Address:
                    </div>
                    <div className="text-black">
                      {order[0].shipping.address}
                    </div>
                  </div>
                  <div className="flex justify-between">
                    <div className="text-Black-text">
                      PostCode:
                    </div>
                    <div className="text-black">
                      {order[0].shipping.postalCode}
                    </div>
                  </div>
                  <div className="flex justify-between">
                    <div className="text-Black-text">
                      City:
                    </div>
                    <div className="text-black">
                      {order[0].shipping.city}
                    </div>
                  </div>
                  <div className="flex justify-between">
                    <div className="text-Black-text">
                      Mobile:
                    </div>
                    <div className="text-black">
                      {order[0].shipping.mobile}
                    </div> 
                  </div>
                </div>
                <div className="my-10">
                  <div className="shadow-separator mb-2 pb-2 flex justify-between">
                    <h2 className="mb-1 text-lg font-semibold text-Black-text">  Notes: <span className="italic text-sm mobile:hidden">(Add a note to let the seller know anything related to your order.)</span>  </h2>
                    <Button className="bg-white text flex font-bold"
                            onClick={ () => setIsOpen(true)}
                    > 
                        <AiFillEdit className="my-auto mr-2"/>
                        <span> Add Note </span> 
                    </Button>
                </div>
                  <div className="grid grid-cols-4 gap-2 my-2 w-3/4">
                    {order[0].notes.map( data =>
                      <div className="p-3 rounded-md bg-white text-Black-text text-center relative border-box">
                        <div className="my-auto text">
                        {data.text}
                        </div>
                        <div className="absolute right-2 top-2 cursor-pointer"
                            onClick ={() => handleRemoveNote(data._id)}
                        >
                          <AiOutlineClose className="text-base "/>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
              { singleReview.review && singleReview.review.length !== 0 ?
              <div className="my-10">
                <div className="shadow-separator mb-2 pb-2">
                  <h2 className="mb-1 text-lg font-semibold text-Black-text">Add Review </h2>
                </div>

                {/* ReviewCard */}
                <div className="border-box p-3 bg-white relative" style={{maxWidth: "300px"}}>
                  <div className="text font-bold">
                    { singleReview.review[0].title }
                  </div>
                  <div className="text">
                    { singleReview.review[0].review }
                  </div>
                  <RateReview rating= {singleReview.review[0].rating} />
                    <div className="absolute right-2 top-2 cursor-pointer"
                        onClick={() => handleRemoveReview(singleReview.review[0].id)}
                    >
                      <AiOutlineClose className="text-base "/>
                    </div>
                </div>

              </div>
              : 
              <AddReview />
              }
          </div>
            <PopUp isOpen={isOpen} setIsOpen={setIsOpen} title="Add note">
              <form
                onSubmit={addNote}
              >
                <div className="mobile:my-10">
                  <input className="w-full h-36 border-box p-3" onChange={ (e) => setNote(e.target.value) } value={note}/>
                </div>
                <div className="fixed bottom-0 w-full mx-auto border-t-2 border-Grey-dashboard">
                  <div className="mx-auto text-center p-2">
                    <button className="w-3/4 bg-Black font-bold mx-auto text-white rounded-md">
                      Add note
                    </button>
                  </div>
                </div>
              </form>
            </PopUp>
            <MessagePop messageOpen={messageOpen} setMessageOpen={setMessageOpen}/>
        </section>
  }
  </Layout>
  );
};

export default withAuth(SingleOrder);
