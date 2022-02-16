import React from 'react'
import Card from '@/components/Cards/Card'
import { Fade } from "react-reveal";
import styles from '@/styles/Home.module.css'
import SectionTitle from '@/components/Typography/SectionTitle'

const HowItWorks = () => {
    return (
        <div>
            <div className="py-10 bg-white" id="HowItWorks">
                <div className=" lg:w-5/6 lg:mx-auto">
                    <SectionTitle className="text-2xl mobile:text-center mobile:mb-2"> How does Wabei work? </SectionTitle>
                    <div className="mobile:w-4/5 mx-auto lg:grid lg:grid-cols-3 lg:gap-4">
                        <div className="grid mobile:grid-cols-1 my-8 mobile:mb-12">
                            <div className=" text-Black-text lg:p-6 mb-5">
                                <h1 className="text-lg font-bold my-1 text-Black-medium mb-2">1. Post a project.</h1>
                                <p className="text-base max-w-[304px]">
                                    Create a project opening, specifying your budget, time frame and location. 
                                </p>
                            </div>
                            <figure className={`${styles.phone} my-auto`}>
                                <div className={styles.PhoneGraphic__screen}>
                                    <img src="https://res.cloudinary.com/lenx2222/image/upload/v1644352969/WhatsApp-Image-2022-02-08-at-20.34.46_zjv2cu.webp" alt="Phone Screen" />
                                </div>
                            </figure>
                        </div>
                        <Fade top duration={1000} distance="20px">
                            <div className="grid mobile:grid-cols-1 my-8 mobile:my-12">
                                <figure className={`${styles.phone} my-auto`}>
                                    <div className={styles.PhoneGraphic__screen}>
                                        <img src="https://res.cloudinary.com/lenx2222/image/upload/v1644411754/WhatsApp-Image-2022-02-09-at-12.59.48_gnnwtw.webp" alt="Phone Screen" />
                                    </div>
                                </figure>
                                <div className=" text-Black-text lg:p-6 mb-5 order-first">
                                    <h1 className="text-lg font-bold my-1 text-Black-medium mb-2">2. Review project applications. </h1>
                                    <p className="text-base max-w-[304px]">
                                        Review all the applications. You can review the professional's reviews, previous work and select the applicant that best matches your requirements.
                                    </p>
                                </div>
                            </div>
                        </Fade>
                        <Fade top duration={1000} distance="20px">
                            <div className="grid mobile:grid-cols-1 my-8 mobile:my-12">
                                <div className=" text-Black-text lg:p-6 mb-5">
                                    <h1 className="text-lg font-bold my-1 text-Black-medium mb-2">3. Write a review.</h1>
                                    <p className="text-base max-w-[304px]">
                                        Your reviews is what makes Wabei's community so special. By reviewing the job you help others make smarter decisions and hire the best professionals. 
                                    </p>
                                </div>
                                <figure className={`${styles.phone} my-auto`}>
                                    <div className={styles.PhoneGraphic__screen}>
                                        <img src="https://res.cloudinary.com/lenx2222/image/upload/v1644352969/WhatsApp-Image-2022-02-08-at-20.34.46_zjv2cu.webp" alt="Phone Screen" />
                                    </div>
                                </figure>
                            </div>
                        </Fade>

                        {/* <div className="grid grid-cols-2 gap-5 mobile:grid-cols-1">
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
                                        </div> */}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default HowItWorks

