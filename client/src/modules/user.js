import { createAction, handleActions } from "redux-actions";
import { takeLatest } from "redux-saga/effects";
import * as authAPI from "../lib/api/auth";
import createRequestSaga, { createRequestActionTypes } from "../lib/createRequestSaga";

// 새로고침 이후 임시 로그인 처리
const TEMP_SET_USER = 'user/TEMP_SET_USER';

// 회원 정보 확인
const [CHECK, CHECK_SUCCESS, CHECK_FAILURE] = createRequestActionTypes('user/CHECK');

export const tempSetUser = createAction(TEMP_SET_USER, user => user);
export const check = createAction(CHECK);

const checkSaga = createRequestSaga(CHECK, authAPI,check);

// 로그인 정보가 만료되었을 때를 대비하여 사용자 정보 초기화. CHECK_FAILURE 액션이 발생할 때 이 함수가 호출된다.
function checkFailureSaga(){
  try {
    // localStorage에서 user 제거
    localStorage.removeItem('user');
  }catch (e) {
    console.log('localStorage is not working');
  }
}

export function* userSaga(){
  yield takeLatest(CHECK, checkSaga);
  yield takeLatest(CHECK_FAILURE, checkFailureSaga);
}

const initialState = {
  user: 'null',
  checkError: null,
};

export default handleActions(
  {
    [TEMP_SET_USER]: (state, { payload: user}) => ({
      ...state,
      user,
    }),
    [CHECK_SUCCESS]: (state, { payload: user }) => ({
      ...state,
      user,
      checkError: null,
    }),
    [CHECK_FAILURE]: (state, { payload: error }) => ({
      ...state,
      user: null,
      checkError: error,
    }),
  },
  initialState
);
