import { axiosClient } from "./../../axios/axios";

export const getAllPages = (data, p, l) => {

  return async (dispatch) => {
    dispatch({ type: "PAGE_LOADING" });
    try {
      const res = await axiosClient.get(
        `/getpages?search=${data}&page=${p + 1}&limit=${l}`
      );
      //
      if (res.data.success) {
        dispatch({
          type: "GET_ALL_PAGE",
          payload: res.data,
        });
        return res.data;
      } else {
        dispatch({
          type: "PAGE_ERROR",
          payload: res.data.message || "Failed to fetch spam",
        });
        return res.data;
      }
    } catch (error) {
      dispatch({
        type: "PAGE_ERROR",
        payload:
          error.response?.data?.message || "An unexpected error occurred",
      });
      return error;
    }
  };
};

export const getSinglePages = (id) => {

  return async (dispatch) => {
    dispatch({ type: "PAGE_SINGLE_LOADING" });
    try {
      const res = await axiosClient.get(`/get/single/information?id=${id}`);
      //
      if (res.data.success) {
        dispatch({
          type: "GET_SINGLE_PAGE",
          payload: res.data,
        });
        return res.data;
      } else {
        dispatch({
          type: "PAGE_ERROR",
          payload: res.data.message || "Failed to fetch spam",
        });
        return res.data;
      }
    } catch (error) {
      dispatch({
        type: "PAGE_ERROR",
        payload:
          error.response?.data?.message || "An unexpected error occurred",
      });
      return error;
    }
  };
};

export const updatePage = (
  id,
  {   page_title,
    path,
    description,
    status,
    language, }
) => {
  return async (dispatch) => {
    // Start loading
    dispatch({ type: "PAGE_LOADING" });

    try {
      // Make PUT request to update the page
      const res = await axiosClient.put(
        `/updatepage/${id}`,
        {
          page_title,
          path,
          description,
          status,
          language,
        }
      );

      // Check response for success
      if (res.data?.success) {
        // Dispatch success action if needed (optional)
        dispatch({
          type: "PAGE_UPDATE_SUCCESS",
          payload: res.data, // Optionally include updated page data
        });

        // Return the response to the caller
        return {
          success: true,
          message: res.data.message || "Page updated successfully",
          data: res.data,
        };
      } else {
        // Dispatch error action for failure
        const errorMessage = res.data?.message || "Failed to update page";
        dispatch({
          type: "PAGE_ERROR",
          payload: errorMessage,
        });

        // Return failure response
        return {
          success: false,
          message: errorMessage,
        };
      }
    } catch (error) {
      // Handle network or server errors
      const errorMessage =
        error.response?.data?.message || "An unexpected error occurred";

      dispatch({
        type: "PAGE_ERROR",
        payload: errorMessage,
      });

      // Return error to the caller
      return {
        success: false,
        message: errorMessage,
      };
    }
  };
};

// Delete page function
export const deletepage = (id) => {

  return async (dispatch) => {
    dispatch({ type: "PAGE_LOADING" });
    try {
      const res = await axiosClient.delete(`deletepage/${id}`);

      if (res.data.success) {
        dispatch({
          type: "DELETE_PAGE_SUCCESS",
          payload: res.data,
        });
        return res.data;
      } else {
        dispatch({
          type: "PAGE_ERROR",
          payload: res.data.message || "Failed to delete blog",
        });
        return res.data;
      }
    } catch (error) {
      dispatch({
        type: "PAGE_ERROR",
        payload:
          error.response?.data?.message || "An unexpected error occurred",
      });
      return error;
    }
  };
};

export const createPage = ({
  page_title,
  path,
  description,
  status,
  language,
}) => {
  return async (dispatch) => {
    dispatch({ type: "PAGE_LOADING" });
    try {
      const res = await axiosClient.post(
        `/createpage`,
        {
          page_title,
          path,
          description,
          status,
          language,
        }
      );
      if (res.data.success) {
        return res.data;
      } else {
        dispatch({
          type: "PAGE_ERROR",
          payload: res.data.message || "Failed to fetch spam",
        });
        return res.data;
      }
    } catch (error) {
      dispatch({
        type: "PAGE_ERROR",
        payload:
          error.response?.data?.message || "An unexpected error occurred",
      });
      return error;
    }
  };
};
