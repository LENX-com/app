import React from 'react'
import { Fade } from "react-reveal";
import Build from "../../assets/lotties/build";
import DisplayLottie from "../DisplayLottie/DisplayLottie";
import { AiTwotoneShop, AiOutlineUser, AiOutlineMessage } from 'react-icons/ai'
import { BiCheckShield } from "react-icons/bi";

const Features = () => {
    return (
        <div className="bg-Black py-8 lg:pb-28 mobile:-mt-14">
            <div className="lg:grid lg:grid-cols-2 lg:gap-5 container lg:w-3/5 mx-auto mobile:px-3">
                <Fade bottom duration={1000} distance="20px">
                    <div className="text-center my-auto lg:text-left">
                        <h3 className="text-base mb-6 text-orange font-bold">Created for independant brands</h3>
                        <h1 className="text-3xl mobile:text-2xl font-bold text-white mb-5 mobile:mt-4">
                            Delight customers with a seamless shopping experience
                        </h1>
                        <div className="">
                    <div className="max-w-6xl mx-auto">
                    <div className="lg:text-left">
                        <p className="text-subtitle mt-4 max-w-2xl text-Grey">
                              The mission of Wabei is to help independant brands to sell directly their products in Wabei's platform and manage their business seamlessly within one platform.
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
                                    Original brands
                                </h2>
                                <p className="text text-Grey text-left">
                                    Wabei only works with original brands that manufacture their own products.
                                </p>
                            </div>

                        </div>
                        <div className="">
                            <div className="flex-shrink-0">
                            <div className="bg-icon flex items-center justify-center h-10 w-10 rounded-md bg-orange text-white">
                                {/* Heroicon name: outline/scale */}
                                <AiOutlineUser className=" h-6 w-6" />
                            </div>
                            </div>
                            <div className="my-auto">
                                <h2 className="text-base text-left font-bold text-white mt-2 mb-3">
                                    Community driven
                                </h2>
                                <p className="text text-Grey text-left">
                                    Wabei's marketplace helps you build your brand with our community of buyers.
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
                                    Encrypted chat
                                </h2>
                                <p className="text text-Grey text-left">
                                    Connect with customers and automate messages and your customer support with our state-of-the-art encrypted chat sytem.
                                </p>
                            </div>
                        </div>
                        <div className="">
                            <div className="flex-shrink-0">
                            <div className="bg-icon flex items-center justify-center h-10 w-10 rounded-md bg-orange text-white">
                                {/* Heroicon name: outline/annotation */}
                                <BiCheckShield className=" h-6 w-6" />
                            </div>
                            </div>
                            <div className="my-auto">
                                <h2 className="text-base text-left font-bold text-white mt-2 mb-3">
                                    Secure payments
                                </h2>
                                <p className="text text-Grey text-left">
                                    We provide the technology behind the Wabei marketplace, helping buyers and sellers connect and exchange on Wabei.
                                    Keeping those connections safe, fun and secure is our priority, and we’re always here to help you grow.
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

