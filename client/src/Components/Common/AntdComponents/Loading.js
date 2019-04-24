import React from "react";
import { Spin } from "antd";
import styled from "styled-components";

const SpinWrapper = styled.div`
  width: 100vw;
  height: 100vh;
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