import { axiosClient } from "../../axios/axios";

export const getAllTestimonial = (search = "", page = 0, limit = 10) => {
  return async (dispatch) => {
    dispatch({ type: "TESTIMONIAL_LOADING" });
    try {
      const res = await axiosClient.get(`/get/testimonial?page=${page + 1}&limit=${limit}&search=${search}`);
      if (res.data.success) {
        dispatch({ type: "GET_ALL_TESTIMONIAL", payload: res.data.data });
        return res.data;
      } else {
        dispatch({ type: "TESTIMONIAL_ERROR", payload: res.data.message });
        return res.data;
      }
    }
    catch (error) {
    dispatch({ type: "TESTIMONIAL_ERROR", payload: error.response.data.message });
    return error.response.data;
  }
}
}

export const createTestimonial = (data) => {
  return async (dispatch) => {
    dispatch({ type: "TESTIMONIAL_LOADING" });
    try {
      const res = await axiosClient.post(`/create/testimonial`, data);
      if (res.data.success) {
        dispatch({ type: "CREATE_TESTIMONIAL_SUCCESS", payload: res.data.data });
        return res.data;
      } else {
        dispatch({ type: "TESTIMONIAL_ERROR", payload: res.data.message });
        return res.data;
      }
    }
    catch (error) {
      dispatch({ type: "TESTIMONIAL_ERROR", payload: error.response?.data?.message || error.message });
      return error.response?.data;
    }
  }
};  

export const updateTestimonial = (id, data) => {
  return async (dispatch) => {
    dispatch({ type: "TESTIMONIAL_LOADING" });
    try {
      let payload = data;
      if (data instanceof FormData) {
        if (!data.has("id")) {
          data.append("id", id);
        }
        payload = data;
      } else {
        payload = { ...data, id };
      }

      const res = await axiosClient.put(`/update/testimonial`, payload);
      if (res.data.success) {
        dispatch({ type: "UPDATE_TESTIMONIAL_SUCCESS", payload: res.data.data });
        return res.data;
      } else {
        dispatch({ type: "TESTIMONIAL_ERROR", payload: res.data.message });
        return res.data;
      }
    }
    catch (error) {
      dispatch({ type: "TESTIMONIAL_ERROR", payload: error.response?.data?.message || error.message });
      return error.response?.data;
    }
  };
};

export const deleteTestimonial = (id) => {
  return async (dispatch) => {
    dispatch({ type: "TESTIMONIAL_LOADING" });
    try {
      const res = await axiosClient.delete(`/delete/testimonial?id=${id}`);
      if (res.data.success) {
        dispatch({ type: "DELETE_TESTIMONIAL_SUCCESS", payload: id });
        return res.data;
      } else {
        dispatch({ type: "TESTIMONIAL_ERROR", payload: res.data.message });
        return res.data;
      }
    }
    catch (error) {
      dispatch({ type: "TESTIMONIAL_ERROR", payload: error.response?.data?.message || error.message });
      return error.response?.data;
    }
  }
};