import React from "react";
import { DatePicker } from "antd";

class DateRange extends React.Component {
  state = {
    startValue: null,
    endValue: null,
    endOpen: false
  };

  disabledStartDate = startValue => {
    const endValue = this.state.endValue;
    if (!startValue || !endValue) {
      return false;
    }
    return startValue.valueOf() > endValue.valueOf();
  };

  disabledEndDate = endValue => {
    const startValue = this.state.startValue;
    if (!endValue || !startValue) {
      return false;
    }
    return endValue.valueOf() <= startValue.valueOf();
  };

  onChange = (field, value) => {
    this.setState({
      [field]: value
    });
  };

  onStartChange = value => {
    this.onChange("startValue", value);
    this.props.setFieldValue(
      "review.workPeriod.from",
      value.format("YYYY-MM-DD")
    );
  };

  onEndChange = value => {
    this.onChange("endValue", value);
    this.props.setFieldValue(
      "review.workPeriod.to",
      value.format("YYYY-MM-DD")
    );
  };

  handleStartOpenChange = open => {
    if (!open) {
      this.setState({ endOpen: true });
    }
  };

  handleEndOpenChange = open => {
    this.setState({ endOpen: open });
  };

  render() {
    const { startValue, endValue, endOpen } = this.state;
    return (
      <div style={{ textAlign: "center", margin: "1rem 0" }}>
        <DatePicker.MonthPicker
          disabledDate={this.disabledStartDate}
          // format="YYYY-MM-DD"
          value={startValue}
          placeholder="Start"
          onChange={this.onStartChange}
          onOpenChange={this.handleStartOpenChange}
        />
        <DatePicker.MonthPicker
          disabledDate={this.disabledEndDate}
          // format="YYYY-MM-DD"
          value={endValue}
          placeholder="End"
          onChange={this.onEndChange}
          open={endOpen}
          onOpenChange={this.handleEndOpenChange}
        />
      </div>
    );
  }
}

export default DateRange;
