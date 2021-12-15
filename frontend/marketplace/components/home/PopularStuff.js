import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'


const popularStuff = [
        {
            name : "Plants",
            photo: "https://http2.mlstatic.com/D_NQ_NP944128-MLA42542875346_072020-O.webp"
        },
        {
            name : "Drinks",
            photo: "https://http2.mlstatic.com/D_NQ_NP944128-MLA42542875346_072020-O.webp"
        },
        {
            name : "Plants",
            photo: "https://http2.mlstatic.com/D_NQ_NP944128-MLA42542875346_072020-O.webp"
        }
    ]

const PopularStuff = () => {

    return (
        <Card>
        <Swiper 
            freeMode={true}
             spaceBetween={50}
             slidesPerView={1}>
            {popularStuff.map (data => (
             <SwiperSlide  className="p-3 w-4/5">
                 <>
                    <article className="mx-auto group w-full shadow-button max-w-md pb-2 rounded-xl transform duration-500 hover:-translate-y-2 cursor-pointer group bg-white">
                        <section className="content bg-cover bg-center h-64 rounded-t-xl" style={{backgroundImage: `url(${data.photo})` }}>
                            <div className="flex items-end w-full h-full bg-black bg-opacity-20 text-white text-sm font-bold  p-4 rounded-2xl">
                            </div>
                        </section>
                        <div className=" px-2 text-center">
                         <h2 className="mt-2 text-lg font-medium text-Black"> { data.name} </h2>
                        </div>
                    </article>
                 </>
             </SwiperSlide>
            ))}
        </Swiper>
        </Card>
    )
}

export default PopularStuff



  