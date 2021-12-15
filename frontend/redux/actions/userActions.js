import { API } from "../../config";
import { api } from "@/utils/api";
import { FOLLOW_MANUFACTURER, FOLLOW_ERROR, GET_FOLLOWING,GET_ALL_MANUFACTURER, MANUFACTURER_ERROR, GET_SINGLE_MANUFACTURER, REVIEWS_ADMIN_ERROR, REVIEWS_ADMIN } from "./types";

//follow manufacturer page
export const followManufacturer = ( manufacturerId ) => async (dispatch) => {
  try {
    const res = await api.post(`${ API}/follow/${manufacturerId}` )
    dispatch({
      type: FOLLOW_MANUFACTURER,
      payload: res.data,
    });
  } catch (error) {
    dispatch({
      type: FOLLOW_ERROR,
    });  
  }
};

//get all people you are following
export const getFollowing = () => async (dispatch) => {
  try {
    const res = await api.get(`${API}/following`);
    dispatch({
      type: GET_FOLLOWING,
      payload: res.data,
    });
  } catch (error) {
    dispatch({
      type: FOLLOW_ERROR,   
    });
  }  
};

export const getAllManufacturer = () => async (dispatch) => {
  try {
    const res = await api.get(`${API}/manufacturer`)
    dispatch({
      type:GET_ALL_MANUFACTURER,
      payload:res.data
    })
  } catch (err) {
    dispatch({ 
      type:MANUFACTURER_ERROR,
    });
  
  }
};
export const getSingleManufacturer = (slug) => async (dispatch) => {
  try {
    const res = await api.get(`${API}/manufacturer/${slug}`)
    dispatch({
      type:GET_SINGLE_MANUFACTURER,
      payload:res.data
    })
  } catch (err) {
    dispatch({
      type:MANUFACTURER_ERROR,
    });
  
  }
};

export const getReviewsByManufacturer = (slug) => async (dispatch) => {
  try {
    const res = await api.get(`${API}/reviews/manufacturer/${slug}`)
    dispatch({
      type:REVIEWS_ADMIN,
      payload:res.data
    })
  } catch (err) {
    dispatch({
      type:REVIEWS_ADMIN_ERROR,
      payload: err
    });   
  
  }
};


export const addReviewManufacturer = (formData) => async (dispatch) => {
  try {
    const res = await api.post(`${API}/review/create/manufacturer/`, formData)
    dispatch({
      type:"ADD_REVIEW_MANUFACTURER",
      payload:res.data
    })
  } catch (err) {
    dispatch({
      type:"REVIEWS_ERROR",
      payload: err
    });   
    
  }
};

//ADMIN
export const sendResponse = (reviewId, response) => async (dispatch) => {
  try {
    const res = await api.post(`${API}/review/response/${reviewId}`, response)
    dispatch({
      type: "SEND_RESPONSE",
    })
  } catch (err) {
    dispatch({
      type:REVIEWS_ADMIN_ERROR,
      payload: err
    });
  
  }
};

export const removeResponse =  (reviewId) => async (dispatch) => {
  try {
    const res = await api.put(`${API}/review/remove/response/${reviewId}`)
    dispatch({
      type: "REMOVE_RESPONSE",
    })
  } catch (err) {
    dispatch({
      type:REVIEWS_ADMIN_ERROR,
      payload: err
    });
  
  }}


//Apply to become a seller api
export const sendApplication = (response) => async (dispatch) => {
  try {
    const res = await api.put(`${API}/send`, response)
    dispatch({
      type: "SEND_RESPONSE",
    })
  } catch (err) {
    dispatch({
      type:"RESPONSE_ERROR",
      payload: err
    });
  
  }
};