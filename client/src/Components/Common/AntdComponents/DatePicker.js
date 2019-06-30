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
      return (
        startValue.valueOf() > moment().valueOf() ||
        startValue.valueOf() <
          moment()
            .subtract(12, "months")
            .valueOf()
      );
    }
    return (
      startValue.valueOf() > endValue.valueOf() ||
      startValue.valueOf() <
        moment()
          .subtract(12, "months")
          .valueOf()
    );
  };

  disabledEndDate = endValue => {
    const startValue = this.state.startValue;
    if (!endValue || !startValue) {
      return (
        endValue.valueOf() > moment().valueOf() ||
        endValue.valueOf() <
          moment()
            .subtract(12, "months")
            .valueOf()
      );
    }
    return (
      endValue.valueOf() <= startValue.valueOf() ||
      endValue.valueOf() > moment().valueOf() ||
      endValue.valueOf() < moment().subtract(12, "months") ||
      endValue.valueOf() <
        moment()
          .subtract(12, "months")
          .valueOf()
    );
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
      value && value.format("YYYY-MM-DD")
    );
  };

  onEndChange = value => {
    this.onChange("endValue", value);
    this.props.setFieldValue(
      "review.workPeriod.to",
      value && value.format("YYYY-MM-DD")
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
      <div
        style={{
          textAlign: "center",
          margin: "1rem 0",
          display: "flex",
          justifyContent: "space-around"
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            fontWeight: "500"
          }}
        >
          <label htmlFor="start">From</label>
          <DatePicker.MonthPicker
            disabledDate={this.disabledStartDate}
            value={startValue}
            placeholder="Start"
            onChange={this.onStartChange}
            onOpenChange={this.handleStartOpenChange}
            id="start"
          />
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            fontWeight: "500"
          }}
        >
          <label htmlFor="end">To</label>
          <DatePicker.MonthPicker
            disabledDate={this.disabledEndDate}
            value={endValue}
            placeholder="End"
            onChange={this.onEndChange}
            open={endOpen}
            onOpenChange={this.handleEndOpenChange}
            id="end"
          />
        </div>
      </div>
    );
  }
}

export default DateRange;
