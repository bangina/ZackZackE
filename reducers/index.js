//redux ssr -Hydrate
import { HYDRATE } from "next-redux-wrapper";
import { combineReducers } from "redux";
import user from "./user";
import post from "./post";

//action creator(data 동적으로 받아서 action 만들어낼 수 있는 생성기!)

// Reducer? "(이전상태, 액션) => 다음 상태" 를 만드는 아이
const rootReducer = combineReducers({
  // HYDRATE용 index 추가!!
  index: (state = {}, action) => {
    switch (action.type) {
      case HYDRATE:
        console.log("HYDRATE", action);
        return { ...state, ...action.payload };
      default:
        return state;
    }
  },
  //원래 combineReducers는 아래 함수들만 가지고 와서 심플함
  user,
  post,
});

export default rootReducer;
