import { api } from "@/utils/api";
import { setAlert } from "./alertAction";
import {
  GET_POSTS,
  POST_ERROR,
  UPDATE_LIKES,
  GET_ALL_BLOG_BY_FOLLOWING,
  GET_ALL_BLOG_BY_SINGLE_FOLLOWING_MANUFACTURER,
  DELETE_POST,
  ADD_POST,
  GET_POST,
  ADD_COMMENT,
  REMOVE_COMMENT,
  ADMIN_BLOGS,
  ADMIN_BLOG_ERROR
} from "./types";
import { API } from "../../config";
import axios from "axios";

// Get posts
export const getPosts = () => async (dispatch) => {
  try {
    const res = await api.get(`${API}/blog`);

    dispatch({
      type: GET_POSTS,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: POST_ERROR,
      payload: { msg: err, status: err },
    });
  }
};

// Add like
export const addLike = (id) => async (dispatch) => {
  try {
    const res = await api.put(`${API}/blog/like/${id}`);
    dispatch({
      type: UPDATE_LIKES,
      payload: { id, likes: res.data },
    });
  } catch (err) {
    console.log(err.response);
    dispatch({
      type: POST_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// Remove like
export const removeLike = (id, token) => async (dispatch) => {
  try {
    const res = await api.put(`${API}/blog/unlike/${id}`);
    dispatch({
      type: UPDATE_LIKES,
      payload: { id, likes: res.data },
    });
  } catch (err) {
    console.log(err.response);
    dispatch({
      type: POST_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// Delete post
export const deletePost = (id) => async (dispatch) => {
  try {
    await api.delete(`${API}/blog/${id}`);
    dispatch({
      type: DELETE_POST,
      payload: id,
    });

    dispatch(setAlert("Post Removed", "success"));
  } catch (err) {
    dispatch({
      type: POST_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// Add post
export const addPost = (formData) => async (dispatch) => {
  try {
    const res = await api.post(`${API}/blog/`, formData);

    dispatch({
      type: ADD_POST,
      payload: res.data,
    });

    dispatch(setAlert("Post Created", "success"));
  } catch (err) {
    console.log(err.response);
  }
};

// Get post
export const getPost = (id) => async (dispatch) => {
  try {
    const res = await api.get(`${API}/blog/${id}`);
    dispatch({
      type: GET_POST,
      payload: res.data,
    });
    console.log(res);
  } catch (err) {
    dispatch({
      type: POST_ERROR,
      payload: { msg: err, status: err },
    });
  }
};

export const getPostByManufacturer = (manufacturerId) => async (dispatch) => {
  try {
    const res = await api.get(`${API}/blogs/${manufacturerId}`);
    dispatch({
      type: "GET_MANUFACTURER_BLOGS",
      payload: res.data,
    });
    console.log(res);
  } catch (err) {
    dispatch({
      type: POST_ERROR,
      payload: { msg: err, status: err },
    });
  }
};


// Get posts for admin dashboard
export const getPostsByUser = () => async (dispatch) => {
  try {
    const res = await api.get(`${API}/blogs/user`);
    dispatch({
      type: ADMIN_BLOGS,
      payload: res.data,
    });
    console.log(res);
  } catch (err) {
    dispatch({
      type: ADMIN_BLOG_ERROR,
      payload: { msg: err, status: err },
    });
  }
};

// Get post
export const getPostAdmin = (id) => async (dispatch) => {
  try {
    const res = await api.get(`${API}/blog/${id}`);
    dispatch({
      type:  "SINGLE_BLOG_ADMIN",
      payload: res.data,
    });
    console.log(res);
  } catch (err) {
    dispatch({
      type: ADMIN_BLOG_ERROR,
      payload: { msg: err, status: err },
    });
  }
};

export const editPost = (id, formData) => async (dispatch) => {
  try {
    const res = await api.put(`${API}/blog/edit/${id}`, formData);
    dispatch({
      type:  "EDIT_ADMIN_BLOGS",
      payload: res.data,
    });
    console.log(res);
  } catch (err) {
    dispatch({
      type: "ADMIN_BLOG_ERROR",
      payload: { msg: err, status: err },
    });
  }
};



// Add comment
export const addComment = (postId, formData) => async (dispatch) => {
  try {
    const res = await api.post(`${API}/blog/comment/${postId}`, formData);
    dispatch({
      type: ADD_COMMENT,
      payload: res.data,
    });

    dispatch(setAlert("Comment Added", "success"));
  } catch (err) {
    dispatch({
      type: POST_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// Delete comment
export const deleteComment = (postId, commentId, token) => async (dispatch) => {
  try {
    await axios.delete(`${API}/blog/comment/${postId}/${commentId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    dispatch({
      type: REMOVE_COMMENT,
      payload: commentId,
    });

    dispatch(setAlert("Comment Removed", "success"));
  } catch (err) {
    dispatch({
      type: POST_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

//get all the blogs of all the manufacturer you are following
export const allBlogsByfollowing = () => async (dispatch) => {
  try {
    const res = await api.get(`${API}/blog/following`);
    dispatch({
      type: GET_ALL_BLOG_BY_FOLLOWING,
      payload: res.data,
    });
  } catch (error) {
    dispatch({
      type: POST_ERROR,
      payload: error,
    });
  }
};

//get all blogs for a single manufacturer you are following.

export const allBlogsBySingleFollowing = (formdata) => async (dispatch) => {
  try {
    const res = await api.post(`${API}/blog/following/single`, formdata);
    dispatch({
      type: GET_ALL_BLOG_BY_SINGLE_FOLLOWING_MANUFACTURER,
      payload: res.data,
    });
  } catch (error) {
    dispatch({
      type: POST_ERROR,
      payload: error,
    });
  }
};

export const myUsers = () => async (dispatch) => {
  try {
    const res = await api.get(`${API}/all`);
    dispatch({
      type: "MY_USERS",
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: "MY_USER_ERROR",
    });
  }
};
