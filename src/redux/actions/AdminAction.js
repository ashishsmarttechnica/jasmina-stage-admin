import { axiosClient } from "../../axios/axios";
const token = localStorage.getItem("token");

export const getAllAdmins = ( p, l) => {
  return async (dispatch) => {
    dispatch({ type: "ADMIN_LOADING" });
    try {
      const res = await axiosClient.get(
        `/get/all/admins?page=${p + 1}&limit=${l}`
      );

      if (res.data.success) {
        dispatch({
          type: "GET_ALL_ADMIN",
          payload: res.data.data,
        });
        return res.data;
      } else {
        dispatch({
          type: "ADMIN_ERROR",
          payload: res.data.message || "Failed to fetch spam",
        });
        return res.data;
      }
    } catch (error) {
      console.error(error);
      dispatch({
        type: "ADMIN_ERROR",
        payload:
          error.response?.data?.message || "An unexpected error occurred",
      });
      return error;
    }
  };
};

export const createAdmin = (formData) => {
  return async (dispatch) => {
    // dispatch({ type: "SUBADMIN_LOADING" }); // Start the loader
    try {
      const res = await axiosClient.post("/create/admin", formData);

      if (res.data.success) {
        dispatch({
          type: "CREATE_ROLE_SUCCESS",
          payload: res.data.category,
        });
        return res.data;
      } else {
        dispatch({
          type: "ADMIN_ERROR",
          payload: res.data.message || "Failed to create category",
        });
        return res.data;
      }
    } catch (error) {
      dispatch({
        type: "ADMIN_ERROR",
        payload:
          error.response?.data?.message || "An unexpected error occurred",
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
          type: "DELETE_ADMIN_SUCCESS",
          payload: res.data,
        });
        return res.data;
      } else {
        dispatch({
          type: "ADMIN_ERROR",
          payload: res.data.message || "Failed to delete category",
        });
        return res.data;
      }
    } catch (error) {
      dispatch({
        type: "ADMIN_ERROR",
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
      const res = await axiosClient.put(`/update/admin?id=${id}`, formData);

      if (res.data.success) {
        dispatch({
          type: "UPDATE_ROLE_SUCCESS",
          payload: res.data.data, // Assuming the API returns the updated category object
        });
        return res.data;
      } else {
        dispatch({
          type: "ADMIN_ERROR",
          payload: res.data.message || "Failed to update CATEGORY",
        });
        return res.data;
      }
    } catch (error) {
      dispatch({
        type: "ADMIN_ERROR",
        payload:
          error.response?.data?.message || "An unexpected error occurred",
      });
      return error;
    }
  };
};

export const createAdminPassword = (formData) => {
  return async (dispatch) => {
    // dispatch({ type: "SUBADMIN_LOADING" }); // Start the loader
    try {
      const res = await axiosClient.post("/change/password/admin", formData);

      if (res.data.success) {
    
        return res.data;
      } else {
       
        return res.data;
      }
    } catch (error) {
    
      return error;
    }
  };
};