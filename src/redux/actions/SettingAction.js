import { axiosClient } from '../../axios/axios';

export const getAllSetting = () => {
  return async (dispatch) => {
    dispatch({ type: 'SETTING_LOADING' });
    try {
      const res = await axiosClient.get(`/global/freejob`);
      if (res.data?.success) {
        dispatch({ type: 'GET_ALL_SETTING', payload: res.data.data });
        return res.data;
      } else {
        dispatch({ type: 'SETTING_ERROR', payload: res.data?.message || 'Failed to fetch settings' });
        return res.data;
      }
    } catch (error) {
      dispatch({ type: 'SETTING_ERROR', payload: error.response?.data?.message || 'An unexpected error occurred' });
      return error;
    }
  };
};

export const updateSetting = (data) => {
  return async (dispatch) => {
    try {
      const res = await axiosClient.post(`/global/freejob`, data);
      if (res.data?.success) {
        dispatch({ type: 'UPDATE_SETTING_SUCCESS', payload: res.data.data });
        return res.data;
      } else {
        dispatch({ type: 'SETTING_ERROR', payload: res.data?.message || 'Failed to update settings' });
        return res.data;
      }
    } catch (error) {
      dispatch({ type: 'SETTING_ERROR', payload: error.response?.data?.message || 'An unexpected error occurred' });
      return error;
    }
  };
};


