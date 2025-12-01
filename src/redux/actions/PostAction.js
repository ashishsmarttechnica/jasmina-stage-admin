import { axiosClient } from '../../axios/axios';
const token = localStorage.getItem('token');

export const getAllPost = (data,status,p, l) => {
  return async (dispatch) => {
    dispatch({ type: 'POST_LOADING' });
    try {
      const res = await axiosClient.get(
        `/getall/posts?search=${data}&status=${status}&page=${p + 1}&limit=${l}`
      );

      if (res.data.success) {
        dispatch({
          type: 'GET_ALL_POST',
          payload: res.data.data,
        });
        return res.data;
      } else {
        dispatch({
          type: 'POST_ERROR',
          payload: res.data.message || 'Failed to fetch spam',
        });
        return res.data;
      }
    } catch (error) {
      console.error(error);
      dispatch({
        type: 'POST_ERROR',
        payload:
          error.response?.data?.message || 'An unexpected error occurred',
      });
      return error;
    }
  };
};

export const getAllPostbyUser = (userId, p, l) => {
  const token = localStorage.getItem('token');
  console.log(userId);
  return async (dispatch) => {
    dispatch({ type: '_LOADING' });
    try {
      const res = await axiosClient.get(
        `/get/user/posts?userId=${userId}&page=${p + 1}&limit=${l}`
      );

      // console.log(res); 
      if (res.data.success) {
        dispatch({
          type: 'GET_ALL_POST_BY_USER',
          payload: res.data.data,
          total: res.data.total,
        });
        // console.log(res.data.data);
        return res.data;
      } else {
        dispatch({
          type: 'POST_ERROR',
          payload: res.data.message || 'Failed to fetch data',
        });
        return res.data;
      }
    } catch (error) {
      console.error('Error in API call:', error);
      return error;
    }
  };
};
export const getAllPostbyCompany = (userId,userType, p, l) => {
  const token = localStorage.getItem('token');
  console.log(userId);
  return async (dispatch) => {
    dispatch({ type: '_LOADING' });
    try {
      const res = await axiosClient.get(
        `/get/user/posts?userId=${userId}&userType=${userType}&page=${p + 1}&limit=${l}`
      );

      // console.log(res); 
      if (res.data.success) {
        dispatch({
          type: 'GET_ALL_POST_BY_USER',
          payload: res.data.data,
          total: res.data.total,
        });
        // console.log(res.data.data);
        return res.data;
      } else {
        dispatch({
          type: 'POST_ERROR',
          payload: res.data.message || 'Failed to fetch data',
        });
        return res.data;
      }
    } catch (error) {
      console.error('Error in API call:', error);
      return error;
    }
  };
};

export const createAdmin = (formData) => {
  const token = localStorage.getItem('token');
  return async (dispatch) => {
    // dispatch({ type: "SUBADMIN_LOADING" }); // Start the loader
    try {
      const res = await axiosClient.post('/create/admin', formData);

      if (res.data.success) {
        dispatch({
          type: 'CREATE_ROLE_SUCCESS',
          payload: res.data.category,
        });
        return res.data;
      } else {
        dispatch({
          type: 'ADMIN_ERROR',
          payload: res.data.message || 'Failed to create category',
        });
        return res.data;
      }
    } catch (error) {
      dispatch({
        type: 'ADMIN_ERROR',
        payload:
          error.response?.data?.message || 'An unexpected error occurred',
      });
      return error;
    }
  };
};

export const deleteAdmin = (id) => {
  return async (dispatch) => {
    try {
      const res = await axiosClient.delete(`/delete/admin?adminId=${id}`);

      if (res.data.success) {
        dispatch({
          type: 'DELETE_ADMIN_SUCCESS',
          payload: res.data,
        });
        return res.data;
      } else {
        dispatch({
          type: 'ADMIN_ERROR',
          payload: res.data.message || 'Failed to delete category',
        });
        return res.data;
      }
    } catch (error) {
      dispatch({
        type: 'ADMIN_ERROR',
        payload:
          error.response?.data?.message || 'An unexpected error occurred',
      });
      return error;
    }
  };
};

export const updatePost = (id, formData) => {
  const token = localStorage.getItem('token');
  return async (dispatch) => {
    try {
      const res = await axiosClient.put(
        `/update/post?id=${id}`,
        formData
      );

      if (res.data.success) {
        dispatch({
          type: 'UPDATE_POST_SUCCESS',
          payload: res.data.data, // Assuming the API returns the updated category object
        });
        return res.data;
      } else {
        dispatch({
          type: 'POST_ERROR',
          payload: res.data.message || 'Failed to update CATEGORY',
        });
        return res.data;
      }
    } catch (error) {
      dispatch({
        type: 'POST_ERROR',
        payload:
          error.response?.data?.message || 'An unexpected error occurred',
      });
      return error;
    }
  };
};

export const getAllPostbyComapany = (id, p, l) => {
  const token = localStorage.getItem('token');
  console.log(id);
  return async (dispatch) => {
    dispatch({ type: '_LOADING' });
    try {
      const res = await axiosClient.get(
        `/getcompany/job?id=${id}&search=&status=&page=${p + 1}&limit=${l}`
      );

      // console.log(res); 
      if (res.data.success) {
        dispatch({
          type: 'GET_ALL_POST_BY_COMPANY',
          payload: res.data.data,
          total: res.data.total,
        });
        // console.log(res.data.data);
        return res.data;
      } else {
        dispatch({
          type: 'POST_ERROR',
          payload: res.data.message || 'Failed to fetch data',
        });
        return res.data;
      }
    } catch (error) {
      console.error('Error in API call:', error);
      return error;
    }
  };
};
export const getAllReportedPost = () => {
  const token = localStorage.getItem('token');
  // console.log(id);
  return async (dispatch) => {
    dispatch({ type: '_LOADING' });
    try {
      const res = await axiosClient.get(
        `get/reported/posts`
      );

      // console.log(res); 
      if (res.data.success) {
        dispatch({
          type: 'GET_ALL_REPORTED_POST',
          payload: res.data.data,
          total: res.data.total,
        });
        // console.log(res.data.data);
        return res.data;
      } else {
        dispatch({
          type: 'POST_ERROR',
          payload: res.data.message || 'Failed to fetch data',
        });
        return res.data;
      }
    } catch (error) {
      console.error('Error in API call:', error);
      return error;
    }
  };
};