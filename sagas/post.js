import { all, fork, call, put, takeLatest, delay } from "redux-saga/effects";
import axios from "axios";
import {
  ADD_COMMENT_FAILURE,
  ADD_COMMENT_REQUEST,
  ADD_COMMENT_SUCCESS,
  ADD_POST_FAILURE,
  ADD_POST_REQUEST,
  ADD_POST_SUCCESS,
  REMOVE_POST_REQUEST,
  REMOVE_POST_SUCCESS,
} from "../reducers/post";
import { ADD_POST_TO_ME, REMOVE_POST_TO_ME } from "../reducers/user";
import shortId from "shortid";

//3. addPost에서 실행된 결과값인 action,data가 addPostAPI의 매개변수로 전달된다
function addPostAPI(data) {
  return axios.post(`/api/post/${data.postId}`, data);
}
function removePostAPI(data) {
  return axios.delete(`/api/post`, data);
}
function addCommentAPI(data) {
  return axios.post(`/api/post/${data.postId}/comment`, data);
}

function* addPost(action) {//action === 입력한 text
  try {
    // const result = yield call(addPostAPI, action.data);
    yield delay(1000);

    // 새로운 게시글의 dummy ID
    const id = shortId.generate();
    //action1
    yield put({
      type: ADD_POST_SUCCESS,
      data: { id, content: action.data },
    });
    //action2
    // 게시글의 dummy ID를 user(me)에게 알려준다
    yield put({
      type: ADD_POST_TO_ME,
      data: id,
    });
  } catch (err) {
    yield put({
      type: ADD_POST_FAILURE,
      data: err.response.data,
    });
  }
}
function* removePost(action) {
  try {
    yield delay(1000);

    yield put({
      type: REMOVE_POST_SUCCESS,
      data: action.data,
    });
    // 게시글의 dummy ID를 user(me)에게 알려준다
    yield put({
      type: REMOVE_POST_TO_ME,
      data: action.data,
    });
  } catch (err) {
    yield put({
      type: REMOVE_POST_FAILURE,
      data: err.response.data,
    });
  }
}

function* addComment(action) {
  try {
    // const result = yield call(addCommentAPI, action.data);
    yield delay(1000);
    yield put({
      type: ADD_COMMENT_SUCCESS,
      data: action.data,
    });
  } catch (err) {
    yield put({
      type: ADD_COMMENT_FAILURE,
      data: err.response.data,
    });
  }
}

function* watchAddPost() {
  yield takeLatest(ADD_POST_REQUEST, addPost);
}

function* watchRemovePost() {
  yield takeLatest(REMOVE_POST_REQUEST, removePost);
}

function* watchAddComment() {
  yield takeLatest(ADD_COMMENT_REQUEST, addComment);
}

export default function* postSaga() {
  yield all([fork(watchAddPost), fork(watchAddComment), fork(watchRemovePost)]);
}
