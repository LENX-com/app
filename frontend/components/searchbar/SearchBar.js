import React from 'react'
import { AiOutlineSearch } from 'react-icons/ai'

const SearchBar = ({className, placeholder}) => {
    return (
        <>
            <div className= {`relative border-2 border-gray-300 bg-white h-10 w-full flex rounded-lg text-sm focus:outline-none${className ? className : "" }`}>
                <AiOutlineSearch className="text-2xl text-Black my-auto mr-2 ml-1"/> 
                <input className="p-2" type="search" name="search" placeholder= {placeholder} />
            </div>   
        </>
    )
}

export default SearchBar
