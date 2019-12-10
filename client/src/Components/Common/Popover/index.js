import React from "react";

import { Popover } from "antd";

import Button from "../Button";

import { PopoverDiv, PopoverText } from "./Popover.style";

class PopoverComponent extends React.Component {
  state = {
    popoverVisible: false,
    currentUrl: "/"
  };

  hide = () => {
    this.setState({
      popoverVisible: false
    });
  };

  handleVisibleChange = popoverVisible => {
    this.setState({ popoverVisible });
  };

  componentDidMount() {
    this.setState({ currentUrl: window.location.pathname });
    const { popoverOptions } = this.props;
    const { loadAutomatically } = popoverOptions;
    // console.log("hist pop", history, currentState);

    if (loadAutomatically) this.handleVisibleChange(loadAutomatically);
  }

  componentDidUpdate() {
    window.onpopstate = e => {
      const { popoverVisible } = this.state;
      if (popoverVisible) {
        this.hide();
      }
    }
  }

  // componentWillUnmount() {
  //   const { history } = this.props;
  //   if (history) {
  //     console.log("window", window.location.pathname);
  //     history.goForward();
  //   }
  // }

  render() {
    const { popoverOptions, category } = this.props;
    const { text, linkText, icon, margin, action, color } = popoverOptions;

    return (
      <Popover
        placement="top"
        content={
          <PopoverDiv>
            <PopoverText>{text}</PopoverText>
            <Button
              onClick={action || this.hide}
              category={category}
              styleType="primary"
              text="Okay"
              margin="1rem auto"
            />
          </PopoverDiv>
        }
        trigger="click"
        visible={this.state.popoverVisible}
        onVisibleChange={this.handleVisibleChange}
      >
        {linkText ? (
          <Button
            styleType="link"
            icon={icon}
            text={linkText}
            margin={margin}
            color={color}
          />
        ) : (
          <p>{this.props.children}</p>
        )}
      </Popover>
    );
  }
}

export default PopoverComponent;
