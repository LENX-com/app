import '@/styles/globals.scss'
import { Provider } from 'react-redux'
import store from '@/config/store'
import { SignInProvider } from "@/context/SignInContext";

import { PersistGate } from 'redux-persist/integration/react';

// swiper bundle styles
import 'swiper/swiper-bundle.min.css'

// swiper core styles
import 'swiper/swiper.min.css'

// modules styles
import 'swiper/components/navigation/navigation.min.css'
import 'swiper/components/pagination/pagination.min.css'


function MyApp({ Component, pageProps }) {

  return (
    <SignInProvider>   
      <Provider store={store}>
        <PersistGate persistor={store.__PERSISTOR} loading={null}>
          <Component {...pageProps} />
        </PersistGate>
      </Provider>
    </SignInProvider>
  )
}

export default MyApp
