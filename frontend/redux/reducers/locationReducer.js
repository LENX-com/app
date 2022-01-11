const initialState = {
  errors: {},
  loading: false,
  locations: [],
};

export const locationReducer = (state = initialState, action) => {
  switch (action.type) { 
    case "GET_LOCATIONS":
      return {
        ...state,
        locations:action.payload.data,
        loading:false
      };
    default:
      return state;
  }
};
