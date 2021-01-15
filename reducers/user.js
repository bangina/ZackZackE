export const initialState = {
  isLoggedIn: false,
  isLoggingIn: false, //request 보낸 상태(LOADING...)
  loginError: null,
  isLoggedOut: false, //request 보낸 상태(LOADING...)
  isLoggingOut: false, //request 보낸 상태(LOADING...)
  logoutError: null,
  isSignedUp: false, //request 보낸 상태(LOADING...)
  isSigningUp: false, //request 보낸 상태(LOADING...)
  signupError: null,
  me: null,
  signUpData: {},
  loginData: {},
};

export const LOG_IN_REQUEST = "LOG_IN_REQUEST";
export const LOG_IN_SUCCESS = "LOG_IN_SUCCESS";
export const LOG_IN_FAILURE = "LOG_IN_FAILURE";

export const LOG_OUT_REQUEST = "LOG_OUT_REQUEST";
export const LOG_OUT_SUCCESS = "LOG_OUT_SUCCESS";
export const LOG_OUT_FAILURE = "LOG_OUT_FAILURE";

export const SIGNUP_REQUEST = "SIGNUP_REQUEST";
export const SIGNUP_SUCCESS = "SIGNUP_SUCCESS";
export const SIGNUP_FAILURE = "SIGNUP_FAILURE";

export const FOLLOW_REQUEST = "FOLLOW_REQUEST";
export const FOLLOW_SUCCESS = "FOLLOW_SUCCESS";
export const FOLLOW_FAILURE = "FOLLOW_FAILURE";

export const UNFOLLOW_REQUEST = "UNFOLLOW_REQUEST";
export const UNFOLLOW_SUCCESS = "UNFOLLOW_SUCCESS";
export const UNFOLLOW_FAILURE = "UNFOLLOW_FAILURE";

//게시글 생성시 user(me)에게도 추가
export const ADD_POST_TO_ME = "ADD_POST_TO_ME";
export const REMOVE_POST_TO_ME = "REMOVE_POST_TO_ME";

const dummyUser = (data) => ({
  // ...data,
  nickname: "인아",
  id: 1,
  Posts: [{ id: 1 }],
  Followings: [
    { nickname: "chocho" },
    { nickname: "chocho2" },
    { nickname: "chocho3" },
  ],
  Followers: [],
});
export const loginRequestAction = (data) => {
  return { type: LOG_IN_REQUEST, data };
};
export const logoutRequestAction = (data) => {
  return { type: LOG_OUT_REQUEST, data };
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case LOG_IN_REQUEST:
      return {
        ...state,
        isLoggingIn: true,
        isLoggedIn: false,
        loginError: null, //로딩중일 때 에러를 초기화해준다
      };
    case LOG_IN_SUCCESS:
      return {
        ...state,
        isLoggedIn: true,
        isLoggingIn: false,
        me: dummyUser(action.data),
      };
    case LOG_IN_FAILURE:
      return {
        ...state,
        isLoggedIn: false,
        isLoggingIn: false,
      };
    case LOG_OUT_REQUEST:
      return {
        ...state,
        isLoggedOut: false,
        isLoggingOut: true, //requesting...
        logoutError: null,
        me: null,
      };
    case LOG_OUT_SUCCESS:
      return {
        ...state,
        isLoggedOut: false,
        isLoggingOut: false,
        me: null,
      };
    case LOG_OUT_FAILURE:
      return {
        ...state,
        isLoggingOut: false,
        logoutError: action.error,
      };
    case SIGNUP_REQUEST:
      return {
        ...state,
        isSignedUp: false,
        isSigningUp: true, //requesting...
        signupError: null,
      };
    case SIGNUP_SUCCESS:
      return {
        ...state,
        isSignedUp: false,
        isSigningUp: false,
        // signUpData: action.data,
      };
    case SIGNUP_FAILURE:
      return {
        ...state,
        isSigningUp: false,
        signupError: action.error,
      };
    case ADD_POST_TO_ME:
      return {
        ...state,
        me: {
          // 불변성 지키기 어렵군요
          ...state.me,
          Posts: [{ id: action.data }, ...state.me.Posts],
        },
      };
    case REMOVE_POST_TO_ME:
      return {
        ...state,
        me: {
          //지우는건 필터링으로!
          ...state.me,
          Posts: state.me.Posts.filter((v) => v.id !== action.data),
        },
      };

    default:
      return state;
  }
};
export default reducer;
