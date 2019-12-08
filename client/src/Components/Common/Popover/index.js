import React from "react";

import { Popover } from "antd";

import Button from "../Button";

import { PopoverDiv, PopoverText } from "./Popover.style";

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

  componentDidMount() {
    this.hide();
    console.log(this.state);
    const { popoverOptions, history, currentState } = this.props;
    const { loadAutomatically } = popoverOptions;
    console.log("hist pop", history, currentState);

    if (loadAutomatically) this.handleVisibleChange(loadAutomatically);

    window.onpopstate = () => {
      this.hide();
      if (history) {
        history.push({
          pathname: window.location.pathname,
          state: currentState
        });
      }
    };
  }

  componentWillUnmount() {
    const { history } = this.props;
    if (history) {
      history.goForward();
    }
  }

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
