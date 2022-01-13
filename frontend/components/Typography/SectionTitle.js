import React from 'react'


function SectionTitle({ children }) {
  return (
    <h2 
      className={`mb-4 text-lg font-bold text-Black-text`}
      style={{color:'#32325d'}}
    >
      {children}
    </h2>
  )}

export default SectionTitle

