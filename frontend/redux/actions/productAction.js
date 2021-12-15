import {api, publicApi} from "@/utils/api";
import { API } from "@/config/config";
import queryString from "query-string";
import axios from 'axios'
// create product
export const createProduct = (product) => async (dispatch) => {
  try {
    const res = await api.post(`${API}/product/create`, product);
    dispatch({
      type: "ADD_PRODUCT",
      payload: res.data,
    });
  } catch (err) {    
    dispatch({
      type: "PRODUCT_ERROR",
    });
  }
};
// all products
export  const getProducts = () => async (dispatch) => {
  try {
    const res = await api.get(
      `${API}/products`
    );
    dispatch({
      type: "GET_PRODUCTS",
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: "PRODUCT_ERROR",
    });
  }
};

// all products
export  const getBrands = (page= 0 , params) => async (dispatch) => {
  try {
    const res = await api.get(
      `${API}/product/by/brands/${page}${params}`
    );
    dispatch({
      type: "GET_BRANDS",
      payload: res.data,
    });
  } catch (err) {
    dispatch({  
      type: "PRODUCT_ERROR",
    });
  }
};

// all products
export  const getBrandsByCategory = (category) => async (dispatch) => {
  try {
    const res = await api.post(
      `${API}/brand/category/${category}`
    );
    dispatch({
      type: "GET_BRANDS",
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: "PRODUCT_ERROR",
    });
  }
};

// all products
export  const getAllSearchQuery = (params) => async (dispatch) => {
  console.log(params)

  try {
    const res = await api.get(
      `${API}/query-catalogues${params}`
    );
    dispatch({
      type: "GET_ALL_SEARCH_QUERY",
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: "PRODUCT_ERROR",
    });
  }
};

// all products
export  const getSearchQueryByStore = (params) => async (dispatch) => {

  try {
    const res = await api.get(
      `${API}/query-stores${params}`
    );
    dispatch({
      type: "GET_SEARCH_QUERY_BY_STORES",
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: "PRODUCT_ERROR",
    });
  }
};
// all products
export  const getSearchQueryByProducts = (params) => async (dispatch) => {

  try {
    const res = await api.get(
      `${API}/query-products${params}`
    );
    dispatch({
      type: "GET_SEARCH_QUERY_BY_PRODUCTS",
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: "PRODUCT_ERROR",
    });
  }
};




// all products
export const getProductsBySell = (sortBy) => async (dispatch) => {
  try {
    const res = await api.get(
      `${API}/products?sortBy=${sortBy}&order=desc&limit=6`
    );
    dispatch({
      type: "PRODUCT_BY_SELL",
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: "PRODUCT_ERROR",
    });
  }
};

// all products
export const getProductReviews = (productId) => async (dispatch) => {
  try {
    const res = await api.get(
      `${API}/product/reviews/${productId}`
    );
    dispatch({
      type: "PRODUCT_REVIEWS",
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: "PRODUCT_ERROR",
    });
  }
};

// all products
export const getProductsByArrival = (sortBy) => async (dispatch) => {
  try {
    const res = await api.get(
      `${API}/products?sortBy=${sortBy}&order=desc&limit=6`
    );
    dispatch({
      type: "GET_ARRIVAL_PRODUCTS",
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: "PRODUCT_ERROR",
    });
  }
};

//get filterd product
export const getFilteredProducts = (filters="") => async (
  dispatch
) => {
  try {
    const res = await api.get(`${API}/search/filters${filters}`);
    dispatch({
      type: "GET_FILTERED_PRODUCT",
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: "PRODUCT_ERROR",  
    });
  }
};

export const getProductByCategory = (categoryId) => async (dispatch) => {
  try {
    const res = await api.get(`${API}/products/by/category/${categoryId}`);
    dispatch({
      type: "PRODUCTS_BY_CATEGORY",  
      payload: res.data,
    });
  } catch (err) {
    console.log(err)
    dispatch({
      type: "PRODUCT_ERROR",
    });
  }
};

export const searchProduct = (params) => async (dispatch) => {
  const query = queryString.stringify(params);
  try {
    const res = await api.get(`${API}/products/search?${query}`);
    dispatch({
      type: "SEARCHED_PRODUCTS",
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: "PRODUCT_ERROR",
    });
  }
};

// delete product
export const deleteProduct = (productId) => async (dispatch) => {
  try {
    const res = await api.delete(`${API}/product/delete/${productId}`);
    dispatch({  
      type: "DELETE_PRODUCT",
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: "PRODUCT_ERROR",
    });
  }
};
// get product by id
export const getProduct = (slug) => async (dispatch) => {
  console.log(slug)
  try {
    const res = await api.get(`${API}/product/${slug}`);
    dispatch({
      type: "GET_PRODUCT",
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: "PRODUCT_ERROR",
      payload: err
    });
  }
};
// update product
export const updateProduct = (productId, product) => async (dispatch) => {
  console.log(product)
  try {
    const res = await api.put(`${API}/edit/product/${productId}`, product);
    dispatch({
      type: "EDIT_PRODUCT",
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: "PRODUCT_ERROR",
    });
  }
};


export const fetchProductsByFilter = async (arg) =>
  await axios.post(`${API}/search/filters`, arg);

  export const fetchBrandsByFilter = async (arg) =>
  await axios.post(`${API}/stores/search/filters`, arg);
  
  export const getProductsByCount = async (count) =>
  await axios.get(`${API}/products/${count}`);
  

export const adminProducts = (arg) => async (dispatch) => {
  try {
    const res = await axios.post(`${API}/search/filters`, arg);
    dispatch({
      type: "ADMIN_PRODUCTS",
      payload: res.data,
    })
  } catch(err) {
    dispatch({
      type: "ADMIN_PRODUCT_ERROR",
    })
  }
}

export const getSingleProduct = (productId) => async (dispatch) => {
  try {
    const res = await api.get(`${API}/product/${productId}`);
    dispatch({
      type: "ADMIN_SINGLE_PRODUCT",
      payload: res,
    });
  } catch (err) {
    dispatch({
      type: "ADMIN_PRODUCT_ERROR",
    });
  }
};
