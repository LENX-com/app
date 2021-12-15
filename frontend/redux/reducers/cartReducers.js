const obj = process.browser && JSON.parse(localStorage.getItem("cart")) || [];


const initialState = {
  cartItems: obj,
  shipping: null,
  payment:null,
  loading: false,
};
export const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case "ADD_CART":
      const item = action.payload;
      const product = state.cartItems.find((x) => x.product === item.product);
      if (product) {
        return {
          cartItems: state.cartItems.map((x) =>
            x.product === product.product ? item : x
          ),
        };
      }
      return {
        cartItems: [...state.cartItems, item],
      };
    case "REMOVE_CART":
      return {
        ...state,
        cartItems: state.cartItems.filter(
          (item) => item.product !== action.payload
        ),
      };
    case "CART_SAVE_SHIPPING":
      return {
        ...state,
        shipping: action.payload,
      };
    case "CART_SAVE_PAYMENT":
      return {
        ...state,
        payment: action.payload,
      };
    default:
      return state;
  }
};
