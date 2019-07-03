import React from "react";
import { Spin, Icon } from "antd";
import styled from "styled-components";

const SpinWrapper = styled.div`
  width: 100%;
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Loading = props => {
  return (
    <SpinWrapper>
      <Spin size="large" />
    </SpinWrapper>
  );
};

export default Loading;

const ButtonSpinner = ({ color }) => {
  // antd spinner for the submit button
  const antIcon = (
    <Icon
      type="loading"
      style={{ fontSize: 24, color: color || "white" }}
      spin
    />
  );
  return <Spin indicator={antIcon} style={{ marginRight: ".5rem" }} />;
};

export { ButtonSpinner };
