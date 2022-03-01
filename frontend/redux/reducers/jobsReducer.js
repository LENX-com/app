const initialState = {
  jobs: [],
  myJobs: [],
  job: {},
  errors: {},
  loading: false,
};

export const jobsReducer = (state = initialState, action) => {
  switch (action.type) { 
    case "ADD_JOB":
      return {
        ...state,
    };
    case "GET_USER_JOBS":
      return {
        ...state,
        myJobs: action.payload,
        loading: false,
    };
    case "GET_JOB_BY_ID":
      return {
        ...state,
        job: action.payload,
        loading: false,
    };
    case "GET_JOBS":
      return {
        ...state,
        jobs: action.payload,
        loading: false,
    };
    default:
      return state;
  }
};
