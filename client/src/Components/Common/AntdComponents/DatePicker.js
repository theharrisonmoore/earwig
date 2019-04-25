import React from "react";
import { DatePicker } from "antd";

class DateRange extends React.Component {
  // state = {
  //   startValue: null,
  //   endValue: null,
  //   endOpen: false
  // };

  // disabledStartDate = startValue => {
  //   const endValue = this.state.endValue;
  //   if (!startValue || !endValue) {
  //     return false;
  //   }
  //   return startValue.valueOf() > endValue.valueOf();
  // };

  // disabledEndDate = endValue => {
  //   const startValue = this.state.startValue;
  //   if (!endValue || !startValue) {
  //     return false;
  //   }
  //   return endValue.valueOf() <= startValue.valueOf();
  // };

  // onChange = (field, value) => {
  //   this.setState({
  //     [field]: value
  //   });
  // };

  // onStartChange = value => {
  //   this.onChange("startValue", value);
  // };

  // onEndChange = value => {
  //   this.onChange("endValue", value);
  // };

  // handleStartOpenChange = open => {
  //   if (!open) {
  //     this.setState({ endOpen: true });
  //   }
  // };

  // handleEndOpenChange = open => {
  //   this.setState({ endOpen: open });
  // };

  render() {
    console.log("props", this.props);
    const {
      handleStartOpenChange,
      disabledStartDate,
      onStartChange,
      disabledEndDate,
      onEndChange,
      handleEndOpenChange
    } = this.props;
    const { startValue, endValue, endOpen } = this.props;
    return (
      <div>
        <DatePicker.MonthPicker
          disabledDate={disabledStartDate}
          format="YYYY-MM-DD"
          value={startValue}
          placeholder="Start"
          onChange={onStartChange}
          onOpenChange={handleStartOpenChange}
        />
        <DatePicker.MonthPicker
          disabledDate={disabledEndDate}
          format="YYYY-MM-DD"
          value={endValue}
          placeholder="End"
          onChange={onEndChange}
          open={endOpen}
          onOpenChange={handleEndOpenChange}
        />
        {/* {this.props.children(this.state)} */}
      </div>
    );
  }
}

export default DateRange;
