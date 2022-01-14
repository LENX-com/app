import React from 'react'

function PageTitle({ children }) {
  return (
    <h1 
      className="text-lg font-bold"
      style={{color:'#32325d'}}
    >
      {children}
    </h1>
  )
}

export default PageTitle
