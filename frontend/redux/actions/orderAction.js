import { api } from "@/utils/api";
import { API } from "@/config/config";
import axios from 'axios'

//create order
export const createOrder = (order) => async (dispatch, getState) => {
  try {
    dispatch({ type: "ORDER_CREATE_REQUEST", payload: order });
    const { auth: { token } } = getState();
    const { data: { data: newOrder } } = await axios.post(`${API}/order/create`, order, {
      headers: {
        Authorization: ' Bearer ' + token
      }
    });
    dispatch({ type: "ORDER_CREATE_SUCCESS", payload: newOrder });
  } catch (error) {
    dispatch({ type: "ORDER_CREATE_FAIL", payload: error.message });
  }
}


export const listMyOrders = () => async (dispatch, getState) => {
  try {
    dispatch({ type: "MY_ORDER_LIST_REQUEST" });
    const { auth: { token } } = getState();
    const { data } = await axios.get(`${API}/order/purchaseHistory`)
    dispatch({ type: "MY_ORDER_LIST_SUCCESS", payload: data })
  } catch (error) {
    dispatch({ type: "MY_ORDER_LIST_FAIL", payload: error.message });
  }
}

export const listOrders = () => async (dispatch, getState) => {

  try {
    dispatch({ type: "ORDER_LIST_REQUEST" });
    const { auth: { token } } = getState();
    const { data } = await axios.get("/api/orders", {
      headers:
        { Authorization: 'Bearer ' + token }
    });
    dispatch({ type: "ORDER_LIST_SUCCESS", payload: data })
  } catch (error) {
    dispatch({ type: "ORDER_LIST_FAIL", payload: error.message });
  }
}

export const detailsOrder = (orderId) => async (dispatch, getState) => {
  try {
    dispatch({ type: "ORDER_DETAILS_REQUEST", payload: orderId });
    const { auth: { token } } = getState();
    const { data } = await axios.get("/api/orders/" + orderId, {
      headers:
        { Authorization: 'Bearer ' + token }
    });
    dispatch({ type: "ORDER_DETAILS_SUCCESS", payload: data })
  } catch (error) {
    dispatch({ type: "ORDER_DETAILS_FAIL", payload: error.message });
  }
}

export const payOrder = (order, paymentResult) => async (dispatch, getState) => {
  try {
    dispatch({ type: "ORDER_PAY_REQUEST", payload: paymentResult });
    const { auth: { token } } = getState();
    const { data } = await axios.put(`${API}/order/` + order._id + "/pay", paymentResult, {
      headers:
        { Authorization: 'Bearer ' + token }
    });
    dispatch({ type: "ORDER_PAY_SUCCESS", payload: data })
  } catch (error) {
    dispatch({ type: "ORDER_PAY_FAIL", payload: error.message });
  }
}

export const deleteOrder = (orderId) => async (dispatch, getState) => {
  try {
    dispatch({ type: "ORDER_DELETE_REQUEST", payload: orderId });
    const { auth: { token } } = getState();
    const { data } = await axios.delete("/api/orders/" + orderId, {
      headers:
        { Authorization: 'Bearer ' + token }
    });
    dispatch({ type: "ORDER_DELETE_SUCCESS", payload: data })
  } catch (error) {
    dispatch({ type: "ORDER_DELETE_FAIL", payload: error.message });
  }
}

export const paymentMethodProcess = (paymentMethod) => async (dispatch) => {
  try{
    dispatch({ 
      type: "PAYMENT_METHOD_PROVIDER",
      payload: paymentMethod 
    });
  }
  catch (error) {
    dispatch({
      type: "ORDER_DELETE_FAIL",
      payload: error
  });
  }
}

export const manufacturerOrders = () => async ( dispatch ) => {
  try {
    const res = await api.get(`${API}/orders/by/admin`)
    dispatch({ 
      type: "MANUFACTURER_ORDERS", 
      payload:  res.data 
    });
  } catch (error) {
    dispatch({ 
      type: "MANUFACTURER_ORDERS_FAIL", 
      payload: error.message });
  }
}


// all orders
// export const listOrders = () => async (dispatch) => {
//   try {
//     const res = await api.get(`${API}/orders`);
//     dispatch({
//       type: "GET_ORDERS",
//       payload: res.data,
//     });
//   } catch (err) {
//     dispatch({
//       type: "ORDER_ERROR",
//     });
//   }
// };
// all orders
export const orderByUser = (page="0") => async (dispatch) => {
  try {
    const res = await api.get(`${API}/order/purchaseHistory?${page}`);
    dispatch({
      type: "GET_ORDERS_BY_USER",
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: "ORDER_ERROR",
    });  
  }
};
// order status values
export const getStatusValues = () => async (dispatch) => {
  try {
    const res = await api.get(`${API}/order/status-values`);
    dispatch({
      type: "ORDER_STATUS_VALUES",
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: "ORDER_ERROR",
    });
  }
};
// update order status
export const updateOrderStatus = (orderId, status) => async (dispatch) => {
  try {
    const res = await api.post(`${API}/order/${orderId}/update_status`, status);
    dispatch({
      type: "UPDATE_ORDER",
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: "ORDER_ERROR",
    });
  }
};

export const singleOrder = (orderId) => async (dispatch) => {
  try {
    const res = await api.get(`${API}/order/${orderId}`);
    dispatch({
      type: "SINGLE_ORDER",
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: "ORDER_ERROR",
    });  
  }
};

export const addNoteOrder = (orderId, note) => async (dispatch) => {
  try {
    const res = await api.put(`${API}/order/note/${orderId}`, note);
    dispatch({
      type: "ADD_NOTE_ORDER",
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: "ORDER_ERROR",
    });  
  }
};

export const removeNoteOrder = (orderId, formData) => async (dispatch) => {
  try {
    const res = await api.put(`${API}/order/remove/note/${orderId}`, formData);
    dispatch({
      type: "REMOVE_NOTE_ORDER",
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: "ORDER_ERROR",
    });  
  }
};

// get the review that the user has left for the manufactuer
export const getSingleReview = (formData) => async (dispatch) => {
  try{
    const res = await api.post(`${API}/single/review/manufacturer`, formData);
    dispatch({
      type: "GET_SINGLE_REVIEW",
      payload: res.data,
    });

  } catch(err){
    console.log(err)
    dispatch({
      type: "REVIEW_ERROR",
    });
  }
}
