import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import Button from '../common/Button';

// signup / signin 컴포넌트 렌더링

const AuthFormWrapper = styled.div`
  strong {
    display: block;
    font-size: 2rem;
    color: #ffa2a2;
    margin: 2rem;
  }
`;

const InputStyled = styled.input`
  font-size: 1.2rem;
  border: none;
  border-bottom: 2px solid #ffa2a2;
  padding-bottom: 0.5rem;
  outline: none;
  width: 80%;
  &:focus {
    color: blue;
    border-bottom: 2px solid #4285f4;
  }
  & + & {
    margin-top: 2rem;
  }
`;

const SignActionFooter = styled.div`
  position: absolute;
  bottom: 3%;
  right: 11%;
  width: 80%;
  text-align: right;
  a {
    color: #fff;
  }
`;

const ButtonMarginTop = styled(Button)`
  margin-top: 3rem;
  padding: 0.75rem 0;
  width: 80%;
  font-size: 1.7rem;
`;

const textMap = {
  signin: "Sign In",
  signup: "Sign Up",
};

// 에러 보여주기
const ErrorMessage = styled.div`
  margin: 0 auto;
  color: red;
  text-align: left;
  font-size: 1.1rem;
  margin-top: 1.5rem;
`;


const AuthForm = ({ type, form, onChange, onSubmit, error }) => {
  const text = textMap[type];
  return (
    <AuthFormWrapper>
      <div className="project-title">Check-it-out</div>
      <img className="bookIcon" src="https://img.icons8.com/plasticine/100/000000/book-and-pencil.png"/>
      <strong>{text}</strong>
      <form onSubmit={onSubmit}>
        {text === "Sign Up" && (
          <InputStyled
            autoComplete="username"
            name="username"
            placeholder="이름"
            onChange={onChange}
            value={form.username}
          />
        )}
        <InputStyled
          autoComplete="useremail"
          name="useremail"
          placeholder="아이디"
          onChange={onChange}
          value={form.useremail}
        />
        <InputStyled
          autoComplete="new-password"
          name="password"
          placeholder="비밀번호"
          type="password"
          onChange={onChange}
          value={form.password}
        />
        {text === "Sign Up" && (
          <InputStyled
            autoComplete="new-password"
            name="passwordConfirm"
            placeholder="비밀번호 확인"
            type="password"
            onChange={onChange}
            value={form.passwordConfirm}
          />
        )}
        {error && <ErrorMessage>{error}</ErrorMessage>}
        <ButtonMarginTop cyan fullWidth>{text}</ButtonMarginTop>
      </form>
      <SignActionFooter>
        <Button>
          {text === "Sign In" ? (
            <Link to="/SignUp">Sign Up</Link>
          ) : (
            <Link to="/SignIn">Sign In</Link>
          )}
        </Button>
      </SignActionFooter>
    </AuthFormWrapper>
  );
};

export default AuthForm;