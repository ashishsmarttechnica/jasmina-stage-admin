import { axiosClient } from "../../axios/axios";
const token = localStorage.getItem("token");

export const getAllRoles = ( p, l) => {
  return async (dispatch) => {
    dispatch({ type: "ROLE_LOADING" });
    try {
      const res = await axiosClient.get(
        `/get/roles?page=${p + 1}&limit=${l}`
      );

      if (res.data.success) {
        dispatch({
          type: "GET_ALL_ROLE",
          payload: res.data.data,
        });
        return res.data;
      } else {
        dispatch({
          type: "ROLE_ERROR",
          payload: res.data.message || "Failed to fetch spam",
        });
        return res.data;
      }
    } catch (error) {
      console.error(error);
      dispatch({
        type: "ROLE_ERROR",
        payload:
          error.response?.data?.message || "An unexpected error occurred",
      });
      return error;
    }
  };
};

export const createRole = (formData) => {
  return async (dispatch) => {
    // dispatch({ type: "SUBROLE_LOADING" }); // Start the loader
    try {
      const res = await axiosClient.post("/create/role", formData);

      if (res.data.success) {
        dispatch({
          type: "CREATE_ROLE_SUCCESS",
          payload: res.data.category,
        });
        return res.data;
      } else {
        dispatch({
          type: "ROLE_ERROR",
          payload: res.data.message || "Failed to create category",
        });
        return res.data;
      }
    } catch (error) {
      dispatch({
        type: "ROLE_ERROR",
        payload:
          error.response?.data?.message || "An unexpected error occurred",
      });
      return error;
    }
  };
};

export const deleterole = (id) => {
  return async (dispatch) => {
    try {
      const res = await axiosClient.delete(`/delete/role?id=${id}`);

      if (res.data.success) {
        dispatch({
          type: "DELETE_ROLE_SUCCESS",
          payload: res.data,
        });
        return res.data;
      } else {
        dispatch({
          type: "ROLE_ERROR",
          payload: res.data.message || "Failed to delete category",
        });
        return res.data;
      }
    } catch (error) {
      dispatch({
        type: "ROLE_ERROR",
        payload:
          error.response?.data?.message || "An unexpected error occurred",
      });
      return error;
    }
  };
};

export const updateRole = (id, formData) => {
  return async (dispatch) => {
    try {
      const res = await axiosClient.put(`/update/role?id=${id}`, formData);

      if (res.data.success) {
        dispatch({
          type: "UPDATE_ROLE_SUCCESS",
          payload: res.data.data, // Assuming the API returns the updated category object
        });
        return res.data;
      } else {
        dispatch({
          type: "ROLE_ERROR",
          payload: res.data.message || "Failed to update CATEGORY",
        });
        return res.data;
      }
    } catch (error) {
      dispatch({
        type: "ROLE_ERROR",
        payload:
          error.response?.data?.message || "An unexpected error occurred",
      });
      return error;
    }
  };
};
