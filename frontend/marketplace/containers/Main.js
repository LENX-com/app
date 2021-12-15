import React from 'react'

function Main({ children }) {
  return (
    <main className="">
      <div className="mx-auto min-h-screen">
        {children}
      </div>
    </main>
  )   
}

export default Main
