const initialState = {
    data: [],
    loading: false,
    error: null,
    total: 0,
  };
  
  const TransactionReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'TRANSACTION_LOADING':
        return {
          ...state,
          loading: true,
          error: null,
        };
      case 'GET_ALL_TRANSACTION':
        return {
          ...state,
          loading: false,
          data: action.payload,
          total: action.payload,
          error: null,
        };
      case 'GET_ALL_COMPANY_TRANSACTION':
        return {
          ...state,
          loading: false,
          data: action.payload,
          total: action.payload,
          error: null,
        };
      case 'DELETE_TRANSACTION_SUCCESS':
        return {
          ...state,
          data: Array.isArray(state.data)
            ? state.data.filter((res) => res._id !== action.payload._id)
            : [],
          loading: false,
          error: null,
        };
      case 'UPDATE_TRANSACTION_SUCCESS':
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
      case 'TRANSACTION_ERROR':
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
  
  export default TransactionReducer;
  