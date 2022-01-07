import React from 'react'
import Card from './Card'

const UserCard = ({user, description}) => {
  return( 
        <div className="pt-20">
        <div className="flex items-center justify-center mb-10">
          <div className=" px-5 py-3 bg-white rounded-sm shadow-button mx-auto">
            <div className="" style={{clipPath: 'url(#roundedPolygon)'}}>
              <img className="w-16 h-16 -mt-12 rounded-md mb-3 mx-auto" src={user.avatar} alt="WABEI" />
            </div>
            <div className="flex flex-col space-y-4">
              <div className="flex flex-col items-center md:items-start">
                <h2 className="text-xl font-medium">{user.name}</h2>
                <p className="text-base font-medium text-gray-400">{description}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
  )
}

export default UserCard