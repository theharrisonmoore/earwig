import React from "react";
import { DatePicker, Icon } from "antd";
import moment from "moment";
import styled from "styled-components";
import { ReactComponent as CalendarIcon } from "../../../assets/calendar.svg";

const Wrapper = styled.div`
  text-align: center;
  margin: 1rem 0;
  display: flex;
  justify-content: space-around;

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
    startValue: null,
    isOpen: false,
    lastUse: null,
  };

  disabledDate = lastUse => {
    if (!lastUse) {
      return (
        lastUse.valueOf() > moment().valueOf() ||
        lastUse.valueOf() <
          moment()
            .subtract(12, "months")
            .valueOf()
      );
    }
    return (
      lastUse.valueOf() <
      moment()
        .subtract(12, "months")
        .valueOf()
    );
  };

  onChange = (field, value) => {
    this.setState({
      [field]: value,
    });
  };

  onStartChange = value => {
    this.onChange("lastUse", value);
    this.props.handleChange("from", value && value.format("YYYY-MM-DD"));
  };

  handleStartOpenChange = open => {
    this.setState({ isOpen: open });
    if (!open) {
      this.setState({ endOpen: true });
    }
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
            disabledDate={this.disabledStartDate}
            value={lastUse || this.props.review.workPeriod.from}
            placeholder="Choose month"
            onChange={this.onStartChange}
            onOpenChange={this.handleStartOpenChange}
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
