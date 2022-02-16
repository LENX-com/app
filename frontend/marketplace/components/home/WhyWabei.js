import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';

 const textStyle = {
      fontWeight: "300",
      fontSize: "38px",
      lineHeight: "40px",
      color: "white",
  }

const banners = [
    {
        title: "We love small businesses",
        text: "We provide the infrastucture to help you find quality people for your projects.",
        image: 'https://res.cloudinary.com/lenx2222/image/upload/v1639073084/istockphoto-1298550035-170667a_esvmii.jpg'
    },
    {
        title: "Community Marketplace",
        text: "Know who you are hiring based on their profile and reviews.",
        image: 'https://res.cloudinary.com/lenx2222/image/upload/v1639076227/photo-1461938337379-4b537cd2db74_gnwhl3.jpg'
    },
    {
        title: "Ease of use",
        text: "Our dashboard makes it easier for you to manage your project from beginning to end.",
        image: 'https://res.cloudinary.com/lenx2222/image/upload/v1639076011/istockphoto-1333405308-170667a_dlx5re.jpg'
    },
]

const Banner = ({products, isTabletOrMobile}) => {
    return (
        <div>
            <div className="bg-Black lg:py-16 mobile:pb-12 pt-8">
                <div className="lg:w-4/6 mx-auto">
                    <div className="mobile:py-4 lg:py-4">
                        <div className="mx-auto mobile:py-3 mobile:px-5">
                            <div className="">
                            <h1 className="text-lg font-bold text-blue mb-5 mobile:mt-4">
                                Why Wabei?
                            </h1>
                            <span style={textStyle}>
                                Wabei simplifies your projects.
                            </span>
                        </div>
                            { !isTabletOrMobile ? (
                                <div className="grid grid-cols-3 gap-5 my-8 lg:px-3">
                                    { banners.map( data => 
                                        <div className="h-80 rounded-md" style={{background:'#393e46'}}>
                                            <section 
                                                className="bg-cover bg-center h-36 w-full rounded-t-md" 
                                                style={{backgroundImage:`url(${data.image})`}} 
                                            />
                                            <div className="h-44 p-6">
                                                <h2 className="font-bold text-lg text-Grey"> {data.title} </h2>
                                                <p 
                                                    className="text-base mt-3"
                                                    style={{color:'#c5c5c5'}}
                                                > 
                                                    { data.text } 
                                                </p>
                                            </div>
                                        </div>
                                    )}
                                </div>
                                
                                ) : (
                                    <Swiper
                                        slidesPerView= {1}
                                        className="w-full mt-8"
                                        spaceBetween={25}
                                        freeMode={true}
                                    >
                                        {banners.map( data => 
                                            <SwiperSlide className="h-[22rem] rounded-md w-5/6" style={{background:'#393e46'}}>
                                                <section 
                                                    className="bg-cover bg-center h-40 w-full rounded-t-md" 
                                                    style={{backgroundImage:`url(${data.image})`}} 
                                                />
                                                <div className="h-44 px-8 py-3">
                                                    <div className="h-1/3">
                                                        <h2 className="font-bold text-xl text-Grey"> {data.title} </h2>
                                                    </div>
                                                    <div className="h-1/2">
                                                        <p 
                                                            className="text-base mt-3"
                                                            style={{color:'#c5c5c5'}}
                                                        > 
                                                            { data.text } 
                                                        </p>
                                                    </div>
                                                </div>
                                            </SwiperSlide>
                                        )}
                                    </Swiper>
                                )
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Banner;
