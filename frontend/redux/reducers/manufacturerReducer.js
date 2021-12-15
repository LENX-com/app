const initialState = {
  products: [],
  profile: [],
  errors: {},
  loading: false,
  blogs: null,
};

export const manufacturerReducer = (state = initialState, action) => {
  switch (action.type) { 
    case "GET_MANUFACTURER_PROFILE":
      return {
        ...state,
        profile: action.payload,
        loading: false,
      };
    case "GET_MANUFACTURER_BLOGS":
      return {
        ...state,
        blogs: action.payload,
        loading: false,
      };
    case "GET_MANUFACTURER_PRODUCTS":
      return {
        ...state,
        products: action.payload,
        loading: false,
      };
    case "MANUFACTURER_ERROR":
        return {
            ...state,
            erros: action.payload
        } 
    default:
      return state;
  }
};
