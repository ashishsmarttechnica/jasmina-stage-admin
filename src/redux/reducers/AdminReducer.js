const initialState = {
  data: [],
  loading: false,
  error: null,
  total: 0,
};

const AdminReducer = (state = initialState, action) => {
  switch (action.type) {
    case "ADMIN_LOADING":
      return {
        ...state,
        loading: true,
        error: null,
      };
    case "GET_ALL_ADMIN":
      return {
        ...state,
        loading: false,
        data: action.payload,
        total: action.payload,
        error: null,
      };
    case "DELETE_ADMIN_SUCCESS":
      return {
        ...state,
        data: {
          ...state.data,
          data: state.data.data.filter((res) => res._id !== action.payload),
        },
        loading: false,
        error: null,
      };
    case "UPDATE_ADMIN_SUCCESS":
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
    case "ADMIN_ERROR":
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

export default AdminReducer;
