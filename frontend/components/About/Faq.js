import React from 'react'
import { Fade } from "react-reveal";
import Entrepeneur from '@/marketplace/assets/icons/Entrepeneur.svg';

const Faq = () => {
    
    const textStyle = {
        fontWeight: "300",
        fontSize: "16px",
        lineHeight: "22px",
        color: "#424770"
    }

    return (
        <>
            <Fade left duration={1000} distance="20px">
                <div className="bg-white py-8 mobile:py-12 mobile:px-5 lg:py-16">
                    <div className="lg:w-2/5 mx-auto">
                        <div className="lg:w-3/5 mx-auto">
                            <Entrepeneur />
                        </div>
                        <h3 className="text-base mt-3 mb-6 text-Blue font-bold">Our mission</h3>
                        <h1 className="text-3xl mobile:text-2xl font-bold text-Black mb-5 mobile:mt-4">
                            The platform that democratizes e-commerce
                        </h1>
                        <p style={textStyle}>
                            We’re here to serve the next generation of businesses.
                            <br/>
                            <br/>

                            The small businesses of the future are finding it difficult to connect to brands directly. Great small brands find it difficult to showcase their products to users without a middleman. 

                            <br/>
                            <br/>
                            
                            With wabei, small businesses will have access to the infrastucture that will make this possible. 
                            Buyers can engage with your blogs, your profile, and talk directly to you over Wabei's integrated
                            and encrypted chat.
                        </p>
                    </div>
                </div>
            </Fade>
        </>
    )
}

export default Faq
