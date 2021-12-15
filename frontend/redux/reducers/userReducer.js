import {
  FOLLOW_ERROR,
  FOLLOW_MANUFACTURER,
  GET_FOLLOWING,
  GET_ALL_MANUFACTURER,
  GET_SINGLE_MANUFACTURER,
  MANUFACTURER_ERROR,
} from "../actions/types";
const initialState = {
  following: [],
  manufacturers: [],
  manufacturer: null,
  error: null,
  loading: true,
};
export const userReducer = (state = initialState, action) => {
  switch (action.type) {
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
