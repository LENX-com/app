import React from 'react'
import SectionTitle from '../Typography/SectionTitle'

const Card = ({children, title, className}) => {
    return (    
        <div className = {`bg-white rounded-sm p-3 relative my-2 ${className ? className : ""}`}>
            {title && 
                <div className="lg:ml-4 mt-4">
                    <SectionTitle> {title} </SectionTitle>
                </div>
            }
            {children}
        </div>
    )
}

export default Card
