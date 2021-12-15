// import React, { useState, useEffect } from "react";
// import { Link } from "react-router-dom";
// import Layout from "../layout/Layout";
// import { getCart } from "./CartHelper";
// import Card from "../card/Card";
// import Checkout from "../checkout/Checkout";

// const Cart = () => {
//   const [items, setItems] = useState([]);
//   // const [cartSize, setCartSize] = useState([]);
//   const [run, setRun] = useState(false);

//   useEffect(() => {
//     console.log("MAX DEPTH ...");
//     setItems(getCart());
//   }, [run]);

//   const showItems = (items) => {
//     return (
//       <div>
//         <h2>Your cart has {`${items.length}`} items</h2>
//         <hr />
//         {items.map((product, i) => (
//           <Card
//             key={i}
//             product={product}
//             showAddToCartButton={false}
//             cartUpdate={true}
//             showRemoveProductButton={true}
//             setRun={setRun}
//             run={run}
//             // changeCartSize={changeCartSize}
//           />
//         ))}
//       </div>
//     );
//   };

//   const noItemsMessage = () => (
//     <h2>
//       Your Cart is empty. <br />
//       <Link to="/shop"> Continue shopping. </Link>
//     </h2>
//   );

//   return (
//     <Layout
//       title="Shopping Cart"
//       description="Checkout now!"
//       className="container-fluid"
//     >
//       <div className="row">
//         <div className="col-6">
//           {items.length > 0 ? showItems(items) : noItemsMessage()}
//         </div>
//         <div className="col-6">
//           <h2 className="mb-4">Your Cart Summary</h2>
//           <hr />
//         </div>
//         <button><Link to="/checkout"></Link>Checkout now</button>
//       </div>
//     </Layout>
//   );
// };

// export default Cart;

import React from "react";
import { addToCart, removeCart } from "../../../actions/cartActions";
import { useDispatch, useSelector } from "react-redux";

export default function Cart(props) {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.cartItems);
  // const qty = props.location.search
  //   ? Number(props.location.search.split("=")[1])
  //   : 1;

  const checkoutHandler = () => {  
    props.history.push("/signin?redirect=shipping");
  };

  
  return (
    <div>
      <h1>Shopping cart</h1>
      <div>
        {cartItems.length === 0 ? (
          <div>Empty cart</div>
        ) : (
          cartItems.map((item) => (
            <div>
              <p>{item.name}</p>
              <p>{item.description}</p>
              <span>Price : ${item.price}</span>
              <div>
                <select
                  value={item.qty}
                  onChange={(e) =>
                    dispatch(addToCart(item.product, e.target.value))
                  }
                >
                  {[...Array(item.quantity).keys()].map((x) => (
                    <option key={x + 1} value={x + 1}>
                      {x + 1}
                    </option>
                  ))}
                </select>
              </div>
              <button onClick={() => dispatch(removeCart(item.product))}>
                Delete cart
              </button>
            </div>
          ))
        )}
        <div className="cart_action">
          <h3>
            SubTotal({" "}
            {cartItems.reduce((a, c) => a + parseInt(c.qty), 0)}{" "}
            items)
          </h3>
          : ${" "}
          {
            cartItems.reduce((a, c) => a + parseInt(c.qty) * parseInt(c.qty), 0)}
          <button disabled={cartItems.length === 0 ? true : false} 
          style={{background:"blue", margin:"5px"}}
           onClick={checkoutHandler}>{cartItems.length === 0 ? "Continue shopping": "Proceed to Checkout" }</button>
        </div>
      </div>
    </div>
  );
}
