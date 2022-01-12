import { API } from "../../config";
import { api } from "@/utils/api";
import { setAlert } from "./alert";
import axios from 'axios'
import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  USER_LOADED,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
} from "./types";

// Load User
export const loadUser = () => async (dispatch) => {
  try {
    const res = await api.get(`${API}/auth`);

    dispatch({
      type: USER_LOADED,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: AUTH_ERROR,
    });
  }
};

// Register User
export const register = (formData) => async (dispatch) => {
  try {
    const res = await api.post(`${API}/signup`, formData);

    dispatch({
      type: REGISTER_SUCCESS,
      payload: res.data,
    });
    dispatch(loadUser());
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, "danger")));
    }

    dispatch({
      type: REGISTER_FAIL,
    });
  }
};

// Login User
export const login = (formdata) => async (dispatch) => {
  try {
    const res = await api.post(`${API}/signin`, formdata);
    dispatch({
      type: LOGIN_SUCCESS,
      payload: res.data,
    });
    dispatch(loadUser());
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, "danger")));
    }

    dispatch({
      type: LOGIN_FAIL,
      payload: err
    });
  }
};


 export const googleLogin = (response) => async (dispatch) => {
  try {
    const res = await axios({
            method: 'POST',
            url: `${API}/google-login`,
            data: { idToken: response.tokenId }
        })
    dispatch({
      type: "LOGIN_SUCCESS",
      payload: res.data,
    });
    dispatch(loadUser());
  } catch (err) {
    console.log(err)
    dispatch({
      type: "LOGIN_FAIL",
      payload: err
    });
  }
};

// Logout
export const logout = () => ({ type: LOGOUT });

// // Log user out
// export const logoutUser = () => dispatch => {
//   // Remove token from local storage
//   localStorage.removeItem("jwtToken");
//   // Remove auth header for future requests
//   setAuthToken(false);
//   // Set current user to empty object {} which will set isAuthenticated to false
//   dispatch(setCurrentUser({}));
// };

export const isAuthenticated = () => {
  if (typeof window == "undefined") {
    return false;
  }
  if (localStorage.getItem("jwt")) {
    return JSON.parse(localStorage.getItem("jwt"));
  } else {
    return false;
  }
};

//************************User crud profile update************************ */
export const userProfileUpdate = (formdata) => async (dispatch) => {
  try {
    const res = await api.post(`${API}/user/update`, formdata);
    dispatch({
      type: "UPDATE_USER_PROFILE",
      payload: res.data,
    });
  } catch (error) {
    dispatch({
      type: "UPDATE_USER_PROFILE_ERROR",
    });
  }
};

//************************User crud profile update************************ */
export const updateProfilePicture = (formdata) => async (dispatch) => {
  try {
    const res = await api.post(`${API}/user/update/profile-picture`, formdata);
    dispatch({
      type: "UPDATE_USER_PROFILE",
      payload: res.data,
    });
  } catch (error) {
    dispatch({
      type: "UPDATE_USER_PROFILE_ERROR",
    });
  }
};

//******************************shipping details******************************

//add order shipping info

export const addShippingInfo = (formdata) => async (dispatch) => {
  try {
    const res = await api.post(`${API}/shipping_details/create`, formdata);
    dispatch({
      type: "ADD_SHIPPING_DETAILS",
      payload: res.data,
    });
  } catch (error) {
    dispatch({
      type: "SHIPPING_DETAILS_ERROR",
    });
  }
};
//update order shipping info

export const updateShippingInfo = (formdata) => async (dispatch) => {
  try {
    const res = await api.post(`${API}/shipping_details/update`, formdata);
    dispatch({
      type: "EDIT_SHIPPING_DETAILS",
      payload: res.data,
    });
  } catch (error) {
    dispatch({
      type: "SHIPPING_DETAILS_ERROR",
    });
  }
};


