import {
  REGISTER_SUCCESS,
  //REGISTER_FAIL,
  USER_LOADED,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
  ACCOUNT_DELETED,
   FOLLOW_ERROR,
  FOLLOW_MANUFACTURER,
  GET_FOLLOWING,
  GET_ALL_MANUFACTURER,
  GET_SINGLE_MANUFACTURER,
  MANUFACTURER_ERROR
} from "../actions/types";

const initialState = {
  token: typeof window !== 'undefined' && window.localStorage.getItem("token"),
  following: [],
  user: {},
  shippingDetails: [],
  error: false,
  loading: true,
};

export const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case USER_LOADED:
      return {
        ...state,
        isAuthenticated: true,
        token: state.token,
        loading: false,
        user: action.payload,
        error: false 
      };
    case REGISTER_SUCCESS:
      return {
        ...state,
        ...action.payload,
        isAuthenticated: true,
        loading: false,
        error: false
      };
    case LOGIN_SUCCESS:
      localStorage.setItem("token", action.payload.token);
      return {
        ...state,
        ...action.payload,
        isAuthenticated: true,
        loading: false,
        error: false
      };
      case LOGIN_FAIL:
      return {
        ...state,
        error: true
      };
    case ACCOUNT_DELETED:
      return {
        ...state,
        token: null,
        isAuthenticated: false,
        loading: false,
        user: null,
      };
    case "UPDATE_USER_PROFILE":
      return {
        ...state,
        user: action.payload,
        loading:false
      };
    case "ADD_SHIPPING_INFO":
      return {
        ...state,
        shippingDetails: action.payload,
        loading: false,
      };
    case "EDIT_SHIPPING_INFO":
      return {
        ...state,
        shippingDetails: action.payload,
        loading: false,
      };
    case LOGOUT:
      return {
        ...state,
        token: null,
        isAuthenticated: false,
        loading: false,
        user: null,
      };
     case FOLLOW_MANUFACTURER:
      return {
        ...state,
        following: [...state.following, action.payload],
        loading: false,
      };
    case GET_FOLLOWING:
      return {
        ...state,
        following: action.payload,
        loading: false,
      };
    case FOLLOW_ERROR:
      return {
        ...state,
        error: action.payload,
      };
    case GET_ALL_MANUFACTURER:
      return {
        ...state,
        manufacturers: action.payload,
        loading: false,
      };
    case GET_SINGLE_MANUFACTURER:
      return {
        ...state,
        manufacturer: action.payload,
        loading: false,
      };
    case MANUFACTURER_ERROR:
      return {
        ...state,
        error: action.payload,
        loading: false,
      };
    
    default:
      return state;
  }
};
