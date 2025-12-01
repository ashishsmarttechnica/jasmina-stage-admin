import { axiosClient } from './../../axios/axios';
const token = localStorage.getItem('token');

export const getAllConatacts = (data, p, l) => {
  return async (dispatch) => {
    dispatch({ type: 'CONTACT_LOADING' });
    try {
      const res = await axiosClient.get(
        `/get/contactUs?search=${data}&page=${p + 1}&limit=${l}`
      );
      // console.log(res,"asdasd");
      
      if (res.data.success) {
        dispatch({
          type: 'GET_ALL_CONTACT',
          payload: res.data.data,
        });
        return res.data;
      } else {
        dispatch({
          type: 'CONTACT_ERROR',
          payload: res.data.message || 'Failed to fetch COMPANYs',
        });
        return res.data;
      }
    } catch (error) {
      dispatch({
        type: 'CONTACT_ERROR',
        payload:
          error.response?.data?.message || 'An unexpected error occurred',
      });
      return error;
    }
  };
};

export const deleteContact = (id) => {
  return async (dispatch) => {
    try {
      const res = await axiosClient.delete(`/delele/contactUs?id=${id}`);

      if (res.data.success) {
        dispatch({
          type: "DELETE_CONTACT_SUCCESS",
          payload: res.data,
        });
        return res.data;
      } else {
        dispatch({
          type: "CONTACT_ERROR",
          payload: res.data.message || "Failed to delete category",
        });
        return res.data;
      }
    } catch (error) {
      dispatch({
        type: "CONTACT_ERROR",
        payload:
          error.response?.data?.message || "An unexpected error occurred",
      });
      return error;
    }
  };
};