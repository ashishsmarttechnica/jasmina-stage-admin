import { axiosClient } from "../../axios/axios";
const token = localStorage.getItem("token");

export const getAllConnection = (userId, p, l, userType, filterType) => {
  return async (dispatch) => {
    dispatch({ type: "CONNECTION_LOADING" });
    try {
      const res = await axiosClient.get(
        `/get/connection?userId=${userId}&userType=${userType}&filterType=${filterType}&page=${p + 1}&limit=${l}`
      );

      if (res.data.success) {
        dispatch({
          type: "GET_ALL_CONNECTION",
          payload: res.data.data,
        });
        return res.data;
      } else {
        dispatch({
          type: "CONNECTION_ERROR",
          payload: res.data.message || "Failed to fetch spam",
        });
        return res.data;
      }
    } catch (error) {
      console.error(error);
      dispatch({
        type: "CONNECTION_ERROR",
        payload:
          error.response?.data?.message || "An unexpected error occurred",
      });
      return error;
    }
  };
};

export const createConnection = (formData) => {
  return async (dispatch) => {
    // dispatch({ type: "SUBADMIN_LOADING" }); // Start the loader
    try {
      const res = await axiosClient.post("/create/admin", formData);

      if (res.data.success) {
        dispatch({
          type: "CREATE_CONNECTION_SUCCESS",
          payload: res.data.category,
        });
        return res.data;
      } else {
        dispatch({
          type: "CONNECTION_ERROR",
          payload: res.data.message || "Failed to create category",
        });
        return res.data;
      }
    } catch (error) {
      dispatch({
        type: "CONNECTION_ERROR",
        payload:
          error.response?.data?.message || "An unexpected error occurred",
      });
      return error;
    }
  };
};

export const deleteConnection = (id) => {
  return async (dispatch) => {
    try {
      const res = await axiosClient.delete(`/delete/admin?adminId=${id}`);

      if (res.data.success) {
        dispatch({
          type: "DELETE_CONNECTION_SUCCESS",
          payload: res.data,
        });
        return res.data;
      } else {
        dispatch({
          type: "CONNECTION_ERROR",
          payload: res.data.message || "Failed to delete category",
        });
        return res.data;
      }
    } catch (error) {
      dispatch({
        type: "CONNECTION_ERROR",
        payload:
          error.response?.data?.message || "An unexpected error occurred",
      });
      return error;
    }
  };
};

export const updateConnection = (id, formData) => {
  return async (dispatch) => {
    try {
      const res = await axiosClient.put(`/update/admin?id=${id}`, formData);

      if (res.data.success) {
        dispatch({
          type: "UPDATE_CONNECTION_SUCCESS",
          payload: res.data.data, // Assuming the API returns the updated category object
        });
        return res.data;
      } else {
        dispatch({
          type: "CONNECTION_ERROR",
          payload: res.data.message || "Failed to update CATEGORY",
        });
        return res.data;
      }
    } catch (error) {
      dispatch({
        type: "CONNECTION_ERROR",
        payload:
          error.response?.data?.message || "An unexpected error occurred",
      });
      return error;
    }
  };
};

