import React from 'react'
import Stories from '../stories/Stories'
import Rating from 'react-rating'
import Button from '../elements/Button'
import Card from '../Cards/Card'

const Reviews = () => {
    return (
    <div className="flex flex-col ">
            <Card>
              <div className="flex-none">
                <div className=" h-full w-full lg:h-48 lg:w-48   lg:mb-0 mb-3">
                  <img src="https://images.unsplash.com/photo-1622180203374-9524a54b734d?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80" alt="Just a flower" className=" w-full  object-scale-down lg:object-cover  lg:h-48 rounded-2xl" />
                </div>
                <div className="flex-auto ml-3 justify-evenly py-2">
                  <div className="flex flex-wrap ">
                    <h2 className="flex-auto text-lg font-medium">Massive Dynamic</h2>
                  </div>
                  <p className="mt-3" />
                  <div className="flex text-sm text-gray-600">
                    <div className="flex-1 inline-flex items-center">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <p className>05-25-2021</p>
                    </div>
                  </div>
                    <Stories />
                  <div class="mt-3">
                    <span class="font-bold"> Title </span>
                    <p class="mt-1">  Description </p>
                    <Rating
                      initialRating={3.5}
                      readonly
                    />
                  </div>
                  <div className="mt-3">
                    <Button>
                      Edit review
                    </Button>
                  </div>
                </div>
              </div>
            </Card>
          </div>
    )
}

export default Reviews
