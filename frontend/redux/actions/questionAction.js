import {api, publicApi} from "@/utils/api";
import { API } from "@/config/config";

// create product
export const createQuestion = (productId, question) => async (dispatch) => {
  try {
    const res = await api.post(`${API}/question/${productId}`, question);
    dispatch({
      type: "QUESTION_ADDED_SUCCESFULLY",
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: "QUESTION_ERROR",
    });
  }
};

export const createAnswer = (questionId, answer) => async (dispatch) => {
  try {
    const res = await api.post(`${API}/answer/${questionId}`, answer);
    dispatch({
      type: "ANSWER_ADDED_SUCCESFULLY",
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: "QUESTION_ERROR",
    });
  }
};

// all products
export  const getQuestionsByProduct = (productId) => async (dispatch) => {
  try {
    const res = await api.get(
      `${API}/questions/${productId}`
    );
    dispatch({
      type: "GET_QUESTIONS",
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: "QUESTION_ERROR",
    });
  }
};


// all products
export  const QuestionUpvote = (questionId) => async (dispatch) => {
  try {
    const res = await api.get(
      `${API}/question/${questionId}/upvote`
    );
    dispatch({
      type: "QUESTION_UPVOTE",
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: "QUESTION_ERROR",
    });
  }
};

// all products
export  const QuestionDownvote = (questionId) => async (dispatch) => {
  try {
    const res = await api.get(
      `${API}/question/${questionId}/downvote`
    );
    dispatch({
      type: "QUESTION_DOWNVOTE",
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: "QUESTION_ERROR",
    });
  }
};