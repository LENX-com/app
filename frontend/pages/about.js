import React from 'react'
import {Fade, Slide, Zoom} from "react-reveal";
import Layout from '@/containers/Layout'
import Features from '@/components/About/Features'
import Faq from '@/components/About/Faq'
import Button from '@/components/Buttons/Button'
import Link from "next/link"
import PageTitle from '@/components/Typography/PageTitle'
import SectionTitle from '@/components/Typography/SectionTitle'

const About = () => {

    const textStyle = {
        fontWeight: "300",
        fontSize: "21px",
        lineHeight: "32px",
        color: "#424770"
    }

    return (
        <Layout>
            <div className="lg:grid lg:grid-cols-2 gap-5 relative overflow-hidden lg:my-12 mobile:-mb-24 lg:w-4/5 lg:mx-auto">
                <div className="mx-auto border-box lg:rounded-md lg:mt-8 lg:order-2">
                    <img 
                        src="/workers.jpg" 
                        alt="Picture of the author"
                        className="lg:rounded-md"
                    />
                </div>
                <div className="lg:order-1">
                    <div className="z-20 mobile:px-5 container">
                        <div className="mobile:text-center lg:px-3 lg:text-left">
                            <h1 className="my-6 lg:my-10 text-3xl mobile:text-2xl font-bold">
                                Our mission is to help you find affordable and trustworthy professionals for your project.
                            </h1>
                        </div>
                        <div>
                            <p style={textStyle} className="text-center lg:text-left">
                                Wabei is a technology company that provides a marketplace for services. In Wabei's marketplace you can connect directly with reliable professionals free of charge. 
                            </p>
                        </div>
                    </div>
                    { /* strips design  */}
                    {/* <div className="SupportSite-BackgroundStripes z-50">
                        <div className="SupportSite-BackgroundStripes-Stripe-1" />
                        <div className="SupportSite-BackgroundStripes-Stripe-2" />
                        <div className="SupportSite-BackgroundStripes-Stripe-3" />
                    </div> */}
                    {/*  */}
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
            <Faq />
        </Layout>
    )
}

export default About
