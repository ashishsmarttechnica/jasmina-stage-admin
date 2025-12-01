const initialState = {
  user: null,
  userOrderCount: null, // Stores user's order count
  isLoggedIn: false, // Tracks login state
  error: null, // Stores error messages
};

export const loginReducer = (state = initialState, action) => {
  switch (action.type) {
    case "LOGIN":
    case "SINGLE_ADMIN":
    case "CHANGE_BRANCH":
      return {
        ...state,
        user: action.payload,
        isLoggedIn: true,
        error: null, // Reset errors on successful login
      };

    case "LOGOUT":
      return {
        ...state,
        user: null,
        isLoggedIn: false,
        userOrderCount: null, // Reset order count on logout
      };

    case "FORGET_PASSWORD":
    case "RESEND_OTP":
    case "NEW_PASSWORD":
    case "CHANGE_PASSWORD":
    case "OTP_VERIFY":
      return {
        ...state,
        user: action.payload, // Assuming API returns updated user info
        error: null, // Reset errors on success
      };

    case "ORDER_COUNTING":
      return {
        ...state,
        userOrderCount: action.payload, // Store order count separately
      };

    case "LOGIN_FAILED":
    case "FORGET_PASSWORD_FAILED":
    case "RESEND_OTP_FAILED":
    case "NEW_PASSWORD_FAILED":
    case "CHANGE_PASSWORD_FAILED":
    case "OTP_VERIFY_FAILED":
      return {
        ...state,
        error: action.payload, // Store error message from API
      };

    default:
      return state;
  }
};
