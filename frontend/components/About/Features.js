import React from 'react'
import { Fade } from "react-reveal";
import Build from "../../assets/lotties/build";
import DisplayLottie from "../DisplayLottie/DisplayLottie";
import { AiTwotoneShop, AiFillDollarCircle, AiOutlineMessage } from 'react-icons/ai'
import { BiCheckShield } from "react-icons/bi";

const Features = () => {
    return (
        <div className="bg-Black pb-8 lg:pb-28 mobile:-mt-16">
            <div className="lg:grid lg:grid-cols-2 lg:gap-5 container lg:w-3/5 mx-auto mobile:px-3">
                <Fade bottom duration={1000} distance="20px">
                    <div className="text-center my-auto lg:text-left">
                        {/* <h3 className="text-base mb-6 text-orange font-bold">Created for </h3> */}
                        <h1 className="text-3xl mobile:text-2xl font-bold text-white mb-5 mobile:mt-4">
                            Earn your way
                        </h1>
                        <div className="">
                    <div className="max-w-6xl mx-auto">
                    <div className="lg:text-left">
                        <p className="text-subtitle mt-4 max-w-2xl text-Grey">
                              Find the right work for you, with great clients, at the world’s work marketplace..
                        </p>
                    </div>
                    <div className="mt-10 mobile:px-4">
                        <div className="space-y-10 md:space-y-0 md:grid md:grid-cols-2 md:gap-x-8 md:gap-y-10">
                        <div className="">
                            <div className="flex-shrink-0">
                                <div className="bg-icon flex items-center justify-center h-10 w-10 rounded-md bg-orange text-white">
                                    < AiTwotoneShop className=" h-6 w-6"/>
                                </div>
                            </div>
                            <div className="my-auto">
                                <h2 className="text-base text-left font-bold text-white mt-2 mb-3">
                                    Get more leads
                                </h2>
                                <p className="text text-Grey text-left">
                                    Wabei helps you to have instant access to thousands of quality projects.
                                </p>
                            </div>

                        </div>
                        <div className="">
                            <div className="flex-shrink-0">
                            <div className="bg-icon flex items-center justify-center h-10 w-10 rounded-md bg-orange text-white">
                                {/* Heroicon name: outline/scale */}
                                <AiFillDollarCircle className=" h-6 w-6" />
                            </div>
                            </div>
                            <div className="my-auto">
                                <h2 className="text-base text-left font-bold text-white mt-2 mb-3">
                                    Earn more
                                </h2>
                                <p className="text text-Grey text-left">
                                    Start earning what you deserve, access all sorts of projects and customers for free.
                                </p>
                            </div>
                        </div>
                        <div className="">
                            <div className="flex-shrink-0">
                                <div className="bg-icon flex items-center justify-center h-10 w-10 rounded-md bg-orange text-white">
                                    <AiOutlineMessage className=" h-6 w-6" />
                                </div>
                            </div>
                            <div className="my-auto">
                                <h2 className="text-base text-left font-bold text-white mt-2 mb-3">
                                    Easy chat
                                </h2>
                                <p className="text text-Grey text-left">
                                    Customers can interact with you and your team in real time.
                                </p>
                            </div>
                        </div>
                        <div className="mobile:hidden">
                            <div className="flex-shrink-0">
                            <div className="bg-icon flex items-center justify-center h-10 w-10 rounded-md bg-orange text-white">
                                <BiCheckShield className=" h-6 w-6" />
                            </div>
                            </div>
                            <div className="my-auto">
                                <h2 className="text-base text-left font-bold text-white mt-2 mb-3">
                                    Quality customers
                                </h2>
                                <p className="text text-Grey text-left">
                                    Choose the location you want to work in, and let customers find you.
                                </p>
                            </div>
                        </div>
                        </div>
                    </div>
                    </div>
                </div>
                    </div>

                    <div className="skills-image mx-auto my-auto">
                        <DisplayLottie animationData={Build} />
                    </div>
                </Fade>
            </div>
        </div>

    )
}

export default Features

