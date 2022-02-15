import React, { useContext } from 'react';
import Button from '@/components/Buttons/Button'
import { SignInContext } from '@/context/SignInContext'
import styles from '@/styles/Home.module.css'
import Link from 'next/link'

 const textStyle = {
      fontWeight: "300",
      fontSize: "18px",
      lineHeight: "28px",
      color: "#424770"
  }


const Banner = ({products, isTabletOrMobile}) => {
  const { toggleSidebar } = useContext(SignInContext)

    return (
        <div className="bg-white lg:py-16">      
                <div className="lg:w-5/6 mx-auto grid grid-cols-2 gap-4 mobile:grid-cols-1 p-3">
                    <div className="bg-white  mobile:py-4 lg:py-4">
                        <div className="lg:w-4/5 mx-auto">
                            <div className="lg:w-3/5 mx-auto">
                            </div>
                            <h1 className="text-3xl mobile:text-2xl text-Black mb-5 mobile:mt-4">
                                The easiest way to <span className="font-bold"> hire quality services.</span>
                            </h1>
                            <span style={textStyle}>
                                Wabei is a <span> marketplace for services,</span>
                                <span className="font-bold"> that simplifies hiring small businesses and freelancers</span>.
                            </span>
                            <div className="py-6 grid grid-cols-2 gap-4 lg:w-3/4">
                                <Button className="bg-Blue text-white ">
                                    <a href="#HowItWorks">
                                        How it works?     
                                    </a>
                                </Button>
                                <Button 
                                    onClick= { toggleSidebar }
                                > 
                                    Sign up 
                                </Button>
                            </div>
                            { isTabletOrMobile && 
                                <div>
                                    <img src="https://res.cloudinary.com/lenx2222/image/upload/v1639084389/uk-hero-static_lagpc9.png" className="w-full" alt="marketplace"/>
                                </div>
                            }
                        </div>
                    </div>
                    { !isTabletOrMobile &&
                        <div>
                            <div className="relative min-h-[500px] rounded-[8px]">
                                <div>
                                    <img 
                                        className={`bg-cover h-[340px] w-[800px] mt-3 ${styles.DashboardGraphic}`}>
                                    </img>
                                    <figure className={`${styles.phoneSmall} m-auto absolute right-3 top-10`}>
                                        <div className={styles.PhoneGraphic__screen}>
                                            <img src="https://res.cloudinary.com/lenx2222/image/upload/v1644411754/WhatsApp-Image-2022-02-09-at-12.59.48_gnnwtw.webp" alt="Phone Screen" />
                                        </div>
                                    </figure>
                                </div>
                            </div>
                        </div>
                    }
                </div>
            </div>
    );
};

export default Banner;
