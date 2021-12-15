import {api, publicApi} from "@/utils/api";
import { API } from "@/config/config";
// create category
export const sendNewMessage = (formData) => async (dispatch) => {
  try {
    const res = await api.post(`${API}/message/new`, formData);
    dispatch({
      type: "NEW_MESSAGE",
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: "MESSAGE_ERROR",
    });
  }
};

export const getConversations = (user) => async (dispatch) => {
  try {
    const res = await api.get(`${API}/conversation/` + user._id);
    dispatch({
                type: "CONVERSATION",
                payload: res.data,
                })
  } catch (err) {
    console.log(err);
  }
};