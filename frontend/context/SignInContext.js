import React, { useState, useMemo } from 'react'

// create context
export const SignInContext = React.createContext(false)

export const SignInProvider = ({ children }) => {
  const [OpenSign, setOpenSign] = useState(false)

  function toggleSidebar() {
    setOpenSign( true )
  }

  function closeSidebar() {
    setOpenSign(false)
  }

  const value = useMemo(
    () => ({
      OpenSign,
      toggleSidebar,  
      closeSidebar,
      setOpenSign
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [OpenSign]
  )

  return <SignInContext.Provider value={value}>{children}</SignInContext.Provider>
}