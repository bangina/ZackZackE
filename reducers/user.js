export const initialState = {
  isLoggedIn: false,
  me: null,
  signUpData: {},
  loginData: {},
};
export const loginAction = (data) => {
  return { type: "LOG_IN", data };
};
export const logoutAction = (data) => {
  return { type: "LOG_OUT", data };
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "HYDRATE":
      console.log(action.payload);
      return { ...state, ...action.payload };
    case "LOG_IN_REQUEST":
      return {
        ...state,
        isLoggedIn: true,
        me: action.data,
      };
    case "LOG_IN_SUCCESS":
      return {
        ...state,
        isLoggedIn: true,
        me: action.data,
      };
    case "LOG_IN_FAILURE":
      return {
        ...state,
        isLoggedIn: true,
        me: action.data,
      };
    case "LOG_OUT_REQUEST":
      return {
        ...state,
        isLoggedIn: false,
        me: null,
      };
    case "LOG_OUT_SUCCESS":
      return {
        ...state,
        isLoggedIn: false,
        me: null,
      };
    case "LOG_OUT_FAILURE":
      return {
        ...state,
        isLoggedIn: false,
        me: null,
      };

    default:
      return state;
  }
};
export default reducer;
