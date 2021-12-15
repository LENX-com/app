import React from 'react'

const Button = ({children, className, ...buttonProps}) => {

    return (
        <button className= {`shadow-button rounded cursor-pointer hover:shadow-hover   ${className}`} {...buttonProps} >
            {children}
        </button>
    )
}

export default Button

