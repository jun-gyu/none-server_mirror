// 서버에서 지금 로그인 되어있는 유저의 이메일과 같은 것 불러와서 유저 네임 렌더링
// 해당 유저의 목표설정 컬럼에 값 넣어주기

// 현재 날짜로부터 선택한 시작 날짜가 미래인지 아닌지 체크한다.
// 미래가 아니라면 (미래로 설정했을 경우 현재 날짜가 미래 날짜가 되었다) true가 되고
// 선택 날짜로부터 몇일 지났는지 계산하여 보여줌
import React from "react";
import styled from "styled-components";
import AuthTemplate from "../components/auth/AuthTemplate";
import GoalSetForm from '../containers/GoalSetForm';

const GoalSet = () => {

  return (
    <AuthTemplate>
      <GoalSetForm />
    </AuthTemplate>
  );
};

export default GoalSet;
