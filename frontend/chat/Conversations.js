import React from 'react'
import moment from 'moment'

const Data = [
    {
    name: "James",
    date: moment().format("MMM Do YY"),
    conversation: "Hey dude how are ya",
    },
    {
    name: "Matt",
    date: moment().format("MMM Do YY"),
    conversation: "You want to go to a fancy restaurant?",
    },
    {
    name: "Bratt",
    date: moment().format("MMM Do YY"),
    conversation: "I think you smell",
    },
    {
    name: "Jamie",
    date: moment().format("MMM Do YY"),
    conversation: "Lets code and make bugs",
    },
]

const Conversations = () => {
    return (
        <>
        {Data.map((data, i) => (
            <div key={ i }className="px-3 pt-1 mt-1 flex">
        <img src="https://cdn.sanity.io/images/oijolsw2/production/9cdbe9096481b529d2cb2e0044808b91cf1942b9-800x879.png?w=1000&auto=format" className=" w-12 h-12 rounded-full" alt="dp" />
        <div className="flex flex-wrap ml-4 pb-4 w-full">
          <div className="inline-flex justify-between w-full font-bold">
            {data.name}
            <span className="inline-flex items-center font-normal text-gray-400 text-xs">
              {data.date}
            </span>
          </div>
          <div className="inline-flex w-full text-sm text-gray-500"> { data.conversation} </div>
        </div>
      </div> 
        ))} 
    </>
    )
}

export default Conversations
