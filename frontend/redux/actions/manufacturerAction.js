import {api, publicApi} from "@/utils/api";
import { API } from "@/config/config";
import queryString from "query-string";
import axios from 'axios'
// create product

export const getManufacturerProfile = (slug) => async (dispatch) => {
  try {
    const res = await api.get(`${API}/manufacturer/slug/${slug}`);
    dispatch({
      type: "GET_MANUFACTURER_PROFILE",
      payload: res.data,
    });
  } catch (err) {    
    dispatch({
      type: "MANUFACTURER_ERROR",
    });
  }
};

export const getProductsBySlug = (slug) => async (dispatch) => {
  try {
    const res = await api.get(`${API}/products/${slug}`);
    dispatch({
      type: "GET_MANUFACTURER_PRODUCTS",
      payload: res.data,
    });
  } catch (err) {    
    dispatch({
      type: "MANUFACTURER_ERROR",
    });
  }
}; 