import React,{ Fragment} from 'react'
import {Fade, Slide, Zoom} from "react-reveal";
import { Tab } from '@headlessui/react'
import Head from 'next/head'
import Features from '@/components/About/Features'
import Faq from '@/components/About/Faq'
import ApplyToBecomeSeller from './applyToBecomeSeller'
import logo from "@/marketplace/assets/logoNew.png";
import { useMediaQuery } from 'react-responsive'
import { Swiper, SwiperSlide } from 'swiper/react';
import PageTitle from '@/components/Typography/PageTitle'
import dynamic from 'next/dynamic'
import { AiOutlineHome, AiOutlineShoppingCart, AiOutlineDollarCircle } from 'react-icons/ai'
import { Disclosure } from '@headlessui/react'
import SectionTitle from '@/components/Typography/SectionTitle'
import { Waiau } from '@/assets/patterns'
import '@/styles/Wabei.module.scss'

 // import Swiper core and required modules
import SwiperCore, { Autoplay } from 'swiper';
SwiperCore.use([ Autoplay ]);


const Wabei = () => {

  const isTabletOrMobile = useMediaQuery({ query: '(max-width: 768px)' })

    const textStyle = {
        fontWeight: "300",
        fontSize: "21px",
        lineHeight: "32px",
        color: "#424770"
    }

    const textStyle1 = {
        fontWeight: "300",
        fontSize: "16px",
        lineHeight: "22px",
        color: "#424770"
    }

    const Header = () => (
        <header className="bg-Black shadow-button sticky top-0 z-50" style={{height:'64px', zIndex:'99'}}>
            <div className="my-auto h-full relative">
                <div className="Center">
                    <img src={logo} className="w-28" alt="logo"/>
                </div>    
            </div>
        </header>
    )

    const About = () => (
        <>
            <div className="relative my-8 lg:my-12 mobile:-mb-24 lg:-mb-20">
                <div className="z-20 container lg:w-3/5 mx-auto">
                    <div className="mobile:text-center lg:text-left mobile:px-5 mobile:mb-2">
                        <h1 className="mt-6 mb-3 text-3xl mobile:text-2xl font-bold">
                            We’re reimagining E-commerce so every growing company can realize their full potential.
                        </h1>
                    </div>
                    <div className="mobile:px-5">
                        <span style={textStyle}>
                            Wabei is a <span style={{color:'#32bdc3'}}> social marketplace platform</span> created to connect small businesses directly with customers. 
                            We help our <span style={{color:'#32bdc3'}}> community of sellers to reach millions of shoppers accross the UK </span> within our marketplace.
                        </span>
                    </div>
                     { isTabletOrMobile ? (
                        <Swiper
                            spaceBetween={0}
                            slidesPerView={1}
                            autoplay={{
                                "delay": 2500,
                                "disableOnInteraction": false
                            }}
                        className="w-full mt-6"
                        >
                            <SwiperSlide>
                                <div className="">
                                    <div className="bg-cover w-full bg-center h-96 mobile:h-80" style={{background: `url(' https://res.cloudinary.com/lenx2222/image/upload/v1637421369/LaunchPop-desktop_aahve8.webp')`}} />
                                    <p className="text mt-2 text-center"> Launch Pop, a Wabei customer. </p>
                                </div>
                            </SwiperSlide>
                            <SwiperSlide>
                                <div className="">
                                    <div className="bg-cover w-full bg-center h-96 mobile:h-80" style={{background: `url('https://res.cloudinary.com/lenx2222/image/upload/v1637332125/Ferguson-desktop_weihf2.webp')`}} />
                                    <p className="text mt-2 text-center"> F. Ferguson Books, a Wabei customer. </p>
                                </div>
                            </SwiperSlide>    
                        </Swiper> 
                     ) : ( 
                        <div className="grid grid-cols-2 gap-10 lg:w-4/5 mx-auto mt-6 lg:mt-12">
                            <div className="">
                                <div className="section rounded-md bg-cover w-full bg-center h-96 mobile:h-80" style={{background: `url(' https://res.cloudinary.com/lenx2222/image/upload/v1637421369/LaunchPop-desktop_aahve8.webp')`}} />
                                <p className="text mt-2"> Launch Pop, a Wabei customer. </p>
                            </div>
                            <div className="">
                                <div className="section rounded-md bg-cover w-full bg-center h-96 mobile:h-80" style={{background: `url('https://res.cloudinary.com/lenx2222/image/upload/v1637332125/Ferguson-desktop_weihf2.webp')`}} />
                                <p className="text mt-2"> F. Ferguson Books, a Wabei customer. </p>
                            </div>
                        </div>
                    )}                    
                </div>
            </div>
            {/* <!-- begin Separator --> */}
                <div className="separator mobile:-mt-12 overflow-hidden">  
                    <svg className="separator__svg" width="100%" height="400" viewBox="0 0 100 100" preserveAspectRatio="none" fill="#222831" version="1.1" xmlns="http://www.w3.org/2000/svg">
                    <path d="M 100 100 V 10 L 0 100"/>
                    <path d="M 30 73 L 100 18 V 10 Z" strokeWidth="0"/>
                    </svg>
                </div>  
            {/* <!-- end Separator --> */}
            <Features />
            
            {/* Show dashboard */}
            <div className="py-20 mobile:py-12 bg-background">
                    <Head>
                        <title>Wabei</title>
                        <meta name="description" content="Generated by create next app" />
                        <link rel="icon" href="/favicon.ico" />
                    </Head>
                <div className="z-20 mobile:px-5 container lg:w-3/5 mx-auto">
                    <h2 className="text-3xl mobile:text-2xl font-bold text-Black-title mb-6 mobile:mt-4">
                        How does it work?
                    </h2>
                    <div className="grid grid-cols-2 gap-5 mobile:grid-cols-1">
                        <Fade top duration={1000} distance="20px">
                            <div className="mobile:my-2">
                                <div className="section rounded-md">
                                    <img src="https://res.cloudinary.com/lenx2222/image/upload/v1637328809/925336eda523f4042701e662988f3bfd.webp_dwyalz.png" alt="dashboard" className="rounded-md"/>
                                </div>
                            </div>
                        </Fade>
                        <div className="grid gap-5 mobile:p-4 my-3  container lg:w-3/5 mx-auto lg:grid-cols-1">
                            <Fade left duration={1000} distance="20px">
                                <div className="bg-white border-box p-3 text-Black-text lg:p-6">
                                    <h1 className="text-lg font-bold my-1">1. Create an account</h1>
                                    <p className="text-base"> Apply to open a store in Wabei's marketplace. </p>
                                </div>
                            </Fade>
                            <Fade right duration={1000} distance="20px">
                                <div className="bg-white border-box p-3 text-Black-text lg:p-6">
                                    <h1 className="text-lg font-bold my-1">2. Upload your products</h1>
                                    <p className="text-base"> 
                                        Upload your products, so users across the UK, can notice you and start purchasing your products.
                                        Use our inbuilt tools to optimise inventory, track sales and analyse your revenue growth.
                                    </p>
                                </div>
                            </Fade>
                            <Fade bottom duration={1000} distance="20px">
                                <div className="bg-white border-box p-3 text-Black-text lg:p-6">
                                    <h1 className="text-lg font-bold my-1">3. Delight customers with a seamless shopping experience</h1>
                                    <p className="text-base">Interact with your customers through our encrypted chat system. Post blogs and update your profile to keep your audience informed.</p>
                                </div>
                            </Fade>
                            <Fade left duration={1000} distance="20px">
                                <div className="bg-white border-box p-3 text-Black-text lg:p-6">
                                    <h1 className="text-lg font-bold my-1">4. Grow your brand and sales</h1>
                                    <p className="text-base">
                                        Wabei's technology takes care of all the tedious tasks, such as keeping track of your inventory and managing invoices. 
                                        Our platform provides you with all the infrastucture neccesary to sell and run your business within one tab, so you can focus on doing what matters the most: building your product.
                                    </p>
                                </div>
                            </Fade>
                        </div>
                    </div>
                    <div className="lg:mt-6 pb-12">
                        <a href="#become" className="grid w-3/4 mx-auto px-4 py-2 shadow-button font-bold text-base text-white bg-Blue rounded-md text-center lg:w-1/5">
                            Open your Wabei shop
                        </a>
                    </div>
                </div>
            </div>
            <Faq />
        </>
    
    
        )

    return (
        <div className="bg-white min-h-screen">
        <Header />
        <div className="relative w-full mx-auto">

            { /* strips design  */}
                <div className="SupportSite-BackgroundStripes z-50">
                    <div className="SupportSite-BackgroundStripes-Stripe-1" />
                    <div className="SupportSite-BackgroundStripes-Stripe-2" />
                    <div className="SupportSite-BackgroundStripes-Stripe-3" />
                </div>
            {/*  */}
            <div className="my-4">
                <Tab.Group>
                    <Tab.List>
                        <div className="container mx-auto lg:w-3/5">
                            <Tab as={Fragment}>
                            {({ selected }) => (
                                <button
                                className={`
                                    ${selected ? 'text-Black bg-Grey-dashboard' : 'text-Black-medium'}
                                    hover:bg-Grey-dashboard rounded-md p-3 border-box m-3
                                `}
                                >
                                    <div className ="flex">
                                        <AiOutlineHome className="my-auto h-5 w-5"/>
                                        <p className="font-bold text ml-2 my-auto"> About Wabei </p>
                                    </div>
                                </button>
                            )}
                            </Tab>
                            <Tab as={Fragment}>
                            {({ selected }) => (
                                <button
                                    className={`
                                    ${selected ? 'text-Black bg-Grey-dashboard' : 'text-Black-medium'}
                                    hover:bg-Grey-dashboard rounded-md p-3 border-box m-3
                                    `}
                                    >
                                    <div className ="flex" id= "become" >
                                        <AiOutlineShoppingCart className="m-auto h-6 w-6"/>
                                        <p className="font-bold text ml-2 my-auto"> Apply </p>
                                    </div>
                                </button>
                            )}
                            </Tab>
                        </div>
                    </Tab.List>
                    <Tab.Panels>
                        <div className="my-4">
                            <Tab.Panel>
                                <About />
                            </Tab.Panel>
                            <Tab.Panel>
                                <div className="pb-16">
                                    <ApplyToBecomeSeller />
                                </div>
                            </Tab.Panel>
                        </div>
                        </Tab.Panels>
                    </Tab.Group>
                </div>
            </div>
        </div>
    )
}

export default Wabei
