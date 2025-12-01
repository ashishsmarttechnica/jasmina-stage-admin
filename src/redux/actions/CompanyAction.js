import { axiosClient } from './../../axios/axios';
const token = localStorage.getItem('token');

export const getPendingCompany = (data,isstatus,p, l) => {
  return async (dispatch) => {
    dispatch({ type: 'COMPANY_LOADING' });
    try {
      const res = await axiosClient.get(
        `/get/allCompany?search=${data}&status=${isstatus}&page=${p + 1}&limit=${l}`
      );
      // console.log(res,"asdasd");
      
      if (res.data.success) {
        dispatch({
          type: 'GET_ALL_COMPANY',
          payload: res.data.data,
        });
        return res.data;
      } else {
        dispatch({
          type: 'COMPANY_ERROR',
          payload: res.data.message || 'Failed to fetch COMPANYs',
        });
        return res.data;
      }
    } catch (error) {
      dispatch({
        type: 'COMPANY_ERROR',
        payload:
          error.response?.data?.message || 'An unexpected error occurred',
      });
      return error;
    }
  };
};

export const getSingleCompany = (id) => {
  return async (dispatch) => {
    dispatch({ type: 'COMPANY_SINGLE_LOADING' });
    try {
      const res = await axiosClient.get(`/get/company/profile?id=${id}`);

      if (res.data.success) {
        dispatch({
          type: 'GET_SINGLE_COMPANY',
          payload: res.data,
        });
        return res.data;
      } else {
        dispatch({
          type: 'COMPANY_ERROR',
          payload: res.data.message || 'Failed to fetch podcast',
        });
        return res.data;
      }
    } catch (error) {
      dispatch({
        type: 'COMPANY_ERROR',
        payload:
          error.response?.data?.message || 'An unexpected error occurred',
      });
      return error;
    }
  };
};

export const updateCompany = (id,formData) => {
  return async (dispatch) => {
    try {
      const res = await axiosClient.put(`/update/company?id=${id}`, formData);

      if (res.data.success) {
        dispatch({
          type: 'UPDATE_COMPANY_SUCCESS',
          payload: res.data,
        });
        return res.data;
      } else {
        dispatch({
          type: 'COMPANY_ERROR',
          payload: res.data.message || 'Failed to update podcast episode',
        });
        return res.data;
      }
    } catch (error) {
      return error;
    }
  };
};
export const updatePurchasedPlan = (formData) => {
  return async (dispatch) => {
    try {
      const res = await axiosClient.put(`updatePurchasedPlan`, formData); 
      if (res.data.success) {
        dispatch({
          type: 'UPDATE_PURCHASED_PLAN_SUCCESS', 
          payload: res.data,
        });
        return res.data;
      } else {    
        dispatch({
          type: 'COMPANY_ERROR',
          payload: res.data.message || 'Failed to update podcast episode',  
        });
        return res.data;
      }

    } catch (error) {
      return error; 
    }
  };
}