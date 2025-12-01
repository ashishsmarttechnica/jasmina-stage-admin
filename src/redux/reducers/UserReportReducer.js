const initialState = {
    data: [],
    repoterData: [],
    loading: false,
    error: null,
    total: 0,
  };
  
  const UserReportReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'USER_REPORT_LOADING':
        return {
          ...state,
          loading: true,
          error: null,
        };
      case 'GET_ALL_USER_REPORT':
        return {
          ...state,
          loading: false,
          data: action.payload,
          total: action.payload,
          error: null,
        };
      case 'GET_ALL_REPORT_DATA':
        return {
          ...state,
          loading: false,
          repoterData: action.payload,
          total: action.payload,
          error: null,
        };
      case 'DELETE_USER_REPORT_SUCCESS':
        return {
          ...state,
          data: Array.isArray(state.data)
            ? state.data.filter((res) => res._id !== action.payload._id)
            : [],
          loading: false,
          error: null,
        };
      case 'UPDATE_USER_REPORT_SUCCESS':
        return {
          ...state,
          data: Array.isArray(state.data)
            ? state.data.map(
                (res) => (res._id === action.payload._id ? action.payload : res), // Update the product
              )
            : [],
          loading: false,
          error: null,
        };
      case 'USER_REPORT_ERROR':
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
  
  export default UserReportReducer;
  