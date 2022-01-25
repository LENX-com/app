import React, { Fragment, useContext, memo } from 'react'
import { Tab } from '@headlessui/react'
import { AiOutlineHome, AiOutlineUser } from 'react-icons/ai'
import Link from 'next/link'
import { Fade } from "react-reveal";
import { Disclosure } from '@headlessui/react'
import Layout from '@/containers/Layout'
import { useSelector } from 'react-redux'
import { Swiper, SwiperSlide } from 'swiper/react';
import { useMediaQuery } from 'react-responsive'
import { Up, Handyman } from '@/marketplace/assets/icons'
import { SignInContext } from '@/context/SignInContext'
import Button from '@/components/Buttons/Button'
import PageTitle from '@/components/Typography/PageTitle'

const FAQ = () => {

  const { OpenSign, closeSidebar, toggleSidebar } = useContext(SignInContext)
  const isTabletOrMobile = useMediaQuery({ query: '(max-width: 768px)' })
  const { isAuthenticated } = useSelector( state => state.auth) 

  const handleSignIn = () => {
        toggleSidebar()
  }
  

  const GeneralFAQ = React.memo(() => (
        <Fade bottom>
            <div className="my-4">
                <div className="border-t border-b border-Grey-border">
                    <Disclosure>
                        {({open}) => (
                        <>
                        <Disclosure.Button className="py-2 flex justify-between w-full">
                            <span className="text-black font-bold my-auto text-base"> What is Wabei?</span>
                            <div className="bg-Grey-dashboard rounded-full p-1 hover:bg-Grey-hover">
                                <Up
                                    className={`${
                                    open ? '' : 'transform rotate-180'
                                } text-lg text-Black-medium m-auto font-bold`}
                                />
                            </div>
                        </Disclosure.Button>
                        <Disclosure.Panel className="text-gray-500 p-3">
                            Wabei is a marketplace that empowers local professionals to offer their services directly to you. In Wabei you can find the very best professionals at extremely affordable rates.
                            Everything is about our community and we put a lot of effort to ensure that the quality of professionals is the very best.
                        </Disclosure.Panel>
                        </>
                        )}
                    </Disclosure>
                </div>
                <div className="border-b border-Grey-border">
                    <Disclosure>
                        {({open}) => (
                            <>
                        <Disclosure.Button className="py-2 flex justify-between w-full text-left">
                            <span className="text-black font-bold my-auto text-base"> Why should I use Wabei?</span>
                            <div className="bg-Grey-dashboard rounded-full p-1 hover:bg-Grey-hover">
                                <Up
                                    className={`${
                                        open ? '' : 'transform rotate-180'
                                } text-lg text-Black-medium m-auto font-bold`}
                                />
                            </div>
                        </Disclosure.Button>
                        <Disclosure.Panel className="text-gray-500 p-3">
                            Being part of Wabei means helping local professionals grow. We believe that our platform enable anybody to find a good professional at reasonable rates, 
                            you will know who you are hiring based on their review and rates, we only keep professionals that meet the highest standards of customer service. 
                        </Disclosure.Panel>
                        </>
                        )}
                    </Disclosure>
                </div>
                <div className="border-b border-Grey-border">
                    <Disclosure>
                        {({open}) => (
                            <>
                        <Disclosure.Button className="py-2 flex justify-between w-full text-left">
                            <span className="text-black font-bold my-auto text-base"> Who can be part of Wabei?</span>
                            <div className="bg-Grey-dashboard rounded-full p-1 hover:bg-Grey-hover">
                                <Up
                                    className={`${
                                        open ? '' : 'transform rotate-180'
                                } text-lg text-Black-medium m-auto font-bold`}
                                />
                            </div>
                        </Disclosure.Button>
                        <Disclosure.Panel className="text-gray-500 p-3">
                            If you are a “Professional” please go to the application section and make your formal application.
                            We will review your company and get back to you in 24hrs. If you are require a professional then you can just create your account, fill in your details and you are ready to use Wabie. 
                        </Disclosure.Panel>
                        </>
                        )}
                    </Disclosure>
                </div>
                <div className="border-b border-Grey-border">
                    <Disclosure>
                        {({open}) => (
                            <>
                        <Disclosure.Button className="py-2 flex justify-between w-full text-left">
                            <span className="text-black font-bold my-auto text-base"> Contacting Wabei? </span>
                            <div className="bg-Grey-dashboard rounded-full p-1 hover:bg-Grey-hover">
                                <Up
                                    className={`${
                                        open ? '' : 'transform rotate-180'
                                    } text-lg text-Black-medium m-auto font-bold`}
                                />
                            </div>
                        </Disclosure.Button>
                        <Disclosure.Panel className="text-gray-500 p-3">
                            If you have any questions or concerns, please contact us at  &nbsp; 
                            <a 
                                href="mailto:info@wabei.co.uk" 
                                className="font-bold text-Black-medium"
                            >
                                info@wabei.co.uk 
                            </a>
                        </Disclosure.Panel>
                        </>
                        )}
                    </Disclosure>
                </div>
            </div>
        </Fade>
    ))

      const OrderFAQ = () => (
        <Fade bottom>
            <div className="my-4">
                <div className="border-t border-b border-Grey-border">
                    <Disclosure>
                        {({open}) => (
                        <>
                        <Disclosure.Button className="py-2 flex justify-between w-full">
                            <span className="text-black font-bold my-auto text-base"> Should I be worried about privacy?</span>
                            <div className="bg-Grey-dashboard rounded-full p-1 hover:bg-Grey-hover">
                                <Up
                                    className={`${
                                    open ? '' : 'transform rotate-180'
                                } text-lg text-Black-medium m-auto font-bold`}
                                />
                            </div>
                        </Disclosure.Button>
                        <Disclosure.Panel className="text-gray-500 p-3">
                            Not at all. Privacy is at the heart of everything we do and we have designed our solutions from the ground
                            up to guarantee the privacy of every citizen. Our platform is designed to protect  personal data, and none of our
                            clients can use our technologies to gather any kind of personal data or for enforcement purposes, ever.

                            <br />

                            You can read more about our robust data privacy approach 
                            <Link href="/terms-conditions"> 
                                <div className="underline font-bold"> here  </div>
                            </Link>
                        </Disclosure.Panel>
                        </>
                        )}
                    </Disclosure>
                </div>
                <div className="border-b border-Grey-border">
                    <Disclosure>
                        {({open}) => (
                            <>
                        <Disclosure.Button className="py-2 flex justify-between w-full text-left">
                            <span className="text-black font-bold my-auto text-base"> How to succesfully book a service?</span>
                            <div className="bg-Grey-dashboard rounded-full p-1 hover:bg-Grey-hover">
                                <Up
                                    className={`${
                                        open ? '' : 'transform rotate-180'
                                } text-lg text-Black-medium m-auto font-bold`}
                                />
                            </div>
                        </Disclosure.Button>
                        <Disclosure.Panel className="text-gray-500 p-3">
                            Simply explore the marketplace and source professionals based on your needs. Contact the professional directly and let them know what type of service you are after.
                        </Disclosure.Panel>
                        </>
                        )}
                    </Disclosure>
                </div>
                <div className="border-b border-Grey-border">
                    <Disclosure>
                        {({open}) => (
                            <>
                        <Disclosure.Button className="py-2 flex justify-between w-full text-left">
                            <span className="text-black font-bold my-auto text-base"> How to contact a professional? </span>
                            <div className="bg-Grey-dashboard rounded-full p-1 hover:bg-Grey-hover">
                                <Up
                                    className={`${
                                        open ? '' : 'transform rotate-180'
                                } text-lg text-Black-medium m-auto font-bold`}
                                />
                            </div>
                        </Disclosure.Button>
                        <Disclosure.Panel className="text-gray-500 p-3">
                            You can contact the professional by either visiting their profile, and clicking on <span className="italic"> chat now </span>, or by going to your
                            <Link href="/user/dashboard/chat"> <div className="underline font-bold text-Black-medium px-1"> dashboard </div> </Link>
                            account, selecting the order and click on <span className="italic"> message professional </span>.
                        </Disclosure.Panel>
                        </>
                        )}
                    </Disclosure>
                </div>
                <div className="border-b border-Grey-border">
                    <Disclosure>
                        {({open}) => (
                            <>
                        <Disclosure.Button className="py-2 flex justify-between w-full text-left">
                            <span className="text-black font-bold my-auto text-base"> How can I review a professional? </span>
                            <div className="bg-Grey-dashboard rounded-full p-1 hover:bg-Grey-hover">
                                <Up
                                    className={`${
                                        open ? '' : 'transform rotate-180'
                                    } text-lg text-Black-medium m-auto font-bold`}
                                />
                            </div>
                        </Disclosure.Button>
                        <Disclosure.Panel className="text-gray-500 p-3">
                            Your reviews helps the community to book reliable professionals and ensure excellent customer service accross the platform. 
                            Reviewing a professionals is as easy as going to your   
                            <Link href="/user/dashboard/chat"> <div className="underline font-bold text-Black-medium px-1"> dashboard </div> </Link>
                            and selecting the order and click on <span className="italic"> review professional </span>.
                        </Disclosure.Panel>
                        </>
                        )}
                    </Disclosure>
                </div>
                
                {/* <div className="border-b border-Grey-border">
                    <Disclosure>
                        {({open}) => (
                            <>
                        <Disclosure.Button className="py-2 flex justify-between w-full text-left">
                            <span className="text-black font-bold my-auto text-base"> How much is shipping? </span>
                            <div className="bg-Grey-dashboard rounded-full p-1 hover:bg-Grey-hover">
                                <Up
                                    className={`${
                                        open ? '' : 'transform rotate-180'
                                    } text-lg text-Black-medium m-auto font-bold`}
                                />
                            </div>
                        </Disclosure.Button>
                        <Disclosure.Panel className="text-gray-500 p-3">
                            All shipping rates will vary depending on a few different factors, some of which include:
                            <br />
                            <ul className="list-disc my-2">
                                <li>
                                    Domestic vs International shipments
                                </li>
                                <li>
                                    Total weight of package
                                </li>
                                <li>
                                    Selected shipping method
                                </li>
                            </ul>
                        </Disclosure.Panel>
                        </>
                        )}
                    </Disclosure>
                </div> */}
            </div>
        </Fade>
    )

      const SellerFAQ = () => (
        <Fade bottom>
            <div className="my-4">
                <div className="border-t border-b border-Grey-border">
                    <Disclosure>
                        {({open}) => (
                        <>
                        <Disclosure.Button className="py-2 flex justify-between w-full">
                            <span className="text-black font-bold my-auto text-base"> How do fees work on Wabei</span>
                            <div className="bg-Grey-dashboard rounded-full p-1 hover:bg-Grey-hover">
                                <Up
                                    className={`${
                                    open ? '' : 'transform rotate-180'
                                } text-lg text-Black-medium m-auto font-bold`}
                                />
                            </div>
                        </Disclosure.Button>
                        <Disclosure.Panel className="text-gray-500 p-3">
                            Is completely free to post your services, we do not charge any transaction fee.
                        </Disclosure.Panel>
                        </>
                        )}
                    </Disclosure>
                </div>
                <div className="border-b border-Grey-border">
                    <Disclosure>
                        {({open}) => (
                            <>
                        <Disclosure.Button className="py-2 flex justify-between w-full text-left">
                            <span className="text-black font-bold my-auto text-base"> Why should my company use Wabei</span>
                            <div className="bg-Grey-dashboard rounded-full p-1 hover:bg-Grey-hover">
                                <Up
                                    className={`${
                                        open ? '' : 'transform rotate-180'
                                } text-lg text-Black-medium m-auto font-bold`}
                                />
                            </div>
                        </Disclosure.Button>
                        <Disclosure.Panel className="text-gray-500 p-3">
                            Wabei is a platform that allows you to post your services and manage your business with extreme ease.
                        </Disclosure.Panel>
                        </>
                        )}
                    </Disclosure>
                </div>
                <div className="border-b border-Grey-border">
                    <Disclosure>
                        {({open}) => (
                            <>
                        <Disclosure.Button className="py-2 flex justify-between w-full text-left">
                            <span className="text-black font-bold my-auto text-base"> What services can I offer on Wabei</span>
                            <div className="bg-Grey-dashboard rounded-full p-1 hover:bg-Grey-hover">
                                <Up
                                    className={`${
                                        open ? '' : 'transform rotate-180'
                                } text-lg text-Black-medium m-auto font-bold`}
                                />
                            </div>
                        </Disclosure.Button>
                        <Disclosure.Panel className="text-gray-500 p-3">
                            You can offer any tradesperson services on Wabei. 
                        </Disclosure.Panel>
                        </>
                        )}
                    </Disclosure>
                </div>
                {/* <div className="border-b border-Grey-border">
                    <Disclosure>
                        {({open}) => (
                            <>
                        <Disclosure.Button className="py-2 flex justify-between w-full text-left">
                            <span className="text-black font-bold my-auto text-base"> How do I get paid? </span>
                            <div className="bg-Grey-dashboard rounded-full p-1 hover:bg-Grey-hover">
                                <Up
                                    className={`${
                                        open ? '' : 'transform rotate-180'
                                    } text-lg text-Black-medium m-auto font-bold`}
                                />
                            </div>
                        </Disclosure.Button>
                        <Disclosure.Panel className="text-gray-500 p-3">
                            Hey
                        </Disclosure.Panel>
                        </>
                        )}
                    </Disclosure>
                </div> */}
            </div>
        </Fade>
    )

    return (
            <Layout className="relative w-full mx-auto min-h-screen bg-white">
                 <div className="pt-12 pb-8 mobile:pt-8">
                    
                    { /* strips design  */}
                        <div className="SupportSite-BackgroundStripes z-50">
                            <div className="SupportSite-BackgroundStripes-Stripe-1" />
                            <div className="SupportSite-BackgroundStripes-Stripe-2" />
                            <div className="SupportSite-BackgroundStripes-Stripe-3" />
                        </div>
                    {/*  */}


                    <div className="relative -20 container lg:w-3/5 mx-auto">
                        <div className="mobile:px-5">
                            <PageTitle> Hello, how can we help?</PageTitle>
                        </div>
                        { !isAuthenticated && 
                            <div className="my-4 mobile:px-5">
                                <h1 className="font-bold"> Log in for personalised support </h1>
                                <p className="text"> Get help with your reservations, account, and more. </p>
                                <div className="grid grid-cols-2 gap-4 lg:w-1/5 my-3">
                                        <Button
                                            className=" font-bold text bg-white"
                                        >
                                            <Link href="/signup" className="font-bold text">
                                                Sign Up
                                            </Link>
                                        </Button>
                                    <Button
                                        className="bg-Black text-white font-bold text"
                                        onClick= { handleSignIn }
                                    >
                                        Log In
                                    </Button>
                                </div>
                            </div>
                        }
                        <div className="my-6">
                            <Tab.Group>
                                <div className="mb-10 mobile:px-5">
                                    {
                                        isTabletOrMobile ? (
                                            <Swiper
                                                freeMode={true}
                                                slidesPerView={2}
                                                spaceBetween={20}
                                            >
                                                 <Tab.List>
                                                     <SwiperSlide
                                                        className="w-28"
                                                     >
                                                        <Tab as={Fragment}>
                                                        {({ selected }) => (
                                                            <button
                                                            className={`
                                                                ${selected ? 'bg-Blue text-white' : 'bg-white text-black'}
                                                                w-28 bg-white shadow-button p-3 rounded-md h-24 m-3
                                                            `}
                                                            >
                                                                <div className ="">
                                                                    <AiOutlineHome className="m-auto h-8 w-8"/>
                                                                    <p className="font-bold"> Getting started </p>
                                                                </div>
                                                            </button>
                                                        )}
                                                        </Tab>
                                                    </SwiperSlide>

                                                    <SwiperSlide
                                                        className="w-28"
                                                    >
                                                        <Tab as={Fragment}>
                                                        {({ selected }) => (
                                                            <button
                                                            className={`
                                                                ${selected ? 'bg-Blue text-white' : 'bg-white text-black'}
                                                                bg-white shadow-button p-3 rounded-md h-24 m-3 w-28
                                                            `}
                                                            >
                                                                <div className ="">
                                                                    <AiOutlineUser className="m-auto h-8 w-8"/>
                                                                    <p className="font-bold"> Customers </p>
                                                                </div>
                                                            </button>
                                                        )}
                                                        </Tab>
                                                    </SwiperSlide>

                                                     <SwiperSlide
                                                        className="w-28"
                                                     >
                                                        <Tab as={Fragment}>
                                                        {({ selected }) => (
                                                            <button
                                                            className={`
                                                                ${selected ? 'bg-Blue text-white' : 'bg-white text-black'}
                                                                bg-white shadow-button p-3 rounded-md h-24 m-3 w-28
                                                            `}
                                                            >
                                                                <div className ="">
                                                                    <Handyman className="m-auto h-8 w-8"/>
                                                                    <p className="font-bold"> Professionals </p>
                                                                </div>
                                                            </button>
                                                        )}
                                                        </Tab>
                                                    </SwiperSlide>

                                                </Tab.List>
                                            </Swiper>
                                        ) : (
                                    <Tab.List>
                                        <Tab as={Fragment}>
                                        {({ selected }) => (
                                            <button
                                            className={`
                                                ${selected ? 'bg-Blue text-white' : 'bg-white text-black'}
                                                    lg:w-36 bg-white shadow-button p-3 rounded-md h-24 m-3
                                            `}
                                            >
                                                <div className ="">
                                                    <AiOutlineHome className="m-auto h-8 w-8"/>
                                                    <p className="font-bold"> Getting started </p>
                                                </div>
                                            </button>
                                        )}
                                        </Tab>
                                        <Tab as={Fragment}>
                                        {({ selected }) => (
                                            <button
                                            className={`
                                                ${selected ? 'bg-Blue text-white' : 'bg-white text-black'}
                                                    lg:w-36 bg-white shadow-button p-3 rounded-md h-24 m-3
                                            `}
                                            >
                                                <div className ="">
                                                    <AiOutlineUser className="m-auto h-8 w-8"/>
                                                    <p className="font-bold"> Customers </p>
                                                </div>
                                            </button>
                                        )}
                                        </Tab>
                                        <Tab as={Fragment}>
                                        {({ selected }) => (
                                            <button
                                            className={`
                                                ${selected ? 'bg-Blue text-white' : 'bg-white text-black'}
                                                    lg:w-36 bg-white shadow-button p-3 rounded-md h-24 m-3
                                            `}
                                            >
                                                <div className ="">
                                                    <Handyman className="m-auto h-8 w-8"/>
                                                    <p className="font-bold"> Professionals </p>
                                                </div>
                                            </button>
                                        )}
                                        </Tab>
                                    </Tab.List>
                                        )
                                    }
                                </div>
                                <Tab.Panels>
                                    <div className="my-4 bg-white">
                                        <Tab.Panel>
                                            <GeneralFAQ />
                                        </Tab.Panel>
                                        <Tab.Panel>
                                            <OrderFAQ />
                                        </Tab.Panel>
                                        <Tab.Panel>
                                            <SellerFAQ />
                                        </Tab.Panel>
                                    </div>
                                </Tab.Panels>
                            </Tab.Group>
                        </div>
                    </div>
                </div>
            </Layout>

    )
}

export default memo(FAQ);
