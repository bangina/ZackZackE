const initialState = {
  user: { isLoggedIn: false, user: null, signUpData: {}, loginData: {} },
  post: {
    mainPosts: [],
  },
};

//action creator(data 동적으로 받아서 action 만들어낼 수 있는 생성기!)
export const loginAction = (data) => {
  return { type: "LOG_IN", data };
};
export const logoutAction = (data) => {
  return { type: "LOG_OUT", data };
};

// Reducer? "(이전상태, 액션) => 다음 상태" 를 만드는 아이
const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case "LOG_IN":
      return {
        ...state,
        user: {
          ...state.user,
          isLoggedIn: true,
          user: action.data,
        },
      };
    case "LOG_OUT":
      return {
        ...state,
        user: {
          ...state.user,
          isLoggedIn: false,
          user: null,
        },
      };
  }
};

export default rootReducer;
