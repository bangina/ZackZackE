import { all, fork } from "redux-saga/effects";
import axios from "axios";

function logInAPI() {
  return axios.post("/api/login");
}

//saga장점 : 테스트하기 용이(generator덕에)
//yield를 앞에 전부 붙여놓았는데 그것도 테스트하기 편리하기 위해 쓰는 것
//test.next() 이런식으로 하면 yield까지 딱딱 멈춰서 실행되기 떄무네!

//call한 결과 데이터를 put(dispatch)하는 함수를
//LOG_IN이 실행될 때까지 기다렸다가 take한다 (이벤트 리스너처럼)
//login은 인증데이터 넣어서 보내야한다
function* logIn(action) {
  try {
    //   실제 코드
    const result = yield call(logInAPI, action.data);
    // TEST용 코드(BE 아직 없을 때 - 비동기 흉내내기 : delay)
    // yield delay(1000);

    //call/fork함수 : call(A함수,A함수에 전달할 매개변수1, 매개변수2,....)이렇게 사용(logInAPI(action.data)쎄임)
    // - 매개변수 자리에 로그인 정보 담아서 보낸다.
    //call : "동기" 함수 호출 -> 결과 기다렸다가(blocking) 다음 작업 실행(axios ~then)
    //fork : "비동기" 함수 호출 -> 결과 기다리지 않고 다음 작업 실행 (axios)
    yield put({
      type: "LOG_IN_SUCCESS",
      data: result.data,
    });
  } catch (err) {
    //error handling
    yield put({
      type: "LOG_IN_FAILURE",
      data: err.response.data,
    });
  }
}

function* watchLogin() {
  //take - LOG_IN_REQUEST 액션이 실행될 때까지 기다렸다가
  //logIn 함수를 실행하겠다
  //logIn 함수에는 "LOG_IN_REQUEST"에 대한 action자체가 매개변수로 전달됨!

  yield takeLatest("LOG_IN_REQUEST", logIn);
}
function* watchLogOut() {
  yield takeLatest("LOG_OUT_REQUEST", logOut);
}

export default function* userSaga() {
  yield all([fork(watchLogin), fork(watchLogout)]);
}
