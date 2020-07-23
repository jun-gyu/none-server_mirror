/* eslint no-restricted-globals: ["off"] */
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { changeField, initializeForm, signin } from '../../modules/auth';
import AuthForm from '../../components/auth/AuthForm';
import { check } from '../../modules/user';

const SignInForm = ({ history }) => {

  const [error, setError] = useState(null);

  const dispatch = useDispatch();
  const { form, auth, authError, user } = useSelector(({ auth, user }) => ({
    form: auth.signin,
    auth: auth.auth,
    authError: auth.authError,
    user: user.user,
  }));

  // input event handler
  const onChange = e => {
    const {value, name} = e.target;
    dispatch(
      changeField({
        form: 'signin',
        key: name,
        value
      })
    )
  };

  // form submit handler
  const onSubmit = e => {
    e.preventDefault();
    const { useremail, password } = form;
    dispatch(signin({useremail, password}));
  };

  // 첫 렌더링 될 때 form 초기화. 이 작업을 해주지 않았더니 로그인 페이지에서 값을 입력 한 후 다른 페이지로 이동 했다가 다시 돌아오면 값이 유지된 상태로 보임.
  useEffect(() => {
    dispatch(initializeForm('signin'));
  }, [dispatch]);

  useEffect(() => {
    if(authError){
      setError('로그인 실패');
      return;
    }
    if(auth){
      console.log('성공');
      dispatch(check());
    }
  }, [auth, authError, dispatch]);

  useEffect(() => {
    if(user){
      history.push('/GoalSet');
      try {
        localStorage.setItem('user', JSON.stringify(user));
      }catch(e){
        console.log('localStorage is not working');
      }
    }
  }, [history, user]);

  return (
    <AuthForm
      type="signin"
      form={form}
      onChange={onChange}
      onSubmit={onSubmit}
      error={error}
    />
  );
};

export default withRouter(SignInForm);