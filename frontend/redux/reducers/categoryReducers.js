const initialState = {
  categories: [],
  category: null,
  errors: {},
  loading: false,
};

export const categoryReducer = (state = initialState, action) => {
  switch (action.type) {
    case "GET_CATEGORIES":
      return {
        ...state,
        categories: action.payload,
        loading: false,
      };
    case "GET_CATEGORY":
      return {
        ...state,
        category: action.payload,
        loading: false,
      };
    case "ADD_CATEGORY":
      return {
        ...state,
        ...action.payload,
        categories: [action.payload, ...state.categories],
        loading: false,
      };
    case "CATEGORY_ERROR":
      return {
        ...state,
        error: action.payload,
        loading: false,
      };
    default:
      return state;
  }
};
