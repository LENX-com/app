import { Dialog, Transition } from "@headlessui/react";
import React from "react"
import { useState, Fragment, useRef } from "react";
import { Filter as FilterIcon } from "../../assets/icons";
import { AiOutlineClose } from "react-icons/ai";
import Button from '../../../components/Buttons/Button'
import Rating from 'react-rating'
import { Star, EmptyStar } from '../../assets/icons'
import { Swiper, SwiperSlide } from "swiper/react";
import ReactSlider from "react-slider";

const FilterDialogue = ({ price, handleSlider, categories, handleCategory, brands, handleBrand, category, handleRating, rating, handleSubmit, isFiltered, removeFilters, brand }) => {
  let [isOpen, setIsOpen] = useState(false);
  const [currentStore, setCurrentStore] = useState(false);
  const [currentFilter, setCurrentFilter] = useState(false);
  const completeButtonref = useRef(null);

  function openModal() {
    setIsOpen(true);
  }

  const ratings = [ 5, 4, 3, 2, 1 ]

  const Ratings = React.memo(() => (
    <>
      {ratings.map( (data, i) =>
        <div className="px-1"> 
          <div 
              className= {`mobile:w-auto px-3 mobile:px-2 py-1 rounded-md flex cursor-pointer hover:bg-Grey-hover ${rating === data ? "bg-Grey-hover" : "bg-Grey-dashboard" }`}
              onClick={() => handleRating(data)}      
          >
            <Star style={{width: "16px", height:"16px"}} className="my-auto"/>
            <span className="text-Black-medium font-bold ml-1"> {data} </span>
          </div>
        </div>
      )}
    </>
  ))
  

  return (
    <>
      <div>
        <button
          type="button"
          ref={completeButtonref}
          onClick={openModal}
          className="px-4 py-1 text-sm font-medium text-white bg-lightBlack rounded-md hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75"
        >
          <FilterIcon className="text-base"/>
        </button>
      </div>

      <Transition appear show={isOpen} as={Fragment}>
        <Dialog
          as="div"
          initialFocus={completeButtonref}
          className="fixed inset-0 overflow-y-auto"
          style={{ zIndex: "999" }}
          onClose={() => setIsOpen(false)}
          open={isOpen}
        >
          <div className="min-h-screen text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Dialog.Overlay className="fixed inset-0  blur-lg bg-background bg-opacity-70" />
            </Transition.Child>

            {/* This element is to trick the browser into centering the modal contents. */}
            <span
              className="inline-block h-screen align-bottom"
              aria-hidden="true"
            >
              &#8203;
            </span>
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <div className="inline-block w-full max-w-md overflow-y-scroll text-left align-middle transition-all transform bg-white shadow-xl " style={{height: "70%"}}>
                <Dialog.Title
                  as="div"
                  className="bg-background"
                >
                  <div className="px-5 py-2 flex">
                    <h2 className="leading-6 text-Black-text text-lg font-bold my-auto">
                      {" "}
                      Filters{" "}
                    </h2>
                    <div
                      onClick={() => setIsOpen(false)}
                      className="ml-auto text-xl text-white rounded-full p-2 bg-Black"
                    >
                      <AiOutlineClose />
                    </div>
                  </div>
                </Dialog.Title>
                <form
                    onSubmit={handleSubmit}
                >

                    <div className="">
                      { isFiltered &&
                        <div className="px-3">
                          <button className="bg-Black-text px-3 py-1 text-sm flex rounded-md my-3 text-white"
                                  type="button"
                                  onClick={removeFilters}        
                          >
                            Clear filters
                            < AiOutlineClose className="my-auto ml-2" />
                          </button>
                        </div>
                      }
                      <div className="mt-2 px-3">
                        <div className="text-Black-text text-base font-bold"> Filter by price </div>
                        <ReactSlider
                          step={1}
                          min={1}
                          max={200}
                          className="w-full h-3 pr-2 my-4 bg-gray-200 rounded-md cursor-grab"
                          thumbClassName="absolute w-5 h-5 cursor-grab bg-orange rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:orange -top-2px"
                          value={price}
                          onChange={handleSlider}
                        />
                        <span> £ {` ${price[0]} ${"to"} ${price[1]}`}</span>
                      </div>
                  
                  <div className="my-4 border-t-2 border-Grey border-solid px-3">
                    <div className="text-Black-text text-base font-bold mt-3"> Filter by Category</div>
                      { categories &&
                        <Swiper
                          spaceBetween={0}
                          slidesPerView={3}
                          className="w-full my-3"
                        >
                          {categories.map( data => (
                            <SwiperSlide className="w-auto m-1">
                              <div className= {`capitalize rounded-md px-4 py-1 font-bold cursor-pointer hover:bg-Grey-hover text-sm border-box  text-center bg-white ${data.id === category && "bg-Grey-hover"}`}
                                onClick={() => handleCategory(data.id)}
                              >
                              {data.name}
                              </div>
                            </SwiperSlide>  
                          ))}
                        </Swiper> 
                        }
                    </div>
                  </div>

                <div className="my-4 border-t-2 border-Grey border-solid px-3 shadow-separator">
                  <div className="text-Black-text text-base font-bold mt-3"> 
                    Filter by rating
                  </div>
                  <div className="grid grid-cols-5 py-3">
                    <Ratings />
                  </div>
                <div>

                <div className="my-4 border-t-2 border-Grey border-solid shadow-separator">
                  <div className="text-Black-text text-base font-bold mt-3"> 
                    Filter by stores
                  </div>
                  { brands &&
                    <Swiper
                       slidesPerView= { 3 }
                       spaceBetween={ 20 }
                       className="mb-8 mt-3 brands w-full"
                       pagination={{
                           "type": "progressbar"
                           }}
                    >
                       {brands.map((b) => (
                         <SwiperSlide className="w-auto">
                             <button onClick={() => handleBrand(b.name)} type="button" >
                                 <section className="h-16 w-16 bg-cover bg-center rounded-md shadow-button cursor-pointer" style={{background: `url("${b.avatar}")`}}/>
                                 <h1 className= {`text-center mx-auto capitalize ${b.name === brand && "font-bold"}`}> {b.name} </h1>
                             </button>
                         </SwiperSlide>
                       ))}
                    </Swiper>
                  }  
                </div>

                <div className="grid pb-4">
                  <Button className="mx-auto w-4/5 bg-Blue text-white" type="submit"
                          onClick={handleSubmit}>
                    Apply filters
                  </Button>
                </div>

                  </div>
                </div>
              </form>
               </div>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};

export default FilterDialogue;
