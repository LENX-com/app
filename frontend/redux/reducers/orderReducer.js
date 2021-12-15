const initialState = {
    order: "",
    myOrders: [],
    orderItems: [],
    success:"",
    loading: "",
    singleReview:"",
    error: false,
    paymentMethod:"",
    manufacturerOrders:""
};

export const orderReducer = (state = initialState, action) => {
  switch (action.type) {
    case "ORDER_CREATE_REQUEST":
         return {
          ...state,
          loading: false,
        };
    case "ORDER_CREATE_SUCCESS":
      return { 
        ...state,
        loading: false,
        order: action.payload,
        success: true };
    case "ORDER_CREATE_FAIL":
      return { 
        ...state,
        loading: false,
        error: action.payload 
        };
    case "SINGLE_ORDER":
      return { 
        ...state,
        loading: false,
        order: action.payload,
        error: false, 
    };
    case "GET_ORDERS_BY_USER":
      return { 
        ...state,
        loading: false,
        myOrders: action.payload 
        };
    case "ORDER_DETAILS_REQUEST":
      return { 
        ...state,
        loading: true 
        };
    case "ORDER_DETAILS_SUCCESS":
      return { 
        ...state,
        loading: false,
        order: action.payload
        }; 
    case "ORDER_DETAILS_FAIL":
      return {
        ...state,
        loading: false, error:
        action.payload
        };
    case "MY_ORDER_LIST_REQUEST":
      return {
        ...state,
        myOrders: action.payload,
        loading: true 
        };
    case "MY_ORDER_LIST_SUCCESS":
      return { 
        ...state,
        loading: false, 
        myOrders: action.payload 
        };
    case "MY_ORDER_LIST_FAIL":
      return { 
        ...state,
        loading: false, 
        error: action.payload 
        };
    case "ORDER_ERROR":
      return {
        ...state,
        error: true,
        order: false,
        loading: false,
      };
    case "ORDER_LIST_REQUEST":
      return { 
        ...state,
        loading: true 
        };
    case "ORDER_LIST_SUCCESS":
      return { 
        ...state,
        loading: false, 
        orders: action.payload 
        };
    case "GET_SINGLE_REVIEW":
      return { 
        ...state,
        loading: false, 
        singleReview: action.payload 
        };
    case "ORDER_LIST_FAIL":
      return { 
        ...state,
        loading: false, 
        error: action.payload 
        };
    case "ORDER_PAY_REQUEST":
      return { 
        ...state,
        loading: true 
        };
    case "ORDER_PAY_SUCCESS":
      return { 
        ...state,
        loading: false, 
        success: true 
        };
    case "ORDER_PAY_FAIL":
      return { 
        ...state,
        loading: false,
        error: action.payload
        };
    case "ORDER_DELETE_REQUEST":
      return { 
        ...state,
        loading: true 
        };
    case "ORDER_DELETE_SUCCESS":
      return { 
        ...state,
        loading: false,
        success: true 
        };
    case "PAYMENT_METHOD_PROVIDER":
        return { 
        ...state,
        paymentMethod: action.payload
        };
    case "PAYMENT_METHOD_PROVIDER_FAIL":
        return { 
        ...state,
        error: action.payload
        };
    case "ORDER_DELETE_FAIL":
      return { 
        ...state,
        loading: false, 
        error: action.payload 
        };
      case "MANUFACTURER_ORDERS":
      return { 
        ...state,
        loading: false, 
        manufacturerOrders: action.payload 
        };
      case "MANUFACTURER_ORDERS_FAIL":
      return { 
        ...state,
        loading: false, 
        error: action.payload 
        };
    default: return state;
  }
}