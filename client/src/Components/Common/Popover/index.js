import React from "react";

import { Popover } from "antd";

import Button from "../Button";

import Icon from "../Icon/Icon";

import { PopoverDiv, PopoverText } from "./Popover.style";

class PopoverComponent extends React.Component {
  state = {
    popoverVisible: false,
  };

  hide = () => {
    this.setState({
      popoverVisible: false,
    });
  };

  handleVisibleChange = popoverVisible => {
    this.setState({ popoverVisible });
  };

  componentDidMount() {
    const { popoverOptions } = this.props;
    const { loadAutomatically } = popoverOptions;
    if (loadAutomatically) this.handleVisibleChange(loadAutomatically);
  }

  componentDidUpdate() {
    window.onpopstate = e => {
      const { popoverVisible } = this.state;
      if (popoverVisible) {
        this.hide();
      }
    };
  }

  render() {
    const { popoverOptions, category } = this.props;
    const {
      text,
      linkText,
      icon,
      margin,
      action,
      color,
      iconTooltip,
    } = popoverOptions;

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
        {iconTooltip ? (
          <Icon
            icon={iconTooltip.icon}
            fill={iconTooltip.fill}
            width={iconTooltip.width}
            height={iconTooltip.height}
          />
        ) : (
          <p>{this.props.children}</p>
        )}

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
        {}
      </Popover>
    );
  }
}

export default PopoverComponent;
