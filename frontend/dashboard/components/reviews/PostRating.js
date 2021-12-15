import React from 'react'
import { MdStar, MdStarBorder, MdFavoriteBorder } from "react-icons/md";
import Card from '../Cards/Card'
import Rating from 'react-rating'

const PostRating = () => {
    return (
        <>
        <Card>
            <section className="content bg-cover bg-center h-64 rounded-2xl" style={{backgroundImage: 'url(https://images.unsplash.com/photo-1532274402911-5a369e4c4bb5?ixid=MXwxMjA3fDB8MHxzZWFyY2h8MTh8fGxhbmRzY2FwZXxlbnwwfHwwfA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=900&q=100)'}}>
                <div className="flex items-end w-full h-full bg-black bg-opacity-20 text-white text-sm font-bold  p-4 rounded-2xl">
                <div className="w-1/2 flex items-center flex-row-reverse absolute right-4">
                    <svg className="w-6 h-6 ml-2 place-items-end group-hover:animate-ping absolute " />
                    <MdFavoriteBorder className="w-6 h-6 ml-2 place-items-end relative"/>
                    <span className="place-items-end">106</span>
                </div>
            </div>
            </section>
            <form className="text-3xl" target="_self" method="GET">
                <Rating
                    className="mt-3"
                    emptySymbol= { <MdStarBorder/> }
                    fullSymbol= { <MdStar/> }
                />         
            </form>
        </Card>
        </>
    )
}

export default PostRating

