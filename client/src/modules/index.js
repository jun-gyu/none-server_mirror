import { combineReducers } from 'redux';
import { all } from 'redux-saga/effects';
import auth, { authSaga } from './auth';
import user, { userSaga } from './user';
import loading from './loading';

const rootReducer = combineReducers({
  auth,
  loading,
  user,
});

export function* rootSaga(){
  // all은 배열안에 있는 여러 사가를 동시에 실행시켜 준다.
  yield all([authSaga(), userSaga()]);
}

export default rootReducer;