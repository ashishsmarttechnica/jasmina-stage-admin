const initialState = {
  data: [],
  databyuser: [],
  loading: false,
  error: null,
  total: 0,
};

const PostReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'POST_LOADING':
      return {
        ...state,
        loading: true,
        error: null,
      };
    case 'GET_ALL_POST':
      return {
        ...state,
        loading: false,
        data: action.payload,
        total: action.payload,
        error: null,
      };
    case 'GET_ALL_POST_BY_USER':
      return {
        ...state,
        loading: false,
        databyuser: action.payload,
        error: null,
      };
    case 'GET_ALL_POST_BY_COMPANY':
      return {
        ...state,
        loading: false,
        databycompany: action.payload,
        error: null,
      };
    case 'GET_ALL_REPORTED_POST':
      return {
        ...state,
        loading: false,
        reportedData: action.payload,
        error: null,
      };
    case 'GET_SINGLE_POST':
      return {
        ...state,
        loading: false,
        singleData: action.payload,
        error: null,
      };
    case 'DELETE_POST_SUCCESS':
      return {
        ...state,
        data: {
          ...state.data,
          data: state.data.data.filter((res) => res._id !== action.payload),
        },
        loading: false,
        error: null,
      };
    case 'UPDATE_POST_SUCCESS':
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
    case 'POST_ERROR':
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

export default PostReducer;
