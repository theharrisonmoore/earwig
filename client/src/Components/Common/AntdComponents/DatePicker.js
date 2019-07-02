import React from "react";
import { DatePicker } from "antd";
import moment from "moment";

class DateRange extends React.Component {
  state = {
    startValue: null,
    endValue: null,
    endOpen: false
  };

  disabledStartDate = startValue => {
    const endValue = this.state.endValue;

    if (!startValue || !endValue) {
      return startValue.valueOf() > moment().valueOf();
    }
    return startValue.valueOf() > endValue.valueOf();
  };

  disabledEndDate = endValue => {
    const startValue = this.state.startValue;
    if (!endValue || !startValue) {
      return endValue.valueOf() > moment().valueOf();
    }
    return (
      endValue.valueOf() <= startValue.valueOf() ||
      endValue.valueOf() > moment().valueOf()
    );
  };

  onChange = (field, value) => {
    this.setState({
      [field]: value
    });
  };

  onStartChange = value => {
    this.onChange("startValue", value);
    this.props.handleChange("from", value && value.format("YYYY-MM-DD"));
  };

  onEndChange = value => {
    this.onChange("endValue", value);
    this.props.handleChange("to", value && value.format("YYYY-MM-DD"));
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
      <div
        style={{
          textAlign: "center",
          margin: "1rem 0",
          display: "flex",
          justifyContent: "space-around"
        }}
      >
        <DatePicker.MonthPicker
          disabledDate={this.disabledStartDate}
          value={startValue || this.props.review.workPeriod.from}
          placeholder="Start"
          onChange={this.onStartChange}
          onOpenChange={this.handleStartOpenChange}
        />
        <DatePicker.MonthPicker
          disabledDate={this.disabledEndDate}
          value={endValue || this.props.review.workPeriod.to}
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
