/* eslint no-restricted-globals: ["off"] */
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { changeField, initializeForm, signup } from "../../modules/auth";
import AuthForm from "../../components/auth/AuthForm";
import { check } from '../../modules/user';
import { withRouter } from 'react-router-dom';

const SignUpForm = () => {

  const [error, setError] = useState(null);

  const dispatch = useDispatch();
  const { form, auth, authError, user } = useSelector(({ auth, user }) => ({
    form: auth.signup,
    auth: auth.auth,
    authError: auth.authError,
    user: user.user
  }));

  // input event handler
  const onChange = (e) => {
    const { value, name } = e.target;
    dispatch(
      changeField({
        form: "signup",
        key: name,
        value,
      })
    );
  };

  // form submit handler
  const onSubmit = (e) => {
    // onSubmit 이벤트가 발생했을 때, signup함수에 작성한 값들을 파라미터로 넣어서 액션을 디스패치 해주고
    // 사가에서 API 요청을 처리하고, 이에 대한 결과는 auth/authError를 통해 조회가능
    e.preventDefault();
    const { username, useremail, password, passwordConfirm } = form;
    // input 이 하나라도 비어있다면
    if([username, useremail, password, passwordConfirm].includes('')){
      setError('빈 칸을 모두 입력하세요.');
      return;
    }
    // 비밀번호가 일치하지 않는다면
    if(password !== passwordConfirm){
      setError('비밀번호가 일치하지 않습니다.')
      changeField({form: 'signup', key: 'password', value: ''});
      changeField({form: 'signup', key: 'passwordConfirm', value: ''});
      return;
    }
    dispatch(signup({ username, useremail, password }));
  };

  // 첫 렌더링 될 때 form 초기화. 이 작업을 해주지 않았더니 로그인 페이지에서 값을 입력 한 후 다른 페이지로 이동 했다가 다시 돌아오면 값이 유지된 상태로 보임.
  useEffect(() => {
    dispatch(initializeForm("signup"));
  }, [dispatch]);

  // 회원가입 성공/실패 처리
  useEffect(() => {
    if(authError){
      // 계정이 이미 존재할 때
      if(authError.response.status === 409) {
        setError('이미 존재하는 계정명입니다.')
        return;
      }
      setError('회원가입 실패');
      return;
    }
    if(auth){
      console.log('성공',auth);
      dispatch(check());
    }
  }, [auth, authError, dispatch]);

  // user 값이 잘 설정 되었는지 확인
  useEffect(() => {
    if(user){
      console.log('check api 성공', user);
      // 회원가입에 성공하면 루트 로 이동
      history.push('/');
      try {
        localStorage.setItem("user", JSON.stringify(user));
      } catch (e) {
        console.log("localStorage is not working");
      }
    }
  },[user, history]);

  return (
    <AuthForm
      type="signup"
      form={form}
      onChange={onChange}
      onSubmit={onSubmit}
    />
  );
};

export default withRouter(SignUpForm);
