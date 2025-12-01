import { axiosClient } from "../../axios/axios";

export const getAllExpiredPlan = (status, p, l) =>{
return async (dispatch) => {
    dispatch({ type: "EXPIREDPLAN_LOADING" });
    try {
      const res = await axiosClient.get(
        `/admin/dashboard?status=${status}&page=${p + 1}&limit=${l}`
      );
      if (res.data.success) {
        dispatch({
          type: "GET_ALL_EXPIREDPLAN",
          payload: res.data,
        });
        return res.data;
      } else {
        dispatch({
          type: "EXPIREDPLAN_ERROR",
          payload: res.data.message || "Failed to fetch spam",
        });
        return res.data;
      }
    } catch (error) {
      dispatch({
        type: "EXPIREDPLAN_ERROR",
        payload:
          error.response?.data?.message || "An unexpected error occurred",
      });
      return error;
    }
  };
};