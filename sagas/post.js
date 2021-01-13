import { all, fork, call, put, takeLatest } from "redux-saga/effects";
import axios from "axios";

//3. addPost에서 실행된 결과값인 action,data가 addPostAPI의 매개변수로 전달된다
function addPostAPI(data) {
  return axios.post("/api/add/post", data);
}

function* addPost(action) {
  try {
    const result = yield call(addPostAPI, action.data);

    yield put({
      type: "ADD_POST_SUCCESS",
      data: result.data,
    });
  } catch (err) {
    yield put({
      type: "ADD_POST_FAILURE",
      data: err.response.data,
    });
  }
}

function* watchAddPost() {
  yield takeLatest("ADD_POST_REQUEST", addPost);
}

export default function* postSaga() {
  yield all([fork(watchAddPost)]);
}
