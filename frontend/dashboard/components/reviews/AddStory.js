import React from 'react'
import { Link } from 'react-router-dom'
import Card from '../Cards/Card'

const AddStory = () => {
    return (
        <>
            <Card title="Add a story">
                <div className="bg-gradient-to-tr from-yellow-500 to-pink-600 rounded-full p-1 relative max-w-7">
                    <Link className="block bg-white p-1 rounded-full transform transition hover:-rotate-12 duration-300" href="#">
                    <img className="h-24 w-24 rounded-full" src="https://i.ibb.co/yhh0Ljy/profile.jpg" alt="inew" />
                    </Link>
                    <button className="transition duration-500 absolute bottom-0 right-0 bg-blue-700 h-8 w-8 rounded-full text-white text-2xl font-semibold border-4 border-white flex justify-center items-center hover:bg-blue-900">+</button>
                </div>
            </Card> 
        </>
    )
}

export default AddStory
