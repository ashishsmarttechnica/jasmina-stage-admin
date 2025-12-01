import { axiosClient } from "../../axios/axios";
const token = localStorage.getItem("token");
console.log(token, "token in change plan action");

export const getAllChangePlan = (isstatus,p, l, data) => {
  // console.log(data, "search data")
  return async (dispatch) => {
    dispatch({ type: "CHANGE_PLAN_LOADING" });
    try {
      const res = await axiosClient.get(
        `/getAll/planRequest?search=${data}&status=${isstatus}&page=${p + 1}&limit=${l}`
      );

      if (res.data.success) {
        dispatch({
          type: "GET_ALL_CHANGE_PLAN",
          payload: res.data,
        });
        return res.data;
      } else {
        dispatch({
          type: "CHANGE_PLAN_ERROR",
          payload: res.data.message || "Failed to fetch spam",
        });
        return res.data;
      }
    } catch (error) {
      console.error(error);
      dispatch({
        type: "CHANGE_PLAN_ERROR",
        payload:
          error.response?.data?.message || "An unexpected error occurred",
      });
      return error;
    }
  };
};

export const createChangePlan = (formData) => {
  return async (dispatch) => {
    // dispatch({ type: "SUBADMIN_LOADING" }); // Start the loader
    try {
      const res = await axiosClient.post("/create/changeplan", formData);

      if (res.data.success) {
        dispatch({
          type: "CREATE_CHANGE_PLAN_SUCCESS",
          payload: res.data.category,
        });
        return res.data;
      } else {
        dispatch({
          type: "CHANGE_PLAN_ERROR",
          payload: res.data.message || "Failed to create category",
        });
        return res.data;
      }
    } catch (error) {
      dispatch({
        type: "CHANGE_PLAN_ERROR",
        payload:
          error.response?.data?.message || "An unexpected error occurred",
      });
      return error;
    }
  };
};

export const deleteChangePlan = (id) => {
  return async (dispatch) => {
    try {
      const res = await axiosClient.delete(`/delete/changeplan?id=${id}`);

      if (res.data.success) {
        dispatch({
          type: "DELETE_CHANGE_PLAN_SUCCESS",
          payload: res.data,
        });
        return res.data;
      } else {
        dispatch({
          type: "CHANGE_PLAN_ERROR",
          payload: res.data.message || "Failed to delete category",
        });
        return res.data;
      }
    } catch (error) {
      dispatch({
        type: "CHANGE_PLAN_ERROR",
        payload:
          error.response?.data?.message || "An unexpected error occurred",
      });
      return error;
    }
  };
};

export const updateChangePlan = (id, formData) => {
  return async (dispatch) => {
    try {
      const res = await axiosClient.put(`/update/changeplan?id=${id}`, formData);

      if (res.data.success) {
        dispatch({
          type: "UPDATE_CHANGE_PLAN_SUCCESS",
          payload: res.data.data, // Assuming the API returns the updated category object
        });
        return res.data;
      } else {
        dispatch({
          type: "CHANGE_PLAN_ERROR",
          payload: res.data.message || "Failed to update CATEGORY",
        });
        return res.data;
      }
    } catch (error) {
      dispatch({
        type: "CHANGE_PLAN_ERROR",
        payload:
          error.response?.data?.message || "An unexpected error occurred",
      });
      return error;
    }
  };
};

export const approveRejectPlanRequest = ({ companyId, requestId, status, adminReason }) => {
  return async (dispatch) => {
    try {
      const res = await axiosClient.put(
        `/approveReject/planRequest?companyId=${companyId}&requestId=${requestId}`,
        { status, adminReason }
      );
      if (res.data.success) {
        dispatch({
          type: "UPDATE_CHANGE_PLAN_SUCCESS",
          payload: res.data.data,
        });
        return res.data;
      } else {
        dispatch({
          type: "CHANGE_PLAN_ERROR",
          payload: res.data.message || "Failed to approve/reject plan request",
        });
        return res.data;
      }
    } catch (error) {
      dispatch({
        type: "CHANGE_PLAN_ERROR",
        payload:
          error.response?.data?.message || "An unexpected error occurred",
      });
      return error;
    }
  };
};