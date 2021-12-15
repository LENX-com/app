import React, { useState } from 'react'
import Button from '../../../components/Buttons/Button'
import { AiOutlineHeart, AiTwotoneStar, AiFillWechat } from 'react-icons/ai'
import {followManufacturer} from "../../../actions/userActions"
import PopUp from '../pop/PopUp'
import Chat from '../chat/Chat'
import {useDispatch, useSelector } from "react-redux"
import { Link } from 'react-router-dom'
import SignInPop from '../auth/SignInPop'

const ManufacturerProfile = ({match, isOpenSign, setIsOpenSign, profile}) => {
    const dispatch = useDispatch();
    const [ isOpen, setIsOpen ] = useState(false)
    const { user, isAuthenticated } = useSelector((state) => state.auth);
    
    return (
        <>
        <div className="relative my-2 min-w-sm border border-gray-100 mb-2 h-60 bg-white shadow-button">
        {/**/}
        <div className="w-full mobile:h-32 mobile:w-96 h-36 bg-cover bg-center" style={{background: `url("${profile.bgImage}")`}}/>
        <div className="absolute top-3 right-2 bg-white rounded-full p-2 ">
            <div className="flex font-bold">
                <AiOutlineHeart className="my-auto mr-2" />
                2.3k
            </div>
        </div>
        <div className="Center w-full">
            <div className="bg-cover bg-center shadow-button h-20 w-20 rounded-sm bg-white m-auto transform transition hover:-rotate-6 cursor-pointer duration-300" style= {{backgroundImage: `url("${profile.avatar}")`}}/>
            <div className="text-center">
                <h1 className="font-bold text-2xl mt-1"> {profile.name} </h1>
            </div>
         </div>
        <div className="p-2 absolute bottom-0 w-full">
          <div>
            <div className="grid grid-cols-2">
                <div className="ml-auto my-auto">
                    <Button className="border-2 border-Blue text-Blue rounded shadow-none mr-1" onClick={()=> dispatch(followManufacturer(match.params.manufacturerId))}> Follow </Button>
                </div>
                <div className="mr-auto">
                    <Button
                        onClick={() => setIsOpen(true)} 
                        className="bg-Blue text-white flex">
                         <AiFillWechat className="my-auto text-lg mr-2"/>
                        Chat now
                    </Button>
                </div>
            </div>
          </div>
        </div>
        {/**/}
      </div>
      <PopUp isOpen={isOpen} setIsOpen={setIsOpen} >
          <Chat />
      </PopUp>
      { !isAuthenticated && <SignInPop  isOpen={ isOpenSign } setIsOpen={ setIsOpenSign } /> }
      </>
    )
}

export default ManufacturerProfile
