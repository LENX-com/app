import React from 'react'
import Rating from 'react-rating'
import { AiOutlineInfoCircle} from 'react-icons/ai'
import Button from '@/components/Buttons/Button'
import Link from 'next/link'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Star, EmptyStar, Tree, Verified } from '../../assets/icons'

const StoreCard = React.memo(({brand, isTabletOrMobile, handleProfile}) => {
    const MAX_LENGTH = 50


    var DisplayRating = React.memo(() => (
        <Rating
            className="mt-2 text-base text-orange"
            fullSymbol= { <Star className= "text-lg" style={{width:"16px", height: "16px"}}/> }
            emptySymbol ={ <EmptyStar className= "text-lg" style={{width:"16px", height: "16px"}}/>}
            readonly
            initialRating={brand.rating}
        />
    )) 
    return (
        <> 
            { isTabletOrMobile ?
            // Mobile & Tablet Version
                ( <div onClick={() => handleProfile(brand)}>
                    <div className=" shadow-separator h-24 flex bg-white">
                        <div className="my-auto w-2/5">
                            <div className="bg-cover bg-center shadow-button h-16 w-16 mx-3 my-auto rounded-sm bg-white" style= {{backgroundImage: `url("${brand.avatar}")`}}/>
                        </div>
                        <div className="my-auto">
                            <div className=" text-lg font-bold my-auto capitalize">
                                { brand.name }
                            </div>
                            <div>
                                { brand.rating &&
                                    <DisplayRating />
                                }
                            </div>
                        </div>
                    </div>
                </div>

            ) : (
            
            //   Desktop Version
                    <div className="rounded-md cursor-pointer group bg-white border-box h-72 mobile:h-48"
                        key= {brand.name}
                    >
                        <section 
                            className="content bg-cover bg-center h-40 mobile:h-36 rounded-t-md m-auto relative bg-Grey-dashboard"
                        >
                            <div className="absolute top-1 right-2 rounded-full bg-white z-10"
                                 onClick={() => handleProfile(brand)}
                            >
                                <AiOutlineInfoCircle className="w-6 h-6"/>
                            </div>
                            <Swiper
                                spaceBetween={10}
                                freeMode={true}
                                pagination={{ "dynamicBullets": true }}
                            >
                                <SwiperSlide 
                                    className="bg-cover bg-center h-40 w-full mobile:h-36 rounded-md m-auto shadow-button" 
                                    style= {{backgroundImage: `url(${brand.avatar})`}} 
                                />
                                <SwiperSlide 
                                    className="bg-cover bg-center h-40 w-full mobile:h-36 rounded-md m-auto shadow-button" 
                                    style= {{backgroundImage: `url(${brand.photos[0]?.url})`}} 
                                />
                                <SwiperSlide 
                                    className="bg-cover bg-center h-40 w-full mobile:h-36 rounded-md m-auto shadow-button" 
                                    style= {{backgroundImage: `url(${brand.photos[1]?.url})`}} 
                                />
                                <SwiperSlide 
                                    className="bg-cover bg-center h-40 w-full mobile:h-36 rounded-md m-auto shadow-button" 
                                    style= {{backgroundImage: `url(${brand.photos[2]?.url})`}} 
                                />
                            </Swiper>
                        </section>
                        <div className="mx-auto grid px-3 py-2">
                            <div className="flex mb-2">
                                <div className="bg-cover bg-center shadow-button h-8 w-8 rounded-full bg-white my-auto mr-2 transform transition hover:-rotate-6 cursor-pointer duration-300 border-2 border-white" 
                                     style= {{backgroundImage: `url("${brand.avatar}")`}}
                                />
                                <Link href = {`marketplace/manufacturer/${brand.slug}`} className="my-auto flex">
                                    <span className="text-Black-text text font-bold hover:text-Blue my-auto capitalize"> {brand.name} </span>
                                </Link>
                            </div>
                            <div>
                                {`${brand.about?.substring(0, MAX_LENGTH)} ${brand.about.length >= MAX_LENGTH ? "..." : ""}`}
                            </div>
                            { brand.rating &&
                                <div className="flex">  
                                    <Star className= "text-lg my-auto" style={{width:"16px", height: "16px"}}/>
                                    <span className="my-auto text-Black-medium font-bold pl-1"> {brand.rating} </span>
                                </div>
                            }
                        </div>
                    </div> 
                    
            )}
        </>
    )
})

export default React.memo(StoreCard)
