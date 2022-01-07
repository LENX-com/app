import React, { useState } from 'react'
import Button from '../../../components/Buttons/Button'
import { AiOutlineHeart, AiTwotoneStar } from 'react-icons/ai'
import { AiOutlineDash } from "react-icons/ai";

const ManufacturerProfile = ({match}) => {
    
    return (
        <div className="relative my-2 min-w-sm border border-gray-100 mb-2 h-40 bg-white shadow-button">
        {/**/}
        <div className="w-full card__media">
            <img src="https://image.freepik.com/free-vector/abstract-binary-code-techno-background_1048-12836.jpg" className="h-40 w-full" />
        </div>
        <div className="Center w-full">
            <div className="bg-cover bg-center shadow-button h-20 w-20 rounded-sm bg-white m-auto" style= {{backgroundImage: "url(https://http2.mlstatic.com/D_Q_NP_871989-MLA25801430807_072017-T.webp)"}}/>
         </div>
        {/**/}
      </div>
    )
}

export default ManufacturerProfile
