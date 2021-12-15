import React from 'react'

const Avatar = ( {src } ) => {
    return (
            <div className="h-12 w-12 md rounded-full relative avatar flex items-end justify-end min-w-max absolute flex row-start-1 row-end-3 ">
                <img className="h-12 w-12 md rounded-full relative" src= {src} alt="avatar" />
                <div className="absolute" />
            </div>
    )
}

export default Avatar
