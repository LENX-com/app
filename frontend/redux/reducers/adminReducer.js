const initialState = {
  products: [],
  singleProduct: undefined ,
  errors: {},
  blogs: [],
  singleBlog: undefined,
  reviews: false,
  loading: false,
  locations: [],
};

export const adminReducer = (state = initialState, action) => {
  switch (action.type) { 
    case "ADMIN_PRODUCTS":
      return {
        ...state,
        products: action.payload,
        loading: false,
      };
     case "ADMIN_SINGLE_PRODUCT":
      return {
        ...state,
        singleProduct: action.payload.data,
        loading: false,
      };
    case "ADMIN_PRODUCT_ERROR":
      return {
        ...state,
        errors: action.payload?.data,
        loading: false,
      };
     case "ADMIN_BLOGS":
      return {
        ...state,
        blogs: action.payload,
        loading: false,
      };
      case "ADMIN_BLOG_ERROR":
      return {
        ...state,
        errors: action.payload,  
        loading: false,
      };
      case "ADMIN_BLOG_ADDED":
      return {
        ...state
      };
      case "SINGLE_BLOG_ADMIN":
      return {
        ...state,
        singleBlog: action.payload,
      };
      case "REVIEWS_ADMIN":
        return {
        ...state,
        reviews: action.payload.data,
      };
      case "LOCATIONS_ADMIN":
        return {
        ...state,
        locations: actions.payload,
      };
      case "REVIEWS_ADMIN_ERROR":
        return {
        ...state,
        errors: action.payload,
      };
       case "SEND_RESPONSE":
        return {
        ...state,
      };
      case "REMOVE_RESPONSE":
      return {
        ...state,
      };
    default:
      return state;
  }
};
