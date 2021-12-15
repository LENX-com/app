const initialState = {
  products: [],
  productsBySell: [],
  productsByArrival: [],
  productsByFilter: [],
  productsSearched: [],
  product: null,
  productReviews: [],
  errors: {},
  loading: false,
  brands: [],
};

export const productReducer = (state = initialState, action) => {
  switch (action.type) { 
    case "GET_PRODUCTS":
      return {
        ...state,
        products: action.payload,
        loading: false,
      };
    case "GET_PRODUCT":
      return {
        ...state,
        product: action.payload.data,
        loading: false,
      };
    case "GET_FILTERED_PRODUCT":
      return {
        ...state,
        products:action.payload,
        loading:false
      };
    case "GET_BRANDS":
      return {
        ...state,
        brands: action.payload,
        loading: false,
      };
    case "PRODUCT_REVIEWS":
      return {
        ...state,
        productReviews: action.payload,
        loading: false,
      };
    case "PRODUCT_BY_SELL":
      return {
        ...state,
        productsBySell: action.payload,
        loading: false,
      };
    case "GET_ARRIVAL_PRODUCTS":
      return {
        ...state,
        productsByArrival: action.payload,   
        loading: false,
      };
    case "GET_FILTERED_PRODUCT":
      return {
        ...state,
        productsByFilter: action.payload,
        loading: false,
      };
    case "GET_RELATED_PRODUCTS":
      return {
        ...state,
        relatedProducts: action.payload,
        loading: false,
      };
      case "PRODUCTS_BY_CATEGORY":
        return {
          ...state,
          productsByCategory: action.payload,
          loading: false,
        };
    case "GET_ALL_SEARCH_QUERY":
      return {
        ...state,
        productsSearched: action.payload,
        loading: false,
      };
      case "GET_SEARCH_QUERY_BY_STORES":
        return {
          ...state,
          productsSearched: action.payload,
          loading: false,
        };
        case "GET_SEARCH_QUERY_BY_PRODUCTS":
        return {
          ...state,
          productsSearched: action.payload,
          loading: false,
        };
    case "ADD_PRODUCT":
      return {
        ...state,
        products: [state.products, action.payload],
        loading: false,
      };
    case "EDIT_PRODUCT":
      return {
        ...state,
        products: action.payload,
        loading: false,
      };
    case "PRODUCT_ERROR":
      return {
        ...state,
        error: action.payload,
        loading: false,
      };
    case "PRODUCT_REVIEW_LIKE":
      return {
        ...state,
      };
    case "PRODUCT_REVIEW_UNLIKE":
      return {
        ...state,
      };
    default:
      return state;
  }
};
