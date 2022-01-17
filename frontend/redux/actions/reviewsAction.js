import {api, publicApi} from "@/utils/api";
import { API } from "@/config/config";
import queryString from "query-string";
import axios from 'axios'

///////////////////////////////// { PRODUCTS REVIEWS //////////////////////////////////
//Add like to review 
export const AddLike = (productReviewId) => async (dispatch) => {
  try {
    const res = await api.put(`${API}/product/like/${productReviewId}`,);
    dispatch({
      type: "PRODUCT_REVIEW_LIKE",
      payload: res.data,
    });
  } catch (err) {    
    dispatch({
      type: "PRODUCT_ERROR",
    });
  }
};


export const RemoveLike = (productReviewId) => async (dispatch) => {
  try {
    const res = await api.put(`${API}/product/unlike/${productReviewId}`,);
    dispatch({
      type: "PRODUCT_REVIEW_UNLIKE",
      payload: res.data,
    });
  } catch (err) {    
    dispatch({
      type: "PRODUCT_ERROR",
    });
  }
};

export const RemoveReview = (reviewId) => async (dispatch) => {
  try {
    const res = await api.delete(`${API}/remove/review/${reviewId}`,);
    dispatch({
      type: "REMOVE_REVIEW",
      payload: res.data,
    });
  } catch (err) {    
    dispatch({
      type: "REVIEW_ERROR",
    });
  }
};


///////////////////////////////// USER REVIEWS //////////////////////////////////
 
export const Upvote = (reviewId) => async (dispatch) => {
  try {
    const res = await api.post(`${API}/review/vote`, reviewId);
    dispatch({
      type: "USER_REVIEW_UPVOTE",
      payload: res.data,
    });
  } catch (err) {    
    dispatch({
      type: "USER_ERROR",
    });
  }
};


export const Downvote = (reviewId) => async (dispatch) => {
  try {
    const res = await api.post(`${API}/review/downvote`, reviewId);
    dispatch({
      type: "USER_REVIEW_DOWNVOTE",
      payload: res.data,
    });
  } catch (err) {    
    dispatch({
      type: "USER_ERROR",
    });
  }
};