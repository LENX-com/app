import React, { useState, useEffect } from 'react'
import { Dropdown, DropdownItem, Input } from '@windmill/react-ui'
import { AiOutlineClose } from 'react-icons/ai'
import ReactQuill from 'react-quill'
import { getReviewsByManufacturer, sendResponse, removeResponse } from '../../actions/userActions'
import PageTitle from '../components/Typography/PageTitle'
import Button from '../../components/Buttons/Button'
import ReviewCard from '../components/reviews/ReviewCard'
import Card from '../../components/Cards/Card'
import { useSelector, useDispatch } from 'react-redux'
import parse from 'html-react-parser';
import 'react-quill/dist/quill.snow.css';
import PopUp from '../components/pop/PopUp'


const Reviews = () => {
    const [ menu, setMenu ] = useState(0)
    const [ status, setStatus] = useState(false)
    const { slug, _id } = useSelector(state => state.auth.user)
    const [ isOpen, setIsOpen ] = useState(true)
    const [ response, setResponse ] = useState("")
    const [ currentReview, setCurrentReview ] = useState(false)

    const { reviews } = useSelector( state => state.admin)

    const dispatch = useDispatch();
    

    useEffect(() => {
        dispatch(getReviewsByManufacturer(slug))
    }, [])
    
    // Everytime the current review is changed it will empty the response the manufacturer has typed
    useEffect(() => {
        setResponse("")
    }, [currentReview])
    

    console.log(currentReview)

    // Set value to react quill input
    const handleResponse = value => setResponse(value);

    const handleSubmit = (e) => {
        e.preventDefault()
        const reviewResponse = {
            response: response,
        }
        dispatch(sendResponse(currentReview.id, reviewResponse))
        setResponse("")
    }
    
    const ReviewList = () => {
        return (
            <div className="content mb-10">
        <div className="flex items-center justify-between w-full my-2 ">
        </div>
        <div className="grid gap-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
        { reviews && reviews.map((data, i)=> (
          <ReviewCard i = { i } review={data} setCurrentReview= {setCurrentReview} setIsOpen= {setIsOpen} full= { true } />
          ))}
        </div>  
      </div>
        )
    }

    const menuOptions = [ "store", "products" ]

      const handleMenu = (data, i) => {
      setMenu(i)
      setStatus(data)
    }

    const removeResponseHandler = () => {
        if(window.confirm('Delete the item?')){
            dispatch(removeResponse(currentReview.id))
        }
    }

    const SelectionMenu = () => (
        <>
        <div className="shadow-separator">
            <div className="p-2">
                <ul className="flex flex-wrap">
                    { menuOptions.map((data, i)=> (
                        <li key= { data } className= {`${menu === i ? 'border-b-2 border-orange text-Black' : 'text-Black-medium'} w-auto p-2 cursor-pointer`} >
                            <div
                                onClick = { () => handleMenu( data, i )}
                                className="capitalize">
                            {data}
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
        <div className="p-2 my-2 shadow-separator">
            <Input aria-label="Bad" placeholder="Search for reviews" className="p-2 border-2 border-border rounded-md"/>
        </div>
        </>
    )

    return (
        <div className="relative">
            <PageTitle>Reviews</PageTitle>
            <Card>
                <SelectionMenu />
                <ReviewList />
            </Card>

            {  currentReview &&
                <PopUp 
                    isOpen= { isOpen}
                    setIsOpen= { setIsOpen }
                    title= {`Respond ${currentReview?.author.name}`}
                >
                    <div className="my-3">
                        <ReviewCard review= {currentReview} />
                    </div>

                    {/* Check if the admin has already responded the review  */}
                    {currentReview.responses.some(e => e.user ===  _id) ? 
                        //filter the reviews then map the one from the manufacturer  
                        currentReview.responses.filter(e => e.user ===  _id).map(e => (
                            <div className="bg-white border-box p-4">
                                <div className="font-bold text-lg my-2"> Your response </div>
                                { parse(e.response) }
                                <button className="my-2 underline text-red-500 flex" onClick={removeResponseHandler}>
                                    <AiOutlineClose className="my-auto mr-2" />
                                    Remove response
                                </button>
                            </div>
                        ))
                     : 
                    <form onSubmit={handleSubmit}>
                        <div className="response p-2">
                        <ReactQuill
                            value= {response } 
                            placeholder= "Type your response here"
                            className="rounded-md bg-white"
                            onChange={handleResponse}
                        />
                        </div>
                        <div>
                            <Button className="my-2 bg-Black text-white" type="submit">
                                Reply review
                            </Button>
                        </div>
                    </form>
                    }
                </PopUp>
            }

        </div>  
    )
}

export default Reviews