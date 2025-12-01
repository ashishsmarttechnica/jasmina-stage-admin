import { axiosClient } from "../../axios/axios";

export const getAllTodaysNewCompany = (status, p, l) => {

  return async (dispatch) => {
    dispatch({ type: "TODAYS_NEW_COMPANY_LOADING" });
    try {
      const res = await axiosClient.get(
        `/admin/dashboard?status=${status}&page=${p + 1}&limit=${l}`
      );
      if (res.data.success) {
        dispatch({
          type: "GET_ALL_TODAYS_NEW_COMPANY",
          payload: res.data,
        });
        return res.data;
      } else {
        dispatch({
          type: "TODAYS_NEW_COMPANY_ERROR",
          payload: res.data.message || "Failed to fetch data",
        });
        return res.data;
      }
    } catch (error) {
      dispatch({
        type: "TODAYS_NEW_COMPANY_ERROR",
        payload: error.response?.data?.message || "An unexpected error occurred",
      });
      return error;
    }
  };
};


