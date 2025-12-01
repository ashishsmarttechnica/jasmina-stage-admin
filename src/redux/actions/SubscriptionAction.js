import { axiosClient } from "../../axios/axios";
const token = localStorage.getItem("token");

export const getAllSubscription = (p, l) => {
  return async (dispatch) => {
    dispatch({ type: "SUBSCRIPTION_LOADING" });
    try {
      const res = await axiosClient.get(
        `/get/all/membership?page=${p + 1}&limit=${l}`
      );

      if (res.data.success) {
        dispatch({
          type: "GET_ALL_SUBSCRIPTION",
          payload: res.data.data,
        });
        return res.data;
      } else {
        dispatch({
          type: "SUBSCRIPTION_ERROR",
          payload: res.data.message || "Failed to fetch spam",
        });
        return res.data;
      }
    } catch (error) {
      console.error(error);
      dispatch({
        type: "SUBSCRIPTION_ERROR",
        payload:
          error.response?.data?.message || "An unexpected error occurred",
      });
      return error;
    }
  };
};

export const createSubscription = (formData) => {
  return async (dispatch) => {
    // dispatch({ type: "SUBADMIN_LOADING" }); // Start the loader
    try {
      const res = await axiosClient.post("/create/membership", formData);

      if (res.data.success) {
        dispatch({
          type: "CREATE_SUBSCRIPTION_SUCCESS",
          payload: res.data.category,
        });
        return res.data;
      } else {
        dispatch({
          type: "SUBSCRIPTION_ERROR",
          payload: res.data.message || "Failed to create category",
        });
        return res.data;
      }
    } catch (error) {
      dispatch({
        type: "SUBSCRIPTION_ERROR",
        payload:
          error.response?.data?.message || "An unexpected error occurred",
      });
      return error;
    }
  };
};

export const deleteSubscription = (id) => {
  return async (dispatch) => {
    try {
      const res = await axiosClient.delete(`/delete/membership?id=${id}`);

      if (res.data.success) {
        dispatch({
          type: "DELETE_SUBSCRIPTION_SUCCESS",
          payload: res.data,
        });
        return res.data;
      } else {
        dispatch({
          type: "SUBSCRIPTION_ERROR",
          payload: res.data.message || "Failed to delete category",
        });
        return res.data;
      }
    } catch (error) {
      dispatch({
        type: "SUBSCRIPTION_ERROR",
        payload:
          error.response?.data?.message || "An unexpected error occurred",
      });
      return error;
    }
  };
};

export const updateSubscription = (id, formData) => {
  return async (dispatch) => {
    try {
      const res = await axiosClient.put(`/update/membership?id=${id}`, formData);

      if (res.data.success) {
        dispatch({
          type: "UPDATE_SUBSCRIPTION_SUCCESS",
          payload: res.data.data, // Assuming the API returns the updated category object
        });
        return res.data;
      } else {
        dispatch({
          type: "SUBSCRIPTION_ERROR",
          payload: res.data.message || "Failed to update CATEGORY",
        });
        return res.data;
      }
    } catch (error) {
      dispatch({
        type: "SUBSCRIPTION_ERROR",
        payload:
          error.response?.data?.message || "An unexpected error occurred",
      });
      return error;
    }
  };
};