const initialState = {
  wishlists: [],
  loading: false,
  error: {},
};

export const wishListReducer = (state = initialState, action) => {
  switch (action.type) {
    case "ADD_WISHLIST":
      return {
        ...state,
        wishlists: [...state.wishlists, action.payload.data],
        loading: false,
      };
    case "GET_WISHLIST":
      return {
        ...state,
        wishlists: action.payload,
        loading: false,
      };
    case "DELETE_WISHLIST":
      return {
        ...state,
        wishlists: state.wishlists.filter(
          (wish) => wish._id !== action.payload
        ),
        loading: false,
      };
      case "CLEAR_WISHLIST_ERROR":
      return {
        ...state,
        error:{},
        loading: false,
      };
    case "WISHLIST_ERROR":
      return {
        ...state,
        error: action.payload,
        loading: false,
      };
    default:
      return state;
  }
};
