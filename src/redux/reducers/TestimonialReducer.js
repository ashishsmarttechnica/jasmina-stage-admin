const initialState = {
  data: [],
  loading: false,
  error: null,
  total: 0,
};

const TestimonialReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'TESTIMONIAL_LOADING':
      return {
        ...state,
        loading: true,      
        error: null,
      };
    case 'GET_ALL_TESTIMONIAL':
      return {
        ...state,
        loading: false,
        data: action.payload,
        total: action.payload,
        error: null,
      };
    case 'DELETE_TESTIMONIAL_SUCCESS':  
      return {
        ...state,
        data: {
          ...state.data,
          data: state.data.filter((res) => res._id !== action.payload),
        },
        loading: false,
        error: null,
      };
    case 'UPDATE_TESTIMONIAL_SUCCESS':
      return {
        ...state,   
        data: {
          ...state.data,
          data: state.data.map((res) => res._id === action.payload._id ? action.payload : res),
        },
        loading: false,
        error: null,
      };
    case 'TESTIMONIAL_ERROR':
      return {
        ...state,
        loading: false,     
        error: action.payload,
      };
    default:
      return state;
  }
};

export default TestimonialReducer;  