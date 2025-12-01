const initialState = {
  data: [],
  loading: false,
  error: null,
  total: 0,
};

const ContactReducer = (state = initialState, action) => {
  switch (action.type) {
    case "CONTACT_LOADING":
      return {
        ...state,
        loading: true,
        error: null,
      };
    case "GET_ALL_CONTACT":
      return {
        ...state,
        loading: false,
        data: action.payload,
        total: action.payload,
        error: null,
      };
    case "DELETE_CONTACT_SUCCESS":
      return {
        ...state,
        data: {
          ...state.data,
          data: state.data.contactUS.filter((res) => res._id !== action.payload),
        },
        loading: false,
        error: null,
      };
    case "CONTACT_ERROR":
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

export default ContactReducer;
