import React from 'react'

const Button = ({children}, clase) => {
    return (
        <button className= "shadow-button bg-white rounded cursor-pointer text-Black hover:shadow-hover text-sm">
            {children}
        </button>
    )
}

export default Button
