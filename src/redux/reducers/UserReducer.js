const initialState = {
  data: [],
  singleData: [],
  loading: false,
  singleLoadingData: false,
  error: null,
};

const UserReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'USER_LOADING':
      return {
        ...state,
        loading: true,
        error: null,
      };
    case 'USER_SINGLE_LOADING':
      return {
        ...state,
        singleLoadingData: true,
        error: null,
      };
    case 'GET_SINGLE_USER':
      return {
        ...state,
        singleLoadingData: false,
        singleData: action.payload,
        error: null,
      };
    case 'GET_ALL_USER':
      return {
        ...state,
        loading: false,
        data: action.payload,
        total: action.payload,
        error: null,
      };
    case 'DELETE_USER_SUCCESS':
      return {
        ...state,
        data: {
          ...state.data,
          data: state.data.filter((res) => res._id !== action.payload),
        },
        loading: false,
        error: null,
      };
    case 'UPDATE_USER_SUCCESS':
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

    case 'USER_ERROR':
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

export default UserReducer;
