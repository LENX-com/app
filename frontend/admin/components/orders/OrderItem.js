import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { HiChevronRight } from "react-icons/hi";
import { NavLink } from "react-router-dom";
import { Badge } from "@windmill/react-ui";

const OrderItem = () => {
  const dispatch = useDispatch();
  const { myOrders } = useSelector((state) => state.order.order);
  const [order, setOrder] = useState([]);
 
  useEffect(() => {
    myOrders  && setOrder(myOrders.slice(5));
  }, [myOrders]);
  
  return (
    <>
      {!order.length
        ? "No orders"
        : order.map((data, i) => (
            <NavLink to="/user/dashboard/faq" key={i}>
              <div className="flex ml-2 justify-between hover:bg-Hover">
                <div className="h-20 rounded flex items-center justify-center">
                  <div className="w-16 h-16">
                    <img
                      src="https://d33wubrfki0l68.cloudfront.net/be38c60bf34b2376b393e444d2da9a6b2dd54bf4/f1dfc/assets/img/unlicensed/shoes-3.png"
                      alt="product"
                      className="object-cover"
                    />
                  </div>
                </div>
                <div className="my-auto">Order Name</div>
                <div className="my-auto">
                  <Badge type="success">{data.status}</Badge>
                </div>
                <div className="my-auto">
                  <HiChevronRight className="w-4 h-4 mr-3" aria-hidden="true" />
                </div>
              </div>
            </NavLink>
          ))}
    </>
  );
};

export default OrderItem;
