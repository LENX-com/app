import React from 'react'

const Button = ({children, className, ...buttonProps}) => {

    return (
        <button className= {`shadow-button cursor-pointer rounded-md Button ${className}`} {...buttonProps}>
            {children}
        </button>
    )
}

export default Button

