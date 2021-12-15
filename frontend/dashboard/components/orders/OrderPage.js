import React from "react";
import { HiChevronRight } from "react-icons/hi";
import { Link } from "react-router-dom";

const OrderPage = () => {
  return (
    <section className="overflow-hidden">
      <div className="container">
        <div class="w-full md:w-2/3 flex flex-col mt-4 items-center text-center">
          <h1 class="title-font sm:text-4xl text-3xl mb-4 font-medium text-gray-900">
            {" "}
            Hi UserName,
          </h1>
          <p class="mb-8 leading-relaxed">
            {" "}
            Thank you for purchasing "order name"{" "}
          </p>
        </div>
        <div className="lg:w-4/5 mx-auto flex flex-wrap">
          <div className="mt-3 bg-white rounded p-3 border-solid border-2 border-Grey">
            <img
              alt="ecommerce"
              className="lg:w-1/2 w-full lg:h-auto h-64 object-cover object-center rounded"
              src="https://dummyimage.com/400x400"
            />
            <h2 class="text-gray-900 title-font text-lg font-medium">
              {" "}
              Desktop{" "}
            </h2>
            <p class="mt-1">$21.15</p>
            <div className="shadow-button p-5 rounded bg-white flex border-t border-gray-200 py-2 max-w-xs">
              <span className="text-gray-500"> Track Order</span>
              <span className="ml-auto text-gray-900">
                {" "}
                {<HiChevronRight className="text-2xl" />}{" "}
              </span>
            </div>
            <div className="shadow-button p-5 rounded bg-white flex border-t border-gray-200 py-2 max-w-xs">
              <span className="text-gray-500">Buy it again</span>
              <span className="ml-auto text-gray-900">
                {" "}
                {<HiChevronRight className="text-2xl" />}{" "}
              </span>
            </div>
          </div>
        </div>
        <div className="mt-3 bg-white rounded p-3 border-solid border-2 border-Grey ">
          <h2 class="text-gray-900 title-font text-lg font-medium">
            {" "}
            Order info{" "}
          </h2>
          <div className="shadow-button p-5 rounded bg-white flex border-t border-gray-200 py-2 max-w-xs">
            <span className="text-gray-500"> Request a refund </span>
            <span className="ml-auto text-gray-900">
              {" "}
              {<HiChevronRight className="text-2xl" />}{" "}
            </span>
          </div>
          <div className="shadow-button p-5 rounded bg-white flex border-t border-gray-200 py-2 max-w-xs">
            <span className="text-gray-500"> Download invoice </span>
            <span className="ml-auto text-gray-900">
              {" "}
              {<HiChevronRight className="text-2xl" />}{" "}
            </span>
          </div>
          <p class="mt-1"> You ordered this on the 19/09/2028</p>
        </div>
        <div className="mt-3 bg-white rounded p-3 border-solid border-2 border-Grey ">
          <h2 class="text-gray-900 title-font text-lg font-medium">
            {" "}
            How was the order?{" "}
          </h2>
          <Link to="/user/dashboard/write-review">
            <div className="shadow-button p-5 rounded bg-white flex border-t border-gray-200 py-2 max-w-xs">
              <span className="text-gray-500"> Write a review </span>
              <span className="ml-auto text-gray-900">
                {" "}
                {<HiChevronRight className="text-2xl" />}{" "}
              </span>
            </div>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default OrderPage;
