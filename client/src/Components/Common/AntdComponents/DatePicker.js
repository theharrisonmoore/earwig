import React from "react";
import { DatePicker } from "antd";
import moment from "moment";

import Icon from "../Icon/Icon";

import { DateRangeWrapper } from "./AntdComponents.style";

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
    this.props.handleChange(date && date.startOf("month").format("YYYY-MM-DD"));
  };

  render() {
    const { lastUse } = this.state;
    return (
      <DateRangeWrapper fill={lastUse || this.props.review.lastUse}>
        <DatePicker.MonthPicker
          disabledDate={this.disabledDate}
          value={lastUse || this.props.review.lastUse || null}
          placeholder="Choose month"
          onChange={this.onChange}
          allowClear={false}
          style={{ width: "100%" }}
          suffixIcon={<Icon icon="calendar" />}
        />
      </DateRangeWrapper>
    );
  }
}

export default DateRange;
