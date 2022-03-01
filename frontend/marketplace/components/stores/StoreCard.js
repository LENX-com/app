import React from 'react'
import Rating from 'react-rating'
import { AiOutlineInfoCircle} from 'react-icons/ai'
import Button from '@/components/Buttons/Button'
import Link from 'next/link'
import { Swiper, SwiperSlide } from 'swiper/react'
import parse from 'html-react-parser';
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

        const categoriesStyle = {
        display: "inline-block",
        fontSize: "12px",
        lineHeight: "12px",
        fontWeight: "200",
        textTransform: "uppercase",
        letterSpacing: ".1em",
        background: "#e6e6dd",  
        borderRadius: "4px",
        padding: "0.4em 1em",
        marginRight: "0.6em",
        marginBottom: "0.6em",
    }

    return (
       <>
            <Link href={`/marketplace/manufacturer/${brand.slug}`}>
                <div className={`cursor-pointer group flex p-4 bg-white ${!isTabletOrMobile ? "border-box hover:bg-Grey-dashboard" : 'shadow-separator'} transform duration-500 hover:-translate-y-2 `}
                    key= {brand.name}
                >
                    <section 
                        className="relative w-1/4 m-auto"
                    >
                        <div
                            className="bg-cover bg-center h-16 w-16 lg:h-[78px] lg:w-[78px] shadow-button rounded-full" 
                            style= {{backgroundImage: `url(${brand.avatar})`}} 
                        />
                    </section>
                    <div className="m-auto grid px-3 py-2 w-3/4">
                    { brand.rating &&
                        <div className="flex">  
                            <Star className= "text-lg my-auto" style={{width:"12px", height: "12px"}}/>
                            <span className="my-auto text-Black-medium font-bold pl-1 text"> {brand.rating} </span>
                        </div>
                    }   
                        <Link href = {`marketplace/manufacturer/${brand.slug}`} className="my-auto flex">
                            <span className="text-Black-title font-bold hover:text-Blue my-auto capitalize"> {brand.name} </span>
                        </Link>
                    <div className=" text-sm text-Black-title">
                        { brand.summary && `${brand.summary?.substring(0, MAX_LENGTH)} ${brand.summary.length >= MAX_LENGTH ? "..." : ""}`}
                    </div>
                    <div className="overflow-hidden py-2">
                        { brand.categories && brand.categories.length > 0 && brand.categories.map( (category, i) => (
                            <span 
                                className="text-Black-medium font-bold my-auto capitalize"
                                style= { categoriesStyle }
                                key={i}
                            >
                                {category.name}
                            </span>
                        ))}
                    </div>
                    </div>
                </div>    
       </Link>
        </>
    )
})

export default React.memo(StoreCard)
