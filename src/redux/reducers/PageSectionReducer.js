const initialState = {
    data: [],
    singleData: [],
    loading: false,
    singleLoadingData: false,
    error: null,
  };
  
  
  const pageReducer = (state = initialState, action) => {
    switch (action.type) {
      case "PAGE_SINGLE_LOADING":
        return {
          ...state,
          singleLoadingData: true,
          error: null,
        };
      case "PAGE_LOADING":
        return {
          ...state,
          loading: true,
          error: null,
        };
      case "GET_SINGLE_PAGE":
        return {
          ...state,
          singleLoadingData: false,
          singleData: action.payload,
          error: null,
        };
      case "GET_ALL_PAGE":
        return {
          ...state,
          loading: false,
          data: action.payload,
          error: null,
        };
      case "DELETE_PAGE_SUCCESS":
        return {
          ...state,
          data: Array.isArray(state.data)
            ? state.data.filter((res) => res._id !== action.payload._id)
            : [],
          loading: false,
          error: null,
        };
      case "PAGE_ERROR":
        return {
          ...state,
          loading: false,
          data: [],
          singleData: [],
          error: action.payload,
        };
      default:
        return state;
    }
  };
  
  export default pageReducer;
  