import React from 'react'
import { Data } from '../stories/Data'

const ChatElement = () => {
    return (
        <>
        {Data.map((data, i) => (
            <div key={ i }className="px-3 pt-1 mt-1 flex">
        <img src="https://s3.amazonaws.com/uifaces/faces/twitter/hafeeskhan/128.jpg" className=" w-12 h-12 rounded-full" alt="dp" />
        <div className="flex flex-wrap ml-4 pb-4 w-full">
          <div className="inline-flex justify-between w-full font-bold">
            Marques
            <span className="inline-flex items-center font-normal text-gray-400 text-xs">
              yesterday
            </span>
          </div>
          <div className="inline-flex w-full text-sm text-gray-500">lorem ipsum</div>
        </div>
      </div> 
        ))} 
    </>
    )
}

export default ChatElement
