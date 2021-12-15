import React, { Suspense,lazy } from 'react'
import Header from '@/marketplace/components/header/Header'
import Main from '@/marketplace/containers/Main'
import Footer from '@/marketplace/components/footer/Footer'
import ThemedSuspense from './ThemesSuspense'


function Layout({children}) {

  return (
      <> 
        <Header />
         <Main>
          {/* <Suspense fallback={<ThemedSuspense />}> */}
            { children }
          {/* </Suspense> */}
        </Main>
       <Footer />
      </> 
  )
}

export default Layout
  