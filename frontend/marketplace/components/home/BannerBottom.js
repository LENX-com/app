import React from 'react'
import { Fade } from "react-reveal";
import Entrepeneur from '@/marketplace/assets/icons/Entrepeneur.svg';

const BannerBottom = () => {
    
    const textStyle = {
        fontWeight: "300",
        fontSize: "16px",
        lineHeight: "22px",
        color: "#424770"
    }

    return (
        <>
            <Fade left duration={1000} distance="20px">
                <div className="bg-white mobile:py-8 mobile:px-5 lg:py-10">
                    <div className="lg:w-3/5 mx-auto">
                        <div className="lg:w-3/5 mx-auto">
                            <Entrepeneur />
                        </div>
                        <h3 className="text-base mt-3 mb-6 text-Blue font-bold">Our mission</h3>
                        <h1 className="text-3xl mobile:text-2xl font-bold text-Black mb-5 mobile:mt-4">
                            The platform that democratizes work
                        </h1>
                        <p style={textStyle}>
                            The workers of the future are finding it difficult to connect to customers directly. Wabei helps customers to find reliable professionals. 

                            <br/>
                            <br/>
                            
                            With wabei, you will never have to worry about hiring the right person for the job. In our platform, we only work with honest and reliable professionals, your payment will not be transferred to the professional, until the job is completed satisfactorily.
                        </p>
                    </div>
                </div>
            </Fade>
        </>
    )
}

export default BannerBottom
