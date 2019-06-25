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
              {text}
            </PopoverText>
            <PopoverBtn onClick={this.hide}>Got it!</PopoverBtn>
          </PopoverDiv>
        }
        trigger="click"
        visible={this.state.popoverVisible}
        onVisibleChange={this.handleVisibleChange}
      >
        <PopoverLink>{linkText}</PopoverLink>
      </Popover>
    );
  }
}

export default PopoverComponent;
