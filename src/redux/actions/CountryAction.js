import { axiosClient } from "../../axios/axios";
const token = localStorage.getItem("token");

export const getAllCountry = (data, p, l) => {
  return async (dispatch) => {
    dispatch({ type: "COUNTRY_LOADING" });
    try {
      const res = await axiosClient.get(
        `/get/countries?search=${data}&page=${p + 1}&limit=${l}`
      );

      if (res.data.success) {
        dispatch({
          type: "GET_ALL_COUNTRY",
          payload: res.data.data,
        });
        return res.data;
      } else {
        dispatch({
          type: "COUNTRY_ERROR",
          payload: res.data.message || "Failed to fetch spam",
        });
        return res.data;
      }
    } catch (error) {
      console.error(error);
      dispatch({
        type: "COUNTRY_ERROR",
        payload:
          error.response?.data?.message || "An unexpected error occurred",
      });
      return error;
    }
  };
};

export const createCountry = (formData) => {
  return async (dispatch) => {
    // dispatch({ type: "SUBADMIN_LOADING" }); // Start the loader
    try {
      const res = await axiosClient.post("/create/country", formData);

      if (res.data.success) {
        dispatch({
          type: "CREATE_COUNTRY_SUCCESS",
          payload: res.data.country,
        });
        return res.data;
      } else {
        dispatch({
          type: "COUNTRY_ERROR",
          payload: res.data.message || "Failed to create country",
        });
        return res.data;
      }
    } catch (error) {
      dispatch({
        type: "COUNTRY_ERROR",
        payload:
          error.response?.data?.message || "An unexpected error occurred",
      });
      return error;
    }
  };
};

export const deleteCountry = (id) => {
  return async (dispatch) => {
    try {
      const res = await axiosClient.delete(`/delete/country?id=${id}`);

      if (res.data.success) {
        dispatch({
          type: "DELETE_COUNTRY_SUCCESS",
          payload: res.data,
        });
        return res.data;
      } else {
        dispatch({
          type: "COUNTRY_ERROR",
          payload: res.data.message || "Failed to delete country",
        });
        return res.data;
      }
    } catch (error) {
      dispatch({
        type: "COUNTRY_ERROR",
        payload:
          error.response?.data?.message || "An unexpected error occurred",
      });
      return error;
    }
  };
};

export const updateCountry = (id, formData) => {
  return async (dispatch) => {
    try {
      const res = await axiosClient.put(`/update/country?id=${id}`, formData);

      if (res.data.success) {
        dispatch({
          type: "UPDATE_COUNTRY_SUCCESS",
          payload: res.data.data, // Assuming the API returns the updated category object
        });
        return res.data;
      } else {
        dispatch({
          type: "COUNTRY_ERROR",
          payload: res.data.message || "Failed to update country",
        });
        return res.data;
      }
    } catch (error) {
      dispatch({
        type: "COUNTRY_ERROR",
        payload:
          error.response?.data?.message || "An unexpected error occurred",
      });
      return error;
    }
  };
};