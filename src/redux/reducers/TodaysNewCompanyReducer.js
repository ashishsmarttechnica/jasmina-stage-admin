const initialState = {
  data: [],
  singleData: [],
  loading: false,
  singleLoadingData: false,
  error: null,
};

const TodaysNewCompanyReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'TODAYS_NEW_COMPANY_LOADING':
      return { ...state, loading: true, error: null };
    case 'GET_ALL_TODAYS_NEW_COMPANY':
      return { ...state, loading: false, data: action.payload, error: null };
    case 'TODAYS_NEW_COMPANY_ERROR':
      return { ...state, loading: false, data: [], error: action.payload };
    default:
      return state;
  }
};

export default TodaysNewCompanyReducer;


