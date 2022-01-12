import React from 'react'

const UserCard = ({ user }) => {
  return(
      <>
        <div className="w-full card__media"><img src="https://image.freepik.com/free-vector/abstract-binary-code-techno-background_1048-12836.jpg" className="h-48 w-96" /></div>
        <div className="  card__media--aside " />
        <div className="flex items-center p-4">
          <div className="relative flex flex-col items-center w-full">
            <div className="h-24 w-24 md rounded-full relative avatar flex items-end justify-end text-purple-600 min-w-max absolute -top-16 flex bg-purple-200 text-purple-100 row-start-1 row-end-3 text-purple-650 ring-1 ring-white">
              <img className="h-24 w-24 md rounded-full relative" src="https://avatars3.githubusercontent.com/u/11801238?v=4" alt="" />
              <div className="absolute" />
            </div>
            <div className="flex flex-col space-y-1 justify-center items-center -mt-12 w-full">
              <span className="text-md whitespace-nowrap text-gray-800 font-bold capitalize">{user.name}</span><span className="text-md whitespace-nowrap text-gray-600">boussadjra</span>
            </div>
          </div>
        </div>
      </>
  )
}

export default UserCard