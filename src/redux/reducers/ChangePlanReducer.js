const initialState = {
    data: [],
    loading: false,
    error: null,
    total: 0,
  };
  
  const ChangePlanReducer = (state = initialState, action) => {
    switch (action.type) {
      case "CHANGE_PLAN_LOADING":
        return {
          ...state,
          loading: true,
          error: null,
        };
      case "GET_ALL_CHANGE_PLAN":
        return {
          ...state,
          loading: false,
          data: action.payload,
          total: action.payload,
          error: null,
        };
      case "DELETE_CHANGE_PLAN_SUCCESS":
        return {
          ...state,
          data: Array.isArray(state.data)
          ? state.data.filter((res) => res._id !== action.payload._id)
          : [],
          loading: false,
          error: null,
        };
      case "UPDATE_CHANGE_PLAN_SUCCESS":
        return {
          ...state,
          data: Array.isArray(state.data)
          ? state.data.map((res) =>
              (res._id === action.payload._id ? action.payload : res), // Update the product
            )
          : [],
          loading: false,
          error: null,
        };
      case "CHANGE_PLAN_ERROR":
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
  
  export default ChangePlanReducer;
  