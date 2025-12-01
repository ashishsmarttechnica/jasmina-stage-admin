import { axiosClient } from "./../../axios/axios";

export const getAllTransaction = (data, page, limit) => {

  return async (dispatch) => {
    dispatch({ type: "TRANSACTION_LOADING" });
    try {
      const res = await axiosClient.get(
        `/transaction-list?search=${data}&page=${page + 1}&limit=${limit}`
      );
      //
      if (res.data.success) {
        dispatch({
          type: "GET_ALL_TRANSACTION",
          payload: res.data,
        });
        return res.data;
      } else {
        dispatch({
          type: "TRANSACTION_ERROR",
          payload: res.data.message || "Failed to fetch spam",
        });
        return res.data;
      }
    } catch (error) {
      dispatch({
        type: "TRANSACTION_ERROR",
        payload:
          error.response?.data?.message || "An unexpected error occurred",
      });
      return error;
    }
  };
};
export const getAllCompanyTransaction = (id) => {
  const token = localStorage.getItem("token");

  return async (dispatch) => {
    dispatch({ type: "TRANSACTION_LOADING" });
    try {
      const res = await axiosClient.get(
        `/previous-plan/${id}`,
        {
          headers: {
            token: token,
          },
        }
      );
      //
      if (res.data.success) {
        dispatch({
          type: "GET_ALL_COMPANY_TRANSACTION",
          payload: res.data,
        });
        return res.data;
      } else {
        dispatch({
          type: "TRANSACTION_ERROR",
          payload: res.data.message || "Failed to fetch spam",
        });
        return res.data;
      }
    } catch (error) {
      dispatch({
        type: "TRANSACTION_ERROR",
        payload:
          error.response?.data?.message || "An unexpected error occurred",
      });
      return error;
    }
  };
};

export const createTransaction = (formData) => {
  return async (dispatch) => {
    // dispatch({ type: "SUBCATEGROY_LOADING" }); // Start the loader
    try {
      const res = await axiosClient.post("/transaction/create", formData);

      if (res.data.success) {
        dispatch({
          type: "CREATE_TRANSACTION_SUCCESS",
          payload: res.data.TRANSACTION,
        });
        return res.data;
      } else {
        dispatch({
          type: "TRANSACTION_ERROR",
          payload: res.data.message || "Failed to create TRANSACTION",
        });
        return res.data;
      }
    } catch (error) {
      dispatch({
        type: "TRANSACTION_ERROR",
        payload:
          error.response?.data?.message || "An unexpected error occurred",
      });
      return error;
    }
  };
};

export const deleteTransaction = (transactionId) => {
  return async (dispatch) => {
    try {
      const res = await axiosClient.delete(`/delete/transaction?transactionId=${transactionId}`);

      if (res.data.success) {
        dispatch({
          type: "DELETE_TRANSACTION_SUCCESS",
          payload: res.data,
        });
        return res.data;
      } else {
        dispatch({
          type: "TRANSACTION_ERROR",
          payload: res.data.message || "Failed to delete TRANSACTION",
        });
        return res.data;
      }
    } catch (error) {
      dispatch({
        type: "TRANSACTION_ERROR",
        payload:
          error.response?.data?.message || "An unexpected error occurred",
      });
      return error;
    }
  };
};


export const UpdateTransaction = (id, formData) => async (dispatch) => {
  dispatch({ type: "TRANSACTION_LOADING" });


  try {
    const res = await axiosClient.put(`/update/transaction?id=${id}`, formData);


    if (res.data.success) {
      dispatch({
        type: "UPDATE_TRANSACTION_SUCCESS",
        payload: res.data.data,
      });
      return res.data;
    } else {
      dispatch({
        type: "TRANSACTION_ERROR",
        payload: res.data.message || "Failed to update Transaction",
      });
      return res.data;
    }
  } catch (error) {
    console.error("Error during update:", error);
    if (error.response) {
      // console.log("Server Response:", error.response.data);
    }

    dispatch({
      type: "TRANSACTION_ERROR",
      payload: error.response?.data?.message || "An unexpected error occurred",
    });
    return error;
  }
};