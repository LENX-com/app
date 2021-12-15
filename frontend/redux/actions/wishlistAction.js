import { api } from "@/utils/api";
import { API } from "@/config/config";
import { setAlert } from "./alertAction";

export const addWishList = (productId) => async (dispatch) => {  
  try {
    const resp = await api.post(`${API}/wishlist/create/${productId}`);
    dispatch({
      type: "ADD_WISHLIST",
      payload: resp,
    });
    dispatch(setAlert("Product added to wishlist", "success"));
  } catch (error) {
    dispatch({
      type: "WISHLIST_ERROR",
      payload: error.response,
    });
  }
};
export const getWishList = () => async (dispatch) => {
  try {
    const resp = await api.get(`${API}/wishlist/read`);
    dispatch({
      type: "GET_WISHLIST",
      payload: resp.data,
    });
  } catch (error) {
    dispatch({
      type: "WISHLIST_ERROR",
      payload: error,
    });
    console.log(error);
  }
};
export const removeWishList = (wishId) => async (dispatch) => {
  try {
    await api.delete(`${API}/wishlist/remove/${wishId}`);
    dispatch({
      type: "DELETE_WISHLIST",
      payload: wishId,
    });
  } catch (error) {
    dispatch({
      type: "WISHLIST_ERROR",
      payload: error,
    });
    console.log(error);
  }
};
export const addToCart = (productId) => async (dispatch) => {
  try {
    const resp = await api.get(`${API}/wishlist/remove/${productId}`);
    dispatch({
      type: "ADD_TO_CART",
      payload: resp,
    });
  } catch (error) {
    dispatch({
      type: "WISHLIST_ERROR",
      payload: error,
    });
    console.log(error);
  }
};
