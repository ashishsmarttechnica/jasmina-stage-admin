import { axiosClient } from '../../axios/axios';
const token = localStorage.getItem('token');

export const getAllUserReport = (data,status, p, l) => {
  return async (dispatch) => {
    dispatch({ type: 'USER_REPORT_LOADING' });
    try {
      const res = await axiosClient.get(
        `/get/all/reports?status=${status}&page=${p + 1}&limit=${l}&search=${data}`
      );

      if (res.data.success) {
        dispatch({
          type: 'GET_ALL_USER_REPORT',
          payload: res.data,
        });
        return res.data;
      } else {
        dispatch({
          type: 'USER_REPORT_ERROR',
          payload: res.data.message || 'Failed to fetch spam',
        });
        return res.data;
      }
    } catch (error) {
      console.error(error);
      dispatch({
        type: 'USER_REPORT_ERROR',
        payload:
          error.response?.data?.message || 'An unexpected error occurred',
      });
      return error;
    }
  };
};
export const getRepoterData = (data,status, p, l, id) => {
  return async (dispatch) => {
    dispatch({ type: 'USER_REPORT_LOADING' });
    try {
      const res = await axiosClient.get(
        `/get/all/reports?search=${data}&page=${p + 1}&limit=${l}&status=${status}&userId=${id}`
      );

      if (res.data.success) {
        dispatch({
          type: 'GET_ALL_REPORT_DATA',
          payload: res.data,
        });
        return res.data;
      } else {
        dispatch({
          type: 'USER_REPORT_ERROR',
          payload: res.data.message || 'Failed to fetch spam',
        });
        return res.data;
      }
    } catch (error) {
      console.error(error);
      dispatch({
        type: 'USER_REPORT_ERROR',
        payload:
          error.response?.data?.message || 'An unexpected error occurred',
      });
      return error;
    }
  };
};

export const createUserReport = (formData) => {
  return async (dispatch) => {
    // dispatch({ type: "SUBADMIN_LOADING" }); // Start the loader
    try {
      const res = await axiosClient.post('/create/report', formData);

      if (res.data.success) {
        dispatch({
          type: 'CREATE_USER_REPORT_SUCCESS',
          payload: res.data,
        });
        return res.data;
      } else {
        dispatch({
          type: 'USER_REPORT_ERROR',
          payload: res.data.message || 'Failed to create reported user',
        });
        return res.data;
      }
    } catch (error) {
      dispatch({
        type: 'USER_REPORT_ERROR',
        payload:
          error.response?.data?.message || 'An unexpected error occurred',
      });
      return error;
    }
  };
};
