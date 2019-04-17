import styled from "styled-components";
import { Button } from "antd";

export const SideMenuWrapper = styled.div`
  background-color: #001529;
  position: fixed;
  left: 0;
  top: 0;
  bottom: 0;
`;

export const StyledButton = styled(Button)`
  margin-bottom: 16px;
  position: absolute;
  right: -27%;
  top: 50%;
  transform: translate(-50%, -50%);
`;
