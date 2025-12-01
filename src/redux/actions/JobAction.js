import { axiosClient } from "./../../axios/axios";
const token = localStorage.getItem("token");

export const getAllJob = (id, p, l) => {
  return async (dispatch) => {
    dispatch({ type: "JOB_LOADING" });
    try {
      // const roleParam = role ? `role=${role}&` : "";
      // const searchParam = search ? `search=${search}&` : "";
      const res = await axiosClient.get(
        `/get/applied/job?id=${id}&page=${p + 1}&limit=${l}`
      );

      if (res.data.success) {
        dispatch({
          type: "GET_ALL_JOB",
          payload: res.data,
        });
        return res.data;
      } else {
        dispatch({
          type: "JOB_ERROR",
          payload: res.data.message || "Failed to fetch users",
        });
        return res.data;
      }
    } catch (error) {
      dispatch({
        type: "JOB_ERROR",
        payload: error.response?.data?.message || "An unexpected error occurred",
      });
      return error;
    }
  };
};
export const getAllJobs = (search = "", page = 0, limit = 10) => {
  return async (dispatch) => {
    dispatch({ type: "JOB_LOADING" });
    try {
      const res = await axiosClient.get(
        `/get/all/jobs?search=${search}&page=${page + 1}&limit=${limit}`
      );

      if (res.data.success) {
        dispatch({
          type: "GET_ALL_JOB",
          payload: res.data,
        });
        return res.data;
      } else {
        dispatch({
          type: "JOB_ERROR",
          payload: res.data.message || "Failed to fetch jobs",
        });
        return res.data;
      }
    } catch (error) {
      dispatch({
        type: "JOB_ERROR",
        payload: error.response?.data?.message || "An unexpected error occurred",
      });
      return error;
    }
  };
};

export const createJob = (formData) => {
  return async (dispatch) => {
    // dispatch({ type: "SUBCATEGROY_LOADING" }); // Start the loader
    try {
      const res = await axiosClient.post("/job/create", formData);

      if (res.data.success) {
        dispatch({
          type: "CREATE_JOB_SUCCESS",
          payload: res.data.JOB, 
        });
        return res.data;
      } else {
        dispatch({
          type: "JOB_ERROR",
          payload: res.data.message || "Failed to create JOB",
        });
        return res.data;
      }
    } catch (error) {
      dispatch({
        type: "JOB_ERROR",
        payload:
          error.response?.data?.message || "An unexpected error occurred",
      });
      return error;
    }
  };
};

export const deleteJob = (jobId) => {
  return async (dispatch) => {
    try {
      const res = await axiosClient.delete(`/delete/job?jobId=${jobId}`);

      if (res.data.success) {
        dispatch({
          type: "DELETE_JOB_SUCCESS",
          payload: res.data,
        });
        return res.data;
      } else {
        dispatch({
          type: "JOB_ERROR",
          payload: res.data.message || "Failed to delete JOB",
        });
        return res.data;
      }
    } catch (error) {
      dispatch({
        type: "JOB_ERROR",
        payload:
          error.response?.data?.message || "An unexpected error occurred",
      });
      return error;
    }
  };
};


export const UpdateJob = (id, formData) => async (dispatch) => {
  dispatch({ type: "JOB_LOADING" });


  try {
    const res = await axiosClient.put(`/update/job?id=${id}`, formData);
    

    if (res.data.success) {
      dispatch({
        type: "UPDATE_JOB_SUCCESS",
        payload: res.data.data,
      });
      return res.data;
    } else {
      dispatch({
        type: "JOB_ERROR",
        payload: res.data.message || "Failed to update Job",
      });
      return res.data;
    }
  } catch (error) {
    console.error("Error during update:", error);
    if (error.response) {
      // console.log("Server Response:", error.response.data);
    }

    dispatch({
      type: "JOB_ERROR",
      payload: error.response?.data?.message || "An unexpected error occurred",
    });
    return error;
  }
};

export const getSingleJob = (id) => {
  return async (dispatch) => {
    dispatch({ type: 'JOB_SINGLE_LOADING' });
    try {
      const res = await axiosClient.get(`get/single/job?id=${id}`);
      
      if (res.data.success) {
        dispatch({
          type: 'GET_SINGLE_JOB',
          payload: res.data,
        });
        return res.data;
      } else {
        dispatch({
          type: 'JOB_ERROR',
          payload: res.data.message || 'Failed to fetch podcast',
        });
        return res.data;
      }
    } catch (error) {
      dispatch({
        type: 'JOB_ERROR',
        payload:
          error.response?.data?.message || 'An unexpected error occurred',
      });
      return error;
    }
  };
};