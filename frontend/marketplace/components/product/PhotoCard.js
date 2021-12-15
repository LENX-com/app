import React from 'react'
import { AiOutlineHeart } from 'react-icons/ai'

const PhotoCard = () => {

    const Like = () => (
    <svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="presentation" focusable="false" style={{display: 'block', fill: 'RGBA(0, 0, 0, 0.5)', height: '24px', width: '24px', stroke: 'RGB(255, 255, 255)', strokeWidth: 2, overflow: 'visible'}}><path d="m16 28c7-4.733 14-10 14-17 0-1.792-.683-3.583-2.05-4.95-1.367-1.366-3.158-2.05-4.95-2.05-1.791 0-3.583.684-4.949 2.05l-2.051 2.051-2.05-2.051c-1.367-1.366-3.158-2.05-4.95-2.05-1.791 0-3.583.684-4.949 2.05-1.367 1.367-2.051 3.158-2.051 4.95 0 7 7 12.267 14 17z" /></svg>
    )
    return (
        <div className="relative rounded-md bg-cover bg-center h-36" style= {{background: `url("https://i.etsystatic.com/9524040/c/1257/999/360/1779/il/7a575e/2221507815/il_340x270.2221507815_hzle.jpg")`}}>
         <div className="absolute top-2 right-2">
             <Like className="text-2xl text-white" />
         </div>
        </div>
    )
}

export default PhotoCard  
