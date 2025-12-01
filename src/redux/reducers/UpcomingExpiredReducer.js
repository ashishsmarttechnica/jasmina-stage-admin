const initialState = {
  data: [],
  singleData: [],
  loading: false,
  singleLoadingData: false,
  error: null,
};


 const UpcomingExpiredPlanReducer = (state = initialState, action) => {
    switch (action.type) {
    case 'UPCOMING_EXPIREDPLAN_LOADING':
      return {
        ...state,
        loading: true,
        error: null,
      };
    case 'GET_ALL_UPCOMING_EXPIREDPLAN':
      return {
        ...state,
        loading: false,
        data: action.payload,
        error: null,
      };
    case 'UPCOMING_EXPIREDPLAN_ERROR':
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

export default UpcomingExpiredPlanReducer;
