import { axiosClient } from "./../../axios/axios";
// const token = localStorage.getItem("token");

export const getAlluser = (data,isstatus, p, l) => {
  return async (dispatch) => {
    dispatch({ type: "USER_LOADING" });
    try {
      // const roleParam = role ? `role=${role}&` : "";
      // const searchParam = search ? `search=${search}&` : "";
      const res = await axiosClient.get(
        `/get/allUser?search=${data}&status=${isstatus}&page=${p + 1}&limit=${l}`
      );

      if (res.data.success) {
        dispatch({
          type: "GET_ALL_USER",
          payload: res.data.data,
        });
        return res.data;
      } else {
        dispatch({
          type: "USER_ERROR",
          payload: res.data.message || "Failed to fetch users",
        });
        return res.data;
      }
    } catch (error) {
      dispatch({
        type: "USER_ERROR",
        payload: error.response?.data?.message || "An unexpected error occurred",
      });
      return error;
    }
  };
};


export const createuser = (formData) => {
  return async (dispatch) => {
    // dispatch({ type: "SUBCATEGROY_LOADING" }); // Start the loader
    try {
      const res = await axiosClient.post("/user/create", formData);

      if (res.data.success) {
        dispatch({
          type: "CREATE_CATEGROY_SUCCESS",
          payload: res.data.USER, 
        });
        return res.data;
      } else {
        dispatch({
          type: "USER_ERROR",
          payload: res.data.message || "Failed to create USER",
        });
        return res.data;
      }
    } catch (error) {
      dispatch({
        type: "USER_ERROR",
        payload:
          error.response?.data?.message || "An unexpected error occurred",
      });
      return error;
    }
  };
};

export const deleteuser = (userId) => {
  return async (dispatch) => {
    try {
      const res = await axiosClient.delete(`/delete/user?userId=${userId}`);

      if (res.data.success) {
        dispatch({
          type: "DELETE_USER_SUCCESS",
          payload: res.data,
        });
        return res.data;
      } else {
        dispatch({
          type: "USER_ERROR",
          payload: res.data.message || "Failed to delete USER",
        });
        return res.data;
      }
    } catch (error) {
      dispatch({
        type: "USER_ERROR",
        payload:
          error.response?.data?.message || "An unexpected error occurred",
      });
      return error;
    }
  };
};


export const Updateuser = (id, formData) => async (dispatch) => {
  dispatch({ type: "USER_LOADING" });


  try {
    const res = await axiosClient.put(`/update/user?id=${id}`, formData);
    

    if (res.data.success) {
      dispatch({
        type: "UPDATE_USER_SUCCESS",
        payload: res.data.data,
      });
      return res.data;
    } else {
      dispatch({
        type: "USER_ERROR",
        payload: res.data.message || "Failed to update User",
      });
      return res.data;
    }
  } catch (error) {
    console.error("Error during update:", error);
    if (error.response) {
      // console.log("Server Response:", error.response.data);
    }

    dispatch({
      type: "USER_ERROR",
      payload: error.response?.data?.message || "An unexpected error occurred",
    });
    return error;
  }
};

export const getSingleUser = (id) => {
  return async (dispatch) => {
    dispatch({ type: 'USER_SINGLE_LOADING' });
    try {
      const res = await axiosClient.get(`/get/user?id=${id}`);
      
      if (res.data.success) {
        dispatch({
          type: 'GET_SINGLE_USER',
          payload: res.data,
        });
        return res.data;
      } else {
        dispatch({
          type: 'USER_ERROR',
          payload: res.data.message || 'Failed to fetch podcast',
        });
        return res.data;
      }
    } catch (error) {
      dispatch({
        type: 'USER_ERROR',
        payload:
          error.response?.data?.message || 'An unexpected error occurred',
      });
      return error;
    }
  };
};

