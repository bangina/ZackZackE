import produce from "immer";

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
  return produce(state, (draft) => {
    switch (action.type) {
      case LOG_IN_REQUEST:
        draft.isLoggingIn = true;
        draft.isLoggedIn = false;
        draft.loginError = null; //로딩중일 때 에러를 초기화해준다
        break;

      case LOG_IN_SUCCESS:
        draft.isLoggedIn = true;
        draft.isLoggingIn = false;
        draft.me = dummyUser(action.data);
        break;

      case LOG_IN_FAILURE:
        draft.isLoggedIn = false;
        draft.isLoggingIn = false;

      case LOG_OUT_REQUEST:
        draft.isLoggedOut = false;
        draft.isLoggingOut = true; //requesting...
        draft.logoutError = null;
        draft.me = null;
        break;

      case LOG_OUT_SUCCESS:
        draft.isLoggedOut = false;
        draft.isLoggingOut = false;
        draft.me = null;
        break;

      case LOG_OUT_FAILURE:
        draft.isLoggingOut = false;
        draft.logoutError = action.error;
        break;

      case SIGNUP_REQUEST:
        draft.isSignedUp = false;
        draft.isSigningUp = true; //requesting...
        draft.signupError = null;
        break;
      case SIGNUP_SUCCESS:
        draft.isSignedUp = false;
        draft.isSigningUp = false;
        break;

      case SIGNUP_FAILURE:
        draft.isSigningUp = false;
        draft.signupError = action.error;
        break;

      case ADD_POST_TO_ME:
        draft.me.Posts.unshift({ id: action.data });
        break;

      case REMOVE_POST_TO_ME:
        // return {
        //   ...state,
        //   me: {
        //     //지우는건 필터링으로!
        //     ...state.me,
        //     Posts: state.me.Posts.filter((v) => v.id !== action.data),
        //   },
        // };
        draft.me.Posts = draft.me.Posts.filter((v) => v.id !== action.data);
        break;

      default:
        break;
    }
  });
};
export default reducer;
