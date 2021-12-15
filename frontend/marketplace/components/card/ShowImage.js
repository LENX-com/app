import React from 'react'
function ShowImage({item, url, clase}) {
    return (
        <>
            <img src={`${url}`} alt={item.name} className={clase}/>
        </>
    )
}

export default ShowImage 
