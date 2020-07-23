import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import createSagaMiddleware from 'redux-saga';
import rootReducer, { rootSaga } from "./modules";
import { Provider } from "react-redux";
import { tempSetUser, check } from './modules/user';

// 사가 미들웨어 만들기
const sagaMiddleware = createSagaMiddleware();
// applyMiddleware(sagaMiddleware)로 사가 미들웨어 적용
const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(sagaMiddleware))); 

function loadUser(){
  try {
    const user = localStorage.getItem('user');
    // 로그인 상태가 아니라면 return
    if(!user) return;
    store.dispatch(tempSetUser(user));
    store.dispatch(check());
  }catch (e){
    console.log('localStorage is not working');
  }
}

// 루트 사가를 실행해준다. 주의할점!!! 스토어 생성이 된 다음에 실행해주어야 한다.
sagaMiddleware.run(rootSaga);
// loadUser를 sagaMiddleware.run 호출 전에 호출하게 되면 CHECK 액션을 디스패치 했을 때 사가에서 제대로 처리할 수 없다.
loadUser();

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>,
  document.getElementById("root")
);
