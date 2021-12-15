import React from 'react'
import {Fade, Slide, Zoom} from "react-reveal";
import { Disclosure } from '@headlessui/react'
import { Link } from 'react-router-dom'
import { FaUserShield } from "react-icons/fa";
import work from '../assets/img/work.png'
import { Up } from '../assets/icons'
import diverse from '../assets/img/diverse.webp'
import '../styles/BecomeSeller.scss'


const BecomeSeller = () => {

    const textStyle = {
        fontWeight: "300",
        fontSize: "21px",
        lineHeight: "32px",
        color: "#424770"
    }
    
    const pStyle = {
        fontWeight: "300",
        fontSize: "18px",
        lineHeight: "22px",
        color: "#424770"
    }

    const Believe = () => (
        <div className="text-center mx-auto mobile:px-4">
            <div className="text-center">
                <div className="lg:grid lg:grid-cols-2 lg:gap-5">
                <div className="mt-3 mb-6 lg:my-auto">
                    <h1 className="font-bold text-xl text-grey"> 
                        Three things we believe about 
                        <br/>
                        E-commerce.
                    </h1>
                </div>
                    <Fade bottom>
                        <div className="my-8">
                            <div className="mb-2">
                                <span 
                                    style={{border: "2px dashed #a8aaac"}}
                                    className="p-2 rounded-full text-white my-4"
                                > 
                                    1 
                                </span>
                                <h3 className="font-bold text-orange text-base my-4"> It should be low-cost and fair</h3>
                            </div>
                            <div className="text-white">
                                <p className="lg:px-4">
                                    Wabei provides you with world class infrastucture - so you can start selling to millions of shoppers for free.
                                </p>
                            </div>
                        </div>
                    </Fade>
                    <Fade left>
                        <div className="my-10">
                            <div className="mb-2">
                                <span 
                                    style={{border: "2px dashed #a8aaac"}}
                                    className="p-2 rounded-full text-white my-4"
                                > 
                                    2 
                                </span>
                                <h3 className="font-bold text-orange text-base my-4"> It should be easy </h3>
                            </div>
                            <div className="text-white">
                                <p className="lg:px-4">
                                    The core value of Wabei, is to work tiresly to provide you the best tools to run your business seamlessly within the same platform. 
                                    No more 10 different tabs open, no more 7 different pieces of software to run simple and efficient tasks, no more slow and unproductive emails.
                                </p>
                            </div>
                        </div>
                    </Fade>
                    <Fade right>
                        <div className="my-10">
                            <div className="mb-2">
                                <span 
                                    style={{border: "2px dashed #a8aaac"}}
                                    className="p-2 rounded-full text-white my-4"
                                > 
                                    3 
                                </span>
                                <h3 className="font-bold text-orange text-base my-4"> No middleman! </h3>
                            </div>
                            <div className="text-white">
                                <p className="lg:px-4">
                                    As a creator, you should be able to scale and sell your product directly to customers. 
                                    It does not make sense that in 2021 small brands still rely on distributors to launch and sell their products. 
                                    At Wabei, we believe that if your product is good - the public should be able to buy your products.
                                </p>
                            </div>
                        </div>
                    </Fade>
                </div>
            </div>
        </div>
    )

    const Faq = () => (
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
                            Wabei is a vibrant community of people that supports, promotes and celebrates local brands, products, shops etc.
                            Build and grow your brand on the Wabei platform and set an example for other businesses in your regions to grow along with you.
                            Share your uniqueness with people around the globe to showcase your culture
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
                            Being part of Wabei means helping local businesses grow organically through the Wabei platform.
                            You can either be a “Buyer” and/or “Seller” on the platform. 
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
                            If you are a “Seller” please go to the application section and make your formal application.
                            We will review your company and get back to you in 24hrs. If you are a “Buyer” then you can just create your account, fill in your details and you are ready to use Wabie. 
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
    )

    return (
        <div className="relative w-full mx-auto bg-white">
            <div className="relative overflow-hidden lg:h-96 py-10 mobile:mb-24 lg:mb-20">
                <div className="z-20 mobile:px-5 container lg:w-3/5 mx-auto">
                    <div className="lg:px-3 lg:text-left">
                        <h1 className="my-6 lg:my-10 text-3xl mobile:text-2xl font-bold">
                            We’re reimagining E-commerce so every growing company can realize their full potential.
                        </h1>
                    </div>
                    <p style={pStyle}>
                        Simple, transparent, secure.
                    </p>
                    <img src={diverse} alt="work" className="mobile:mt-6 lg:p-10 lg:w-3/5 lg:mx-auto"/>
                </div>
            </div>
            <div style={{background:'#F4EDE4'}} className="pb-8 mt-6">
                <div className="grid gap-4 mobile:px-3 lg:grid-cols-2 container lg:w-3/5 mx-auto">
                    <div className="">
                        <img src={work} alt="work" className="-mt-12"/>
                    </div>
                    <div className="my-auto">
                        <p style={textStyle} className="text-center lg:text-left">
                            <span className="text-Blue font-bold">Wabei</span> provides the infrastructure, so creators, visionaries and entrepeneurs can grow their business online. 
                        </p>
                    </div>
                </div>
                <div className="grid gap-5 mobile:p-4 my-3  container lg:w-3/5 mx-auto lg:grid-cols-2">
                    <Fade left>
                        <div className="bg-white border-box p-3 text-Black-text lg:p-6">
                            <h1 className="text-lg font-bold my-1">1. Free to sell</h1>
                            <p className="text-base"> Create an account for free and start selling directly to million of shoppers accross the U.K.</p>
                        </div>
                    </Fade>
                   <Fade right>
                        <div className="bg-white border-box p-3 text-Black-text lg:p-6">
                            <h1 className="text-lg font-bold my-1">2. Understand exactly how your business is performing</h1>
                            <p className="text-base"> Use our inbuilt tools to optmize inventory, track sales and analyse your revenue growth.</p>
                        </div>
                    </Fade>
                    <Fade bottom>
                        <div className="bg-white border-box p-3 text-Black-text lg:p-6">
                            <h1 className="text-lg font-bold my-1">3. Delight customers with a seamless shopping experience</h1>
                            <p className="text-base">Give your customers the gift of modern, frictionless, painless shopping experience.</p>
                        </div>
                    </Fade>
                    <Fade left>
                        <div className="bg-white border-box p-3 text-Black-text lg:p-6">
                            <h1 className="text-lg font-bold my-1">4. A team that's obsessed about your growth</h1>
                            <p className="text-base">
                                The mission of Wabei is to help independant brands be profitable, envied, and loved, and every thing we do
                                - from the features we build to how we hire - is done with a single goal: to guarantee your business’ success..
                            </p>
                        </div>
                    </Fade>
                </div>
            </div>
            <div className="bg-Black">
                <div className="text-white py-8 container lg:w-3/5 mx-auto">
                    <div className="mobile:px-3 flex py-10 lg:max-w-md">
                        <div className="my-auto">
                            <FaUserShield className="my-auto w-10 h-10"/>
                        </div>
                        <div className="my-auto px-3">
                            <p className="text">
                                We process payments on our secure, SSL-encrypted platform,
                                and have security specialists and fraud detection systems to protect you and your buyers 24/7.
                            </p>
                        </div>
                    </div>
                    <Believe />
                </div>
            </div>
            <div className="py-10 container lg:w-3/5 mx-auto">
                <div className="mobile:px-3">
                    <h1 className="font-bold text-xl text-Black-text">
                        Still have questions?
                    </h1>
                </div>
                <Faq />
            </div>
            <div className="pr-4 pb-12">
                <Link to="/apply" className="grid w-3/4 mx-auto px-4 py-2 shadow-button font-bold text-base text-white bg-Blue rounded-md text-center lg:w-1/5">
                    Open your Wabei shop
                </Link>
            </div>
        </div>
    )
}

export default BecomeSeller
