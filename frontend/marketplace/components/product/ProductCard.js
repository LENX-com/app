import React, { useState } from "react";
import Link from 'next/link'
import { addItem, updateItem, removeItem } from "../cart/CartHelper";
import { addWishList } from "@/redux/actions/wishlistAction";
import { useDispatch } from "react-redux";
import { AiFillStar } from "react-icons/ai";

const ProductCard = ({
  product,
  setRun = (f) => f,
  run = undefined,
  rating = false,
  // changeCartSize
}) => {
  const dispatch = useDispatch();
  const [redirect, setRedirect] = useState(false);
  const [count, setCount] = useState(product.count);

  const showViewButton = (showViewProductButton) => {
    return (
      showViewProductButton && (
        <Link to={`/product/${product._id}`}>
          <button className="btn">View Product</button>
        </Link>
      )
    );
  };

  const addToCart = () => {
    addItem(product, setRedirect(true));
  };

  const showStock = (quantity) => {
    return quantity > 0 ? <span> In Stock </span> : <span> Out of Stock </span>;
  };

  const handleChange = (productId) => (event) => {
    setRun(!run); // run useEffect in parent Cart
    setCount(event.target.value < 1 ? 1 : event.target.value);
    if (event.target.value >= 1) {
      updateItem(productId, event.target.value);
    }
  };

  const showCartUpdateOptions = (cartUpdate) => {
    return (
      cartUpdate && (
        <div>
          <div className="input-group">
            <div className="input-group-prepend">
              <span className="input-group-text">Adjust Quantity</span>
            </div>
            <input
              type="number"
              className="form-control"
              value={count}
              onChange={handleChange(product._id)}
            />
          </div>
        </div>
      )
    );
  };

  const wishlist = (product) => {
    dispatch(addWishList(product));
  };

  const Like = () => (
    <svg
      viewBox="0 0 32 32"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      role="presentation"
      focusable="false"
      style={{
        display: "block",
        fill: "RGBA(0, 0, 0, 0.5)",
        height: "24px",
        width: "24px",
        stroke: "RGB(255, 255, 255)",
        strokeWidth: 2,
        overflow: "visible",
      }}
    >
      <path d="m16 28c7-4.733 14-10 14-17 0-1.792-.683-3.583-2.05-4.95-1.367-1.366-3.158-2.05-4.95-2.05-1.791 0-3.583.684-4.949 2.05l-2.051 2.051-2.05-2.051c-1.367-1.366-3.158-2.05-4.95-2.05-1.791 0-3.583.684-4.949 2.05-1.367 1.367-2.051 3.158-2.051 4.95 0 7 7 12.267 14 17z" />
    </svg>
  );

  return (
    <div className="shadow-product rounded-md transform duration-500 hover:-translate-y-2 cursor-pointer group">
      <div className="relative">
      <img
        className="relative rounded-t-md w-full h-36"
        src= {`https://secure.img1-fg.wfcdn.com/im/50804568/resize-h160-w160%5Ecompr-r85/8783/87830915/Arras+2+Door+Wardrobe.jpg`}
        alt ={ "product backgorund "}
      >
      </img>
     <div className="absolute top-2 right-2 cursor-pointer">
          <Like
            className="text-2xl text-white"
            onClick={() => console.log("this product was added to wishlist")}
          />
      </div>
      </div>
      <div className="p-2">
        <h1 className="truncate">
          {" "}
          {/* <Link to={`/marketplace/products/${product._id}`}> */}
            {" "}
            {product.name}
          {/* </Link>{" "} */}
        </h1>
        <h3> £ {product.price} </h3>
        <div className="free-delivery">Free delivery</div>
        <div className="flex">
          <AiFillStar className="text-orange text-sm mr-1" />
          <div className="text-xs">4.9</div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
