import React from "react";
import { DatePicker } from "antd";
import moment from "moment";
import styled from "styled-components";
import { ReactComponent as CalendarIcon } from "../../../assets/calendar.svg";

const Wrapper = styled.div`
  text-align: center;
  margin: 1rem 0;
  display: flex;

  .ant-calendar-picker div {
    display: flex;
    align-items: center;
    position: relative;
  }

  .ant-calendar-picker-input.ant-input {
    height: 60px;
    min-width: 300px;
    background: ${({ fill }) => (fill ? "#9B9B9B" : "none")};
  }

  svg {
    margin-top: 0;
  }
`;

class DateRange extends React.Component {
  state = {
    lastUse: null,
  };

  disabledDate = date => {
    if (!date) {
      return (
        date.valueOf() > moment().valueOf() ||
        date.valueOf() <
          moment()
            .subtract(3, "years")
            .valueOf()
      );
    }
    return (
      date.valueOf() > moment().valueOf() ||
      date.valueOf() <
        moment()
          .subtract(3, "years")
          .valueOf()
    );
  };

  onChange = date => {
    this.setState({ lastUse: date });
    this.props.handleChange("lastUse", date && date.format("YYYY-MM-DD"));
  };

  render() {
    const { lastUse } = this.state;
    return (
      <Wrapper fill={!!lastUse}>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            fontWeight: "500",
          }}
        >
          <DatePicker.MonthPicker
            disabledDate={this.disabledDate}
            value={lastUse || this.props.review.workPeriod.from}
            placeholder="Choose month"
            onChange={this.onChange}
            allowClear={false}
            suffixIcon={
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
            }
          />
        </div>
      </Wrapper>
    );
  }
}

export default DateRange;
