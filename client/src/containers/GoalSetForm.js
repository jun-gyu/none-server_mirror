import React from "react";
import styled from "styled-components";
import { DatePicker } from "antd";
import { useSelector } from "react-redux";
import moment from "moment";
const { RangePicker } = DatePicker;

const GoalSetWrapper = styled.div``;

const GoalSetForm = () => {

  const loginUser = useSelector((state) => state.auth.signup.username, []);

  const disabledDate = (current) => {
    return current && current < moment().subtract(1, "days");
  };

  const momentDiff = (selectDay) => {
    let startDate = selectDay[0];
    let endDate = selectDay[1];
    let dataDiffResult = endDate.diff(startDate, "days");
    var momentA = moment();
    console.log(momentA.isAfter(startDate));
    console.log(moment().diff(moment(startDate), "days"));
  };

  return (
     <GoalSetWrapper>
      <strong className="greetings">
        {`안녕하세요 ${loginUser}님`}
        <br />
        책잇아웃에 오신걸 환영합니다!
      </strong>
      <span className="goalSetMessage">목표를 설정해주세요.</span>
      <RangePicker disabledDate={disabledDate} onChange={momentDiff} />
    </GoalSetWrapper>
  );
};

export default GoalSetForm;