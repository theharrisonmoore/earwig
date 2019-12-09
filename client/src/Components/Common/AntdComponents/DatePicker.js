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

  static getDerivedStateFromProps(props) {
    if (props.isCurrentlyWorking) {
      return {
        lastUse: moment(),
      };
    }
    return null;
  }

  componentDidUpdate(prevProps) {
    const { lastUse } = this.state;
    if (prevProps.isCurrentlyWorking !== this.props.isCurrentlyWorking) {
      this.props.handleChange(
        lastUse && lastUse.startOf("month").format("YYYY-MM-DD")
      );
    }
  }

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
    const { isCurrentlyWorking } = this.props;
    return (
      <DateRangeWrapper
        fill={
          lastUse || this.props.review.lastUse || this.props.isCurrentlyWorking
        }
        focus={focus}
      >
        <DatePicker.MonthPicker
          disabledDate={this.disabledDate}
          value={lastUse || this.props.review.lastUse || null}
          placeholder="Choose month"
          onChange={this.onChange}
          allowClear={false}
          style={{ width: "100%", paddingTop: "0" }}
          suffixIcon={<Icon icon="calendar" />}
          format="MMM YYYY"
          onFocus={this.toggleFocus}
          onBlur={this.toggleFocus}
          disabled={isCurrentlyWorking}
        />
      </DateRangeWrapper>
    );
  }
}

export default DateRange;
