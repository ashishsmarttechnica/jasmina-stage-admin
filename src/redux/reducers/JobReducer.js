const initialState = {
    data: [],
    loading: false,
    error: null,
    total: 0,
  };
  
  const JobReducer = (state = initialState, action) => {
    switch (action.type) {
      case "JOB_LOADING":
        return {
          ...state,
          loading: true,
          error: null,
        };
      case "GET_ALL_JOB":
        return {
          ...state,
          loading: false,
          data: action.payload,
          total: action.payload,
          error: null,
        };
      case "DELETE_JOB_SUCCESS":
        return {
          ...state,
          data: {
            ...state.data,
            data: state.data.data.filter((res) => res._id !== action.payload),
          },
          loading: false,
          error: null,
        };
      case "UPDATE_JOB_SUCCESS":
        return {
          ...state,
          data: {
            ...state.data,
            data: state.data.data.map((res) =>
              res._id === action.payload._id ? action.payload : res
            ),
          },
          loading: false,
          error: null,
        };
      case "JOB_ERROR":
        return {
          ...state,
          loading: false,
          data: [],
          error: action.payload,
        };
      default:
        return state;
    }
  };
  
  export default JobReducer;
  