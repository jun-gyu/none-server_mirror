import React from 'react';
import AuthTemplate from "../components/auth/AuthTemplate";
import SignInForm from "../containers/auth/SignInForm";

const SignIn = () => {
  return (
    <AuthTemplate>
      <SignInForm/>
    </AuthTemplate>
  );
};

export default SignIn;