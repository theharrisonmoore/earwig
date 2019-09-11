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
    const { popoverOptions, category } = this.props;
    const { text, linkText } = popoverOptions;

    return (
      <Popover
        placement="top"
        content={
          <PopoverDiv>
            <PopoverText>{text}</PopoverText>
            <PopoverBtn onClick={this.hide} category={category}>
              Got it!
            </PopoverBtn>
          </PopoverDiv>
        }
        trigger="click"
        visible={this.state.popoverVisible}
        onVisibleChange={this.handleVisibleChange}
      >
        {linkText ? (
          <PopoverLink category={category}>{linkText}</PopoverLink>
        ) : (
          <p>{this.props.children}</p>
        )}
      </Popover>
    );
  }
}

export default PopoverComponent;
