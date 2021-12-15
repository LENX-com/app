import {
  QUESTION_ADDED_SUCCESFULLY,
  ANSWER_ADDED_SUCCESFULLY,  
  QUESTION_ERROR,
  GET_QUESTIONS,
} from "../actions/types";

const initialState = {
  questions: [],
  loading: true,
  error: {},
};

export const questionReducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case GET_QUESTIONS:
      return {
        ...state,
        questions: payload,
        loading: false,
      };
    case ANSWER_ADDED_SUCCESFULLY:
      return {
        ...state,
        loading: false,
      };
    case QUESTION_ADDED_SUCCESFULLY:
      return {
        ...state,
        loading: false,
      };
     case QUESTION_ERROR:
      return {
        ...state,
        error: payload,
        loading: false,
      };
    default:
      return state;
  }
};
