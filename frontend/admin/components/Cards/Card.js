import React from 'react'
import SectionTitle from '../Typography/SectionTitle'

const Card = ({children, title}) => {
    return (    
        <div className="mt-3 bg-white rounded p-3 border-solid border-2 border-Grey relative">
            {title && <SectionTitle> {title} </SectionTitle>}
            {children}
        </div>
    )
}

export default Card
