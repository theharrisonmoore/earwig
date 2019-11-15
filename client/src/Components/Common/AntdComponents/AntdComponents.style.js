import styled from "styled-components";
import { colors } from "../../../theme";

export const DateRangeWrapper = styled.div`
  text-align: center;
  display: flex;

  .ant-calendar-picker div {
    display: flex;
    align-items: center;
    position: relative;
    max-width: 300px;
    min-width: 250px;
    border-radius: 4px;
    padding-right: 0.75rem;
    background: ${({ fill }) => (fill ? "#9b9b9b4d" : "none")};
    ${({ focus }) =>
      focus
        ? `box-shadow: 0 0 0 2px rgba(24, 144, 255, 0.2);`
        : "border: 1px solid #d9d9d9;"}
  }

  .ant-calendar-picker-input.ant-input {
    height: 60px;
    color: ${colors.profileFontColor};
    background: transparent;
    font-size: ${({ fill }) => (fill ? "16px" : "initial")};
    font-weight: ${({ fill }) => (fill ? "900" : "initial")};
    border: none;

    &:focus {
      border: none;
      box-shadow: none;
    }
  }

  svg {
    margin-top: 0;
  }
`;
