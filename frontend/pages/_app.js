import '@/styles/globals.scss'
import { Provider } from 'react-redux'
import React from 'react'
import App, { Container } from 'next/app';
import store from '@/config/store'
import { SignInProvider } from "@/context/SignInContext";
import { PersistGate } from 'redux-persist/integration/react';
import { DefaultSeo } from 'next-seo';

// swiper bundle styles
import 'swiper/swiper-bundle.min.css'

// swiper core styles
import 'swiper/swiper.min.css'

// modules styles
import 'swiper/components/navigation/navigation.min.css'
import 'swiper/components/pagination/pagination.min.css'

if (process.env.NODE_ENV === 'development') {
  const whyDidYouRender = require('@welldone-software/why-did-you-render');
  whyDidYouRender(React, {
    trackAllPureComponents: true,
  });
}




function MyApp({ Component, pageProps }) {

  const DEFAULT_SEO = {
    title: 'Wabei',
    description: 'Wabei helps you find reliable professionals',
    openGraph: {
      type: 'website',
      locale: 'en_IE',
      url: 'https://www.wabei.co.uk',
      title: 'Next.js Seo',
      description: 'Wabei is the marketplace to find profesionals',
      image:
        'https://prismic-io.s3.amazonaws.com/gary-blog%2F3297f290-a885-4cc6-9b19-3235e3026646_default.jpg',
      site_name: 'wabei.co.uk',
      imageWidth: 1200,
      imageHeight: 1200
    },
    twitter: {
      handle: '@wabei',
      cardType: 'summary_large_image'
    }
  };

  return (
    <>
      <SignInProvider>   
        <Provider store={store}>
          <PersistGate persistor={store.__PERSISTOR} loading={null}>
            <DefaultSeo config={DEFAULT_SEO} />
            <Component {...pageProps} />
          </PersistGate>
        </Provider>
      </SignInProvider>
    </>
  )
}

export default MyApp
