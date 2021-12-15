import React, { useState, useEffect, memo } from 'react'
import Link from 'next/link'
import { useDispatch, useSelector } from 'react-redux'
import { Tree } from '../../assets/icons'
import moment from 'moment'
import Chat from '../chat/Chat'
import { getReviewsByManufacturer } from '@/redux/actions/userActions'

const Profile = ({author}) => {
    const menuOptions = [ "About", "Reviews", "Contact" ]
     const [ menu, setMenu ] = useState(0)  
     const { reviews } = useSelector( state => state.admin)
     const [ content, setContent ] = useState("")
     
     const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getReviewsByManufacturer(author.slug))
    }, [author])

    const handleMenu = (data, i) => {
      setMenu(i)
      setContent(data)
    }

    const NoReview = () => (
        <div className="mb-4">
            <div className="m-auto text-center">
                <Tree className="text-center mx-auto my-2"/>
                <span className="font-bold"> Sorry there are no reviews available </span>
            </div>
        </div>
    )  

    const About = () => (
        <div className="p-4">
            <h1 className="font-bold text-Black mb-2 mt-1">
                {author.name} summary
            </h1>
            <div>
                {author.about}
            </div>
        </div>
    )

    const value = () => {
        switch (content) {
            case "About":
                return (
                    <About />
                );
            case "Reviews":
                return (
                    reviews.length > 0 ?
                        reviews && reviews.map( data => (
                                <div className="my-2 p-3">
                                    <ReviewCard review={data}/>
                                </div>
                        ))
                    : (
                        <>
                            <NoReview />
                        </>
                    )
                        );
            case "Contact":
                return (
                    <Chat receiver={author}/>
                );
            default:
            return <About /> ;
        }
    }

    const ReviewCard = ({review}) => (
        <div className="border-box p-3">
            <div className="flex">
                <div>
                    <img className="h-12 w-12 rounded-full" src= {review.author.avatar} alt={review.name} />
                </div>
                <div className="ml-2 m-auto">
                    <div className="text-sm ">
                        <span className="font-semibold"> {review.name} </span>
                        <div className="text-Black-medium text-xs m-auto "> { moment(review.date).startOf('hour').fromNow()} </div>
                    </div>
                </div>
            </div>
            <div className="mt-4">
                {review.review}
            </div>
        </div>
    )

    return (
        <div>
            <div className="shadow-separator relative">
                <div className="relative h-28 rounded-sm mb-3 bg-center bg-cover" style={{background: `url("${"https://assets.verishop.com/supergoop-daily-dose-with-vitamin-c-spf-40/E10023026001000-1189915515.jpg?auto=format&cs=strip&fit=max&w=1200"}")`}}>
                    <div className="Center">
                        <div className="relative p-3">
                            <section className="h-12 w-12 bg-center bg-cover shadow-button rounded-sm" style={{background: `url("${author.avatar}")`}}/>
                        </div>
                        <Link className="rounded-lg bg-Black text-white text-xs px-2 py-1 m-auto"
                            href={`/marketplace/manufacturer/${author.slug}`}>
                            See full profile
                        </Link>
                    </div>
                </div>
                <div className="grid grid-cols-3 gap-3">
                    { menuOptions.map((data, i)=> (
                        <div key= { i } className= {`${menu === i ? 'border-b-2 border-orange text-orange' : 'text-Black-medium'} w-auto text-center p-2 cursor-pointer`} >
                            <div
                                onClick = { () => handleMenu( data, i )}
                                className="capitalize">
                            {data}
                            </div>
                        </div>
                    ))}
                </div>
                {value()}
            </div>
        </div>
    )
}

export default memo(Profile)
