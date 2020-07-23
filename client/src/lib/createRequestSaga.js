import { call, put } from 'redux-saga/effects';
import { startLoading, finishLoading } from '../modules/loading';

// 각 요청마다 액션 타입을 세개씩 선언해야 하는 것은 반복 작업니므로 액션 타입을 한꺼번에 만드는 함수를 선언
export const createRequestActionTypes = type => {
  const SUCCESS = `${type}_SUCCESS`;
  const FAILURE = `${type}_FAILURE`;
  return [type, SUCCESS, FAILURE];
}


export default function createRequestSaga (type, request) {
  const SUCCESS = `${type}_SUCCESS`;
  const FAILURE = `${type}_FAILURE`;

  return function* (action){
    // 로딩 시작 (put : 액션을 dispatch)
    yield put(startLoading(type));
    try {
      // call : 함수를 동기적으로 실행시킨다. 여기에 넘겨진 함수가 promise를 리턴하면 그 promise가 resolved 될 때까지 call 호출한 부분에서 실행이 멈춤
      const response = yield call(request, action.payload);
      yield put({
        type: SUCCESS,
        payload: response.data,
      });
    }catch (e) {
      yield put({
        type: FAILURE,
        payload: e,
        error: true,
      });
    }
    // 로딩 끝
    yield put(finishLoading(type));
  }
}