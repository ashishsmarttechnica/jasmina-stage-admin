import { axiosClient } from "./../../axios/axios";

export const loginAdmin = (data) => {
  return async (dispatch) => {
    try {
      const res = await axiosClient.post(
        `/admin/login`,
        {
          email: data.email,
          password: data.password,
        }
      );

      if (res.data.success === true) {
        dispatch({ type: "LOGIN", payload: res.data.data });
        localStorage.setItem("adminId", res.data.data._id);
        localStorage.setItem("token", res.data.data.token);

        return res.data;
      } else {
        return res.data;
      }
      return data.data;
    } catch (error) {
      return error.response.data;
    }
  };
};

export const getAdminDetails = (adminId) => {
  return async (dispatch) => {
    try {
      const res = await axiosClient.get(`/get/Admin?id=${adminId}`);

      if (res.data.success) {
        dispatch({ type: "SINGLE_ADMIN", payload: res.data });
        return res.data;
      }
    } catch (error) {
      return error;
    }
  };
};
export const registerAdmin = (data) => {
  return async (dispatch) => {
    try {
      const res = await axiosClient.post(`/create/Admin`, data);

      if (res.data.success) {
        dispatch({ type: "CREATE_ADMIN", payload: res.data });
        return res.data;
      } else {
        return res.data;
      }
    } catch (error) {}
  };
};

// export const TokenAdmin = () => {
//   return async (dispatch) => {
//     try {
//       const id = localStorage.getItem("adminId");
//       // const encryptId = getEncryptID(id);
//       const token = localStorage.getItem("token");
//       // const asq = localStorage.getItem("asq");
//       const data = await axiosClient.post(
//         // `/refresh-token?id=${id}&token=${token}`,
//         `/refresh-token/Admin?id=${id}`,
//         {
//           token: token,
//         },
//       );
      
//       if (data.data.success) {
       
//         dispatch({ type: "SINGLE_ADMIN", payload: data.data.data });
//         return data.data;
//       } else {
//         return data.data;
//       }
//     } catch (error) {
//       console.log(error);
//       return error;
//     }
//   };
// };
export const TokenAdmin = () => {
  return async (dispatch) => {
    try {
      const id = localStorage.getItem("adminId");
      const token = localStorage.getItem("token");
      console.log(token, "token in change plan action");
      
      const res = await axiosClient.post(`/refresh/token/admin`, {
        token: token,
      });

      if (res.data.success) {
        dispatch({ type: "SINGLE_ADMIN", payload: res.data.data });
        return res.data;
      } else {
        return res.data;
      }
    } catch (error) {
      // console.log(error);
      return error;
    }
  };
};

export const updateAdmin = (data) => {
  return async (dispatch) => {
    try {
      const adminId = localStorage.getItem("adminId");
      const res = await axiosClient.post(`/update/admin?id=${adminId}`, data);

      if (res.data.success) {
        dispatch({ type: "CREATE_ADMIN", payload: res.data });
        return res.data;
      } else {
        return res.data;
      }
    } catch (error) {}
  };
};

export const resetPassword = (email) => {
  return async (dispatch) => {
    try {
      const res = await axiosClient.post(
        "/forgot-password",
        { email },
        
      );

      if (res.data.success) {
        return res.data;
      } else {
        throw new Error(res.data.message || "Failed to reset password");
      }
    } catch (error) {
      return {
        success: false,
        message:
          error.response?.data?.message || "An unexpected error occurred",
      };
    }
  };
};
