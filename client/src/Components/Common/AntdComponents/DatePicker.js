import React from "react";
import { DatePicker } from "antd";
import moment from "moment";

import Icon from "../Icon/Icon";

import { DateRangeWrapper } from "./AntdComponents.style";

class DateRange extends React.Component {
  state = {
    lastUse: null,
    focus: false,
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

  toggleFocus = () => {
    this.setState(prevState => ({ focus: !prevState.focus }));
  };

  render() {
    const { lastUse, focus } = this.state;
    return (
      <DateRangeWrapper
        fill={lastUse || this.props.review.lastUse}
        focus={focus}
      >
        <DatePicker.MonthPicker
          disabledDate={this.disabledDate}
          value={lastUse || this.props.review.lastUse || null}
          placeholder="Choose month"
          onChange={this.onChange}
          allowClear={false}
          style={{ width: "100%" }}
          suffixIcon={<Icon icon="calendar" />}
          format="MMM YYYY"
          onFocus={this.toggleFocus}
          onBlur={this.toggleFocus}
        />
      </DateRangeWrapper>
    );
  }
}

export default DateRange;
