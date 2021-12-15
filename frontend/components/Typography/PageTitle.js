import React from 'react'

function PageTitle({ children }) {
  return (
    <h1 
      className="my-6 text-2xl font-bold"
      style={{color:'#32325d'}}
    >
      {children}
    </h1>
  )
}

export default PageTitle
