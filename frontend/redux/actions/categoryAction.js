import {api} from "@/utils/api";
import { API } from "@/config/config";

// create category
export const addCategory = (category) => async (dispatch) => {
  try {
    const res = await api.post(`${API}/category/create`, category);
    dispatch({
      type: "ADD_CATEGORY",
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: "CATEGORY_ERROR",
    });
  }
};
// all categories
export const getCategories = () => async (dispatch) => {
  try {
    const res = await api.get(`${API}/categories`);
    console.log(res)
    dispatch({
      type: "GET_CATEGORIES",
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: "CATEGORY_ERROR",
    });
  }
};
// get category by id
export const getCategory = (categoryId) => async (dispatch) => {
  try {
    const res = await api.get(`${API}/category/${categoryId}`);
    dispatch({
      type: "GET_CATEGORY",
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: "CATEGORY_ERROR",
    });
  }
};
// update category
export const updateCategory = (category, userId, categoryId) => async (
  dispatch
) => {
  try {
    const res = await api.put(
      `${API}/category/${categoryId}/${userId}`,
      category
    );
    dispatch({
      type: "UPDATE_CATEGORY",
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: "CATEGORY_ERROR",
    });
  }
};
