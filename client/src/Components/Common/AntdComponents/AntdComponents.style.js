import React from "react";
import styled from "styled-components";
import { ReactComponent as CalendarIcon } from "../../../assets/calendar.svg";

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
  }

  .ant-calendar-picker-input.ant-input {
    height: 60px;
    background: ${({ fill }) => (fill ? "#9B9B9B" : "none")};
  }

  svg {
    margin-top: 0;
  }
`;

export const styledCalendarIcon = (
  <CalendarIcon
    style={{
      width: "27px",
      height: "100%",

      position: "absolute",
      top: "50%",
      transform: "translate(-50%, -50%)",
    }}
    height="100%"
    width="27px"
  />
);
