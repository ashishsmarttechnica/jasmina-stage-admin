const initialState = {
  data: [],
  loading: false,
  error: null,
  total: 0,
};

const SubscriptionReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SUBSCRIPTION_LOADING':
      return {
        ...state,
        loading: true,
        error: null,
      };
    case 'GET_ALL_SUBSCRIPTION':
      return {
        ...state,
        loading: false,
        data: action.payload,
        total: action.payload,
        error: null,
      };
    case 'DELETE_SUBSCRIPTION_SUCCESS':
      return {
        ...state,
        data: Array.isArray(state.data)
          ? state.data.filter((res) => res._id !== action.payload._id)
          : [],
        loading: false,
        error: null,
      };
    case 'UPDATE_SUBSCRIPTION_SUCCESS':
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
    case 'SUBSCRIPTION_ERROR':
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

export default SubscriptionReducer;
