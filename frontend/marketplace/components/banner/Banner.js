import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import Card from '@/components/Cards/Card'
import Link from 'next/link'

 const textStyle = {
      fontWeight: "300",
      fontSize: "18px",
      lineHeight: "28px",
      color: "#424770"
  }

const banners = [
    {
        title: "Choose what you want",
        text: "Find the right person for your project.",
        image: 'https://res.cloudinary.com/lenx2222/image/upload/v1639073084/istockphoto-1298550035-170667a_esvmii.jpg'
    },
    {
        title: "Know who you are hiring",
        text: "Hire a reliable and trusted professional, with full transparency.",
        image: 'https://res.cloudinary.com/lenx2222/image/upload/v1639076227/photo-1461938337379-4b537cd2db74_gnwhl3.jpg'
    },
    {
        title: "Get the best quality/value",
        text: "Hiring professionals was never easier, cheaper and faster.",
        image: 'https://res.cloudinary.com/lenx2222/image/upload/v1639076011/istockphoto-1333405308-170667a_dlx5re.jpg'
    },
]

const Banner = ({products, isTabletOrMobile}) => {
    return (
        <div className="">      
                <Card>
                    <div className="bg-white  mobile:py-4 lg:py-4">
                        <div className="lg:w-4/5 mx-auto">
                            <div className="lg:w-3/5 mx-auto">
                            </div>
                            <h1 className="text-3xl mobile:text-2xl text-Black mb-5 mobile:mt-4">
                                The easiest way for people <span className="font-bold">to find reliable professionals</span>
                            </h1>
                            <span style={textStyle}>
                                Wabei is a <span> marketplace platform</span> created to help our 
                                <span style={{color:'#32bdc3'}}> community of professionals to reach millions of customers accross the UK </span> within our marketplace.
                            </span>
                            { !isTabletOrMobile ? (
                                <div className="grid grid-cols-3 gap-5 my-8 lg:px-6">
                                    { banners.map( data => 
                                        <div className="h-80 rounded-md" style={{background:'#F6F7F8'}}>
                                            <div className="h-44 p-10">
                                                <h2 className="font-bold text-xl text-Black"> {data.title} </h2>
                                                <p className="text mt-6"> { data.text } </p>
                                            </div>
                                            <section 
                                                className="bg-cover bg-center h-36 w-full rounded-b-md" 
                                                style={{backgroundImage:`url(${data.image})`}} 
                                            />
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
                                            <SwiperSlide className="h-80 rounded-md w-5/6" style={{background:'#F6F7F8'}}>
                                                <div className="h-44 p-8">
                                                    <div className="h-1/2">
                                                        <h2 className="font-bold text-xl text-Black"> {data.title} </h2>
                                                    </div>
                                                    <div className="h-1/2">
                                                        <p className="text mt-4"> { data.text } </p>
                                                    </div>
                                                </div>
                                                <section 
                                                    className="bg-cover bg-center h-36 w-full rounded-b-md" 
                                                    style={{backgroundImage:`url(${data.image})`}} 
                                                />
                                            </SwiperSlide>
                                        )}
                                    </Swiper>
                                )
                            }
                        </div>
                    </div>
                </Card>

                <Card title="Trending Services">
                    <Swiper
                        spaceBetween={10}
                        navigation={true}
                        freeMode={true}
                        className="w-full"
                        breakpoints={{
                            // when window width is >= 640px
                            640: {
                                width: 640,
                                slidesPerView: 1,
                            },
                            // when window width is >= 768px
                            768: {
                                width: 768,
                                slidesPerView: 3,
                                },
                            }}
                        >
                        { products && products.slice(0, 6).map( data => (
                            <SwiperSlide className="shadow-product rounded-md m-2 h-28 mobile:w-5/6">
                                <div className="flex h-full">
                                    <div className="w-1/3 h-full bg-cover bg-center rounded-tl-md rounded-bl-md mobile:w-2/4" style = {{background: `url("${data.photo[0].url}")`}}/>
                                    <div className="w-2/3 text-center font-bold text-Black my-auto mobile:w-2/4">
                                        <Link href= {`/marketplace/products/${data.slug}`} className="font-bold text-Black-text capitalize">
                                            { data.name }
                                        </Link>
                                    </div>
                                </div>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </Card>
            </div>
    );
};

export default Banner;
