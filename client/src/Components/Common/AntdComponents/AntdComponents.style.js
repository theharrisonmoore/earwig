import styled from "styled-components";
import { colors } from "../../../theme";

export const DateRangeWrapper = styled.div`
  text-align: center;
  margin: 1rem 0;
  display: flex;

  .ant-calendar-picker div {
    display: flex;
    align-items: center;
    position: relative;
    max-width: 300px;
    min-width: 250px;
    border: 1px solid #d9d9d9;
    border-radius: 4px;
    padding-right: 0.75rem;
  }

  .ant-calendar-picker-input.ant-input {
    height: 60px;
    background: ${({ fill }) => (fill ? "#9b9b9b4d" : "none")};
    color: ${colors.profileFontColor};
    font-size: ${({ fill }) => (fill ? "16px" : "initial")};
    font-weight: ${({ fill }) => (fill ? "900" : "initial")};
    border: none;
  }

  svg {
    margin-top: 0;
  }
`;
