const initialState = {
    data: [],
    loading: false,
    error: null,
    total: 0,
  };
  
  const CountryReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'COUNTRY_LOADING':
        return {
          ...state,
          loading: true,
          error: null,
        };
      case 'GET_ALL_COUNTRY':
        return {
          ...state,
          loading: false,
          data: action.payload,
          total: action.payload,
          error: null,
        };
      case 'DELETE_COUNTRY_SUCCESS':
        return {
          ...state,
          data: Array.isArray(state.data)
            ? state.data.filter((res) => res._id !== action.payload._id)
            : [],
          loading: false,
          error: null,
        };
      case 'UPDATE_COUNTRY_SUCCESS':
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
      case 'COUNTRY_ERROR':
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
  
  export default CountryReducer;
  