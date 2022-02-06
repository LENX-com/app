import React from 'react'
import Card from '@/components/Cards/Card'
import { Fade } from "react-reveal";

const HowItWorks = () => {
    return (
        <Card className="" title="How does it work?">
                <div className="grid grid-cols-2 gap-5 mobile:grid-cols-1">
                    <Fade top duration={1000} distance="20px">
                        <div className="mobile:my-2 lg:w-3/4 mx-auto lg:mt-8">
                            <div className="section rounded-md">
                                <img src="https://res.cloudinary.com/lenx2222/image/upload/v1639084389/uk-hero-static_lagpc9.png" alt="dashboard" className="rounded-md"/>
                            </div>
                        </div>
                    </Fade>
                    <div className="grid gap-5 mobile:p-4 my-3  container lg:w-3/5 mx-auto lg:grid-cols-1">
                        <Fade left duration={1000} distance="20px">
                            <div className="bg-white border-box p-3 text-Black-text lg:p-6">
                                <h1 className="text-lg font-bold my-1">1. Search the professional</h1>
                                <p className="text-base">
                                     Create an account and start connecting directly with professionals free of charge in the marketplace. 
                                </p>
                            </div>
                        </Fade>
                        <Fade right duration={1000} distance="20px">
                            <div className="bg-white border-box p-3 text-Black-text lg:p-6">
                                <h1 className="text-lg font-bold my-1">2. Contact the professional</h1>
                                <p className="text-base">
                                    Check the professional's profile, reviews and projects. If you feel there is a good fit, do not hesitate to contact them directly to book their services.
                                </p>
                            </div>
                        </Fade>
                        <Fade bottom duration={1000} distance="20px">
                            <div className="bg-white border-box p-3 text-Black-text lg:p-6">
                                <h1 className="text-lg font-bold my-1">3. Rate the professional</h1>
                                <p className="text-base">
                                    In order to maintain Wabei's high quality platform, your reviews are what gives life to the marketplace. Once the job is completed succesfuly give your honest feedback
                                </p>
                            </div>
                        </Fade>
                    </div>
                </div>
        </Card>
    )
}

export default HowItWorks
