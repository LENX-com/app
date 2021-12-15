import React, { Fragment, useState } from 'react'
import { Data } from '../stories/Data'
import { Swiper, SwiperSlide } from 'swiper/react';

const Conversations = ({ color }) => {
  const [openTab, setOpenTab] = useState(1);
  return (
    <>
      <div className="flex flex-wrap">
        <div className="w-full">
          <ul
            className="flex mb-0 list-none flex-wrap pt-3 pb-4 flex-row"
            role="tablist"
          >
              <Swiper
              slidesPerView={5} spaceBetween={2} freeMode={true} pagination={{
                "clickable": true
                }} className="mySwiper"
                >
              {Data.map((data,i)=> (  
                <li key={i}>
                    <SwiperSlide
                        className="z-999" 
                        onClick={e => {
                        e.preventDefault();
                        setOpenTab(data._id);   
                        }}
                        data-toggle="tab"
                        href="#link1"
                        role="tablist">
                    <div class="relative rounded-full inline-block w-16 h-16 align-middle">
                        <img className={
                            "object-cover w-full h-full rounded-full " +
                            (openTab === data._id
                            ? "text-white bg-" + color + "-600"
                            : "text-" + color + "-600 bg-white")
                        }
                            src="https://images.unsplash.com/photo-1502378735452-bc7d86632805?ixlib=rb-0.3.5&amp;q=80&amp;fm=jpg&amp;crop=entropy&amp;cs=tinysrgb&amp;w=200&amp;fit=max&amp;s=aa3a807e1bbdfd4364d1f449eaa96d82" alt="" loading="lazy" />
                        <div class="absolute inset-0 rounded-full shadow-inner">
                        </div>
                    </div>
                    </SwiperSlide>
                </li>
                
              ))
              }
            </Swiper>
          </ul>

          
          <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded">
            <div className="px-4 py-5 flex-auto">
            {Data.map((data,i)=> (
              <div key={i} className="tab-content tab-space">
                <div className={openTab === data._id ? "block" : "hidden"} id="link1">
                        <div className="flex flex-col h-full overflow-x-auto mb-4">
                            <div className="flex flex-col h-full">
                                <div className="grid grid-cols-12 gap-y-2">
                                    <div className="col-start-1 col-end-8 p-3 rounded-lg">
                                        <div className="flex flex-row items-center">
                                            <div className="flex items-center justify-center h-10 w-10 rounded-full bg-indigo-500 flex-shrink-0">
                                                A</div>
                                                <div className="relative ml-3 text-sm bg-white py-2 px-4 shadow rounded-xl">
                                                    <div>{data.name}</div></div></div></div><div className="col-start-1 col-end-8 p-3 rounded-lg">
                                                        <div className="flex flex-row items-center">
                                                            <div className="flex items-center justify-center h-10 w-10 rounded-full bg-indigo-500 flex-shrink-0">
                                                                A
                                                            </div>
                                                            <div className="relative ml-3 text-sm bg-white py-2 px-4 shadow rounded-xl">
                                                                <div>{data.name}
                                                                </div>
                                                                </div></div></div><div className="col-start-6 col-end-13 p-3 rounded-lg"><div className="flex items-center justify-start flex-row-reverse"><div className="flex items-center justify-center h-10 w-10 rounded-full bg-indigo-500 flex-shrink-0">A</div><div className="relative mr-3 text-sm bg-indigo-100 py-2 px-4 shadow rounded-xl"><div>I'm ok what about you?</div></div></div></div><div className="col-start-6 col-end-13 p-3 rounded-lg"><div className="flex items-center justify-start flex-row-reverse"><div className="flex items-center justify-center h-10 w-10 rounded-full bg-indigo-500 flex-shrink-0">A</div><div className="relative mr-3 text-sm bg-indigo-100 py-2 px-4 shadow rounded-xl"><div>Lorem ipsum dolor sit, amet consectetur adipisicing. ?</div></div></div></div><div className="col-start-1 col-end-8 p-3 rounded-lg"><div className="flex flex-row items-center"><div className="flex items-center justify-center h-10 w-10 rounded-full bg-indigo-500 flex-shrink-0">A</div><div className="relative ml-3 text-sm bg-white py-2 px-4 shadow rounded-xl"><div>Lorem ipsum dolor sit amet !</div></div></div></div><div className="col-start-6 col-end-13 p-3 rounded-lg"><div className="flex items-center justify-start flex-row-reverse"><div className="flex items-center justify-center h-10 w-10 rounded-full bg-indigo-500 flex-shrink-0">A</div><div className="relative mr-3 text-sm bg-indigo-100 py-2 px-4 shadow rounded-xl"><div>Lorem ipsum dolor sit, amet consectetur adipisicing. ?</div><div className="absolute text-xs bottom-0 right-0 -mb-5 mr-2 text-gray-500">Seen</div></div></div></div><div className="col-start-1 col-end-8 p-3 rounded-lg"><div className="flex flex-row items-center"><div className="flex items-center justify-center h-10 w-10 rounded-full bg-indigo-500 flex-shrink-0">A</div><div className="relative ml-3 text-sm bg-white py-2 px-4 shadow rounded-xl"><div>Lorem ipsum dolor sit amet consectetur adipisicing elit. Perspiciatis, in.</div></div></div></div><div className="col-start-1 col-end-8 p-3 rounded-lg"><div className="flex flex-row items-center"><div className="flex items-center justify-center h-10 w-10 rounded-full bg-indigo-500 flex-shrink-0">A</div><div className="relative ml-3 text-sm bg-white py-2 px-4 shadow rounded-xl"><div className="flex flex-row items-center"><button className="flex items-center justify-center bg-indigo-600 hover:bg-indigo-800 rounded-full h-8 w-10"><svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg></button><div className="flex flex-row items-center space-x-px ml-4"><div className="h-2 w-1 bg-gray-500 rounded-lg" /><div className="h-2 w-1 bg-gray-500 rounded-lg" /><div className="h-4 w-1 bg-gray-500 rounded-lg" /><div className="h-8 w-1 bg-gray-500 rounded-lg" /><div className="h-8 w-1 bg-gray-500 rounded-lg" /><div className="h-10 w-1 bg-gray-500 rounded-lg" /><div className="h-10 w-1 bg-gray-500 rounded-lg" /><div className="h-12 w-1 bg-gray-500 rounded-lg" /><div className="h-10 w-1 bg-gray-500 rounded-lg" /><div className="h-6 w-1 bg-gray-500 rounded-lg" /><div className="h-5 w-1 bg-gray-500 rounded-lg" /><div className="h-4 w-1 bg-gray-500 rounded-lg" /><div className="h-3 w-1 bg-gray-500 rounded-lg" /><div className="h-2 w-1 bg-gray-500 rounded-lg" /><div className="h-2 w-1 bg-gray-500 rounded-lg" /><div className="h-2 w-1 bg-gray-500 rounded-lg" /><div className="h-10 w-1 bg-gray-500 rounded-lg" /><div className="h-2 w-1 bg-gray-500 rounded-lg" /><div className="h-10 w-1 bg-gray-500 rounded-lg" /><div className="h-8 w-1 bg-gray-500 rounded-lg" /><div className="h-8 w-1 bg-gray-500 rounded-lg" /><div className="h-1 w-1 bg-gray-500 rounded-lg" /><div className="h-1 w-1 bg-gray-500 rounded-lg" /><div className="h-2 w-1 bg-gray-500 rounded-lg" /><div className="h-8 w-1 bg-gray-500 rounded-lg" /><div className="h-8 w-1 bg-gray-500 rounded-lg" /><div className="h-2 w-1 bg-gray-500 rounded-lg" /><div className="h-2 w-1 bg-gray-500 rounded-lg" /><div className="h-2 w-1 bg-gray-500 rounded-lg" /><div className="h-2 w-1 bg-gray-500 rounded-lg" /><div className="h-4 w-1 bg-gray-500 rounded-lg" />
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};


export default Conversations
