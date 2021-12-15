import React, { useState } from "react";
import { Link, Redirect } from "react-router-dom";
import ShowImage from "./ShowImage";

import "./Card.scss";

const Card = ({
  product,
  showViewProductButton = true,
  showAddToCartButton = true,
  cartUpdate = false,
  showRemoveProductButton = false,
  setRun = (f) => f,
  run = undefined,
  // changeCartSize
}) => {
  const [redirect, setRedirect] = useState(false);
  const [count, setCount] = useState(product.count);

  // const showViewButton = (showViewProductButton) => {
  //   return (
  //     showViewProductButton && (
  //       <Link to={`/product/${product._id}`}>
  //         <button className="btn">View Product</button>
  //       </Link>
  //     )
  //   );
  // };


  const shouldRedirect = (redirect) => {
    if (redirect) {
      return <Redirect to="/cart" />;
    }
  };

  const showAddToCartBtn = (showAddToCartButton) => {
    return (
      showAddToCartButton && (
        <button  className="btn">
          Add to cart
        </button>
      )
    );
  };

  // const showStock = (quantity) => {
  //   return quantity > 0 ? <span> In Stock </span> : <span> Out of Stock </span>;
  // };

 

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
            
            />
          </div>
        </div>
      )
    );
  };
  const showRemoveButton = (showRemoveProductButton) => {
    return (
      showRemoveProductButton && (
        <button
          
          className="btn"
        >
          Remove Product
        </button>
      )
      
    );
  };
  return (
      <>
      <div className="bg-white shadow-xl rounded-lg overflow-hidden">
        <div className="bg-cover bg-center p-4">
          {shouldRedirect(redirect)}
          <Link to={`/product/${product._id}`}>
            <ShowImage
              clase="bg-cover bg-center"
              item={product}
              url={product.photo}
            />
          </Link>
          <div className="flex justify-end">
            <svg
              className="h-6 w-6 text-white fill-current"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
            >
              <path d="M12.76 3.76a6 6 0 0 1 8.48 8.48l-8.53 8.54a1 1 0 0 1-1.42 0l-8.53-8.54a6 6 0 0 1 8.48-8.48l.76.75.76-.75zm7.07 7.07a4 4 0 1 0-5.66-5.66l-1.46 1.47a1 1 0 0 1-1.42 0L9.83 5.17a4 4 0 1 0-5.66 5.66L12 18.66l7.83-7.83z"></path>
            </svg>
          </div>
        </div>
        <div className="p-4 py-5">
          <Link to={`/category/${product.category !== null ? product.category._id : ""}`}>
          
            <p className="uppercase tracking-wide text-sm font-bold text-gray-700">
              {product.category && product.category.name}
            </p>
          </Link>
          <p className="text-3xl text-gray-900 mt-1.5 mb-1.5">{product.name}</p>
        </div>
        <div className="px-4 pt-3 pb-4 border-t border-gray-200 bg-gray-100">
          <div className="flex  pt-2">
            <div
              className="bg-cover bg-center w-10 h-10 rounded-full mr-3"
              style={{
                backgroundImage:
                  "url(https://http2.mlstatic.com/D_Q_NP_2X_878604-MLA44160072739_112020-AB.webp)",
              }}
            ></div>
            <div>
              <p className="text-sm text-gray-700">$ {product.price}</p>
            </div>
          </div>
          <div className="flex">
            {showAddToCartBtn(showAddToCartButton)}

            {showRemoveButton(showRemoveProductButton)}

            {showCartUpdateOptions(cartUpdate)}
          </div>
        </div>
      </div>
    </>
  );
};

export default Card;
