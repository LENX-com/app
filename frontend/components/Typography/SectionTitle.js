import React from 'react'


function SectionTitle({ children, ...props }) {
  return (
    <h2 
      className={`mb-4 text-lg font-bold text-Black-medium`} {...props}
      // style={{color:'#32325d'}}
    >
      {children}
    </h2>
  )}

export default SectionTitle

