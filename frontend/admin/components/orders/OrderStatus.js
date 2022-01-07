import React, { useEffect, useState } from "react";
import { HiArrowRight } from "react-icons/hi";
import { useSelector } from "react-redux";
import Button from "../elements/Button";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import Card from "../Cards/Card";
import SectionTitle from "../Typography/SectionTitle";
import { Badge } from "@windmill/react-ui";

const ProductImage = [
  {
    url: "https://sc04.alicdn.com/kf/Hdb74b0629dd443928f2d4d639bab8d55d.jpg",
  },
  {
    url:
      "https://sc04.alicdn.com/kf/H46a5ac771b8b4ee7a3f1ae41248dbb4bc.jpg_50x50.jpg",
  },
  {
    url:
      "https://sc04.alicdn.com/kf/H6bdcf18014fd42a2aaf2db1ee57d9f33E.jpg_50x50.jpg",
  },
];

const OrderStatus = () => {
  const orders = useSelector((state) => state.order.orders);
  const [upcomingOrders, setUpcomingOrders] = useState([]);
  useEffect(() => {
    let order = orders.sort((a, b) => {
      let c = new Date(a.createdAt);
      let d = new Date(b.createdAt);
      return c - d;
    });
    setUpcomingOrders(order);
  }, [orders]);

  return (
    <>
      {upcomingOrders.length !== 0 ? (
        <Card>
          <div>
            <div className="flex">
              <SectionTitle>Order status</SectionTitle>
              <div className="table-cell align-middle cursor-pointer absolute right-4">
                <Link to="/user/dashboard/order">
                  <HiArrowRight className="text-orange text text-lg" />
                </Link>
              </div>
            </div>
            <h2> Due date on 11/22/2022 </h2>
            <Badge type="success" className="py-2 px-4 text-base mt-1 mb-3">
              success
            </Badge>
          </div>
          <Swiper
            slidesPerView={2}
            spaceBetween={20}
            pagination={{ clickable: true }}
            className="mySwiper"
          >
            {upcomingOrders.length !== 0 ? (
              upcomingOrders.map((data, i) => (
                <SwiperSlide key={i}>
                  <section
                    className="content bg-cover bg-center h-32 rounded"
                    style={{ backgroundImage: `url(${data.url})` }}
                  >
                    <div className="flex items-end w-full h-full bg-black bg-opacity-20 text-white text-sm font-bold  p-4 rounded">
                      <Link to="/user/dashboard/order">Order</Link>
                    </div>
                  </section>
                </SwiperSlide>
              ))
            ) : (
              <div>No orders for now continue shopping</div>
            )}
          </Swiper>
          <div className="my-4">
            <Button className="flex">
              <Link to="" className="flex text-Black font-bold">
                Track Order
                <HiArrowRight className="ml-3 mt-1" />
              </Link>
            </Button>
          </div>
          <div className="mb-2">
            <Button className="flex">
              <Link to="" className="flex text-Black font-bold">
                Requst Refund
                <HiArrowRight className="ml-3 mt-1" />
              </Link>
            </Button>
          </div>
        </Card>
      ) : (
        "No Upcoming orders"
      )}
    </>
  );
};

export default OrderStatus;
