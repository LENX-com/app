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
        title: "Support small businesses",
        text: "We provide the infrastucture to help small businesses fulfill their potential.",
        image: 'https://res.cloudinary.com/lenx2222/image/upload/v1639073084/istockphoto-1298550035-170667a_esvmii.jpg'
    },
    {
        title: "Community Marketplace",
        text: "Know who you are hiring based in their profile and reviews.",
        image: 'https://res.cloudinary.com/lenx2222/image/upload/v1639076227/photo-1461938337379-4b537cd2db74_gnwhl3.jpg'
    },
    {
        title: "Ease of use",
        text: "We simplify hiring professionals, you will access to a wide talent pool of freelancers.",
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
                                The easiest way to <span className="font-bold"> hire quality services.</span>
                            </h1>
                            <span style={textStyle}>
                                Wabei is a <span> marketplace for services,</span>
                                <span style={{color:'#32bdc3'}}> that simplifies hiring small business and freelancers</span>.
                            </span>
                            { !isTabletOrMobile ? (
                                <div className="grid grid-cols-3 gap-5 my-8 lg:px-3">
                                    { banners.map( data => 
                                        <div className="h-80 rounded-md" style={{background:'#F6F7F8'}}>
                                            <section 
                                                className="bg-cover bg-center h-36 w-full rounded-t-md" 
                                                style={{backgroundImage:`url(${data.image})`}} 
                                            />
                                            <div className="h-44 p-6">
                                                <h2 className="font-bold text-xl text-Black text-center"> {data.title} </h2>
                                                <p className="text-base mt-3"> { data.text } </p>
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
                                            <SwiperSlide className="h-[22rem] rounded-md w-5/6" style={{background:'#F6F7F8'}}>
                                                <section 
                                                    className="bg-cover bg-center h-40 w-full rounded-t-md" 
                                                    style={{backgroundImage:`url(${data.image})`}} 
                                                />
                                                <div className="h-44 px-8 py-3">
                                                    <div className="h-1/3">
                                                        <h2 className="font-bold text-xl text-Black"> {data.title} </h2>
                                                    </div>
                                                    <div className="h-1/2">
                                                        <p className="text-base mt-4"> { data.text } </p>
                                                    </div>
                                                </div>
                                            </SwiperSlide>
                                        )}
                                    </Swiper>
                                )
                            }
                        </div>
                    </div>
                </Card>

                {/* <Card title="Trending Services">
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
                </Card> */}
            </div>
    );
};

export default Banner;
