const initialState = {
  data: null,
  loading: false,
  error: null,
};

const SettingReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SETTING_LOADING':
      return { ...state, loading: true, error: null };
    case 'GET_ALL_SETTING':
      return { ...state, loading: false, data: action.payload, error: null };
    case 'UPDATE_SETTING_SUCCESS':
      return { ...state, loading: false, data: action.payload, error: null };
    case 'SETTING_ERROR':
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

export default SettingReducer;


