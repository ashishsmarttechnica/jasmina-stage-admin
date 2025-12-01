const initialState = {
  data: [],
  singleData: [],
  loading: false,
  singleLoadingData: false,
  error: null,
};

const ExpiredPlanReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'EXPIREDPLAN_LOADING':
      return {
        ...state,
        loading: true,
        error: null,
      };
    case 'GET_ALL_EXPIREDPLAN':
      return {
        ...state,
        loading: false,
        data: action.payload,
        error: null,
      };
    case 'EXPIREDPLAN_ERROR':
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

export default ExpiredPlanReducer;
