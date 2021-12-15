import React from 'react'


function SectionTitle({ children }) {
  return (
    <h2 
      className={`mb-4 text-lg font-bold dark:text-gray-300`}
      style={{color:'#32325d'}}
    >
      {children}
    </h2>
  )}

export default SectionTitle

