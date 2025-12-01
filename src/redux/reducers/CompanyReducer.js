const initialState = {
  data: [],
  singleData: [],
  loading: false,
  singleLoadingData: false,
  error: null,
};

const CompanyReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'COMPANY_LOADING':
      return {
        ...state,
        loading: true,
        error: null,
      };
    case 'COMPANY_SINGLE_LOADING':
      return {
        ...state,
        singleLoadingData: true,
        error: null,
      };
    case 'GET_SINGLE_COMPANY':
      return {
        ...state,
        singleLoadingData: false,
        singleData: action.payload,
        error: null,
      };
    case 'GET_ALL_COMPANY':
      return {
        ...state,
        loading: false,
        data: action.payload,
        error: null,
      };
    case 'DELETE_COMPANY_SUCCESS':
      return {
        ...state,
        data: {
          ...state.data,
          data: state.data.data.filter((res) => res._id !== action.payload),
        },
        loading: false,
        error: null,
      };
    case 'UPDATE_COMPANY_SUCCESS':
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
      case 'UPDATE_PURCHASED_PLAN_SUCCESS':
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
    case 'COMPANY_ERROR':
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

export default CompanyReducer;
