import React from "react";

import { Popover } from "antd";

import {
  PopoverLink,
  PopoverDiv,
  PopoverText,
  PopoverBtn
} from "./Popover.style";

class PopoverComponent extends React.Component {
  state = {
    popoverVisible: false
  };

  hide = () => {
    this.setState({
      popoverVisible: false
    });
  };

  handleVisibleChange = popoverVisible => {
    this.setState({ popoverVisible });
  };

  render() {
    return (
      <Popover
        placement="top"
        content={
          <PopoverDiv>
            <PopoverText>
              We’re asking this because it will be useful to track over time how
              much agencies are paying workers
            </PopoverText>
            <PopoverBtn onClick={this.hide}>Got it!</PopoverBtn>
          </PopoverDiv>
        }
        trigger="click"
        visible={this.state.popoverVisible}
        onVisibleChange={this.handleVisibleChange}
      >
        <PopoverLink>Why are we asking this?</PopoverLink>
      </Popover>
    );
  }
}

export default PopoverComponent;
