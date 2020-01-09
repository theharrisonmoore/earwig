import React from "react";

import { Link } from "react-router-dom";

import { Popover } from "antd";

import Button from "../Button";

import Icon from "../Icon/Icon";

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
      actionButtonTxt,
      linkButtonOptions
    } = popoverOptions;

    return (
      <Popover
        placement="top"
        content={
          <PopoverDiv>
            {text}
            {/* uses link */}
            {linkButtonOptions ? (
              <Link
                to={{
                  pathname: linkButtonOptions.pathname,
                  state: linkButtonOptions.state
                }}
              >
                <Button
                  onClick={action || this.hide}
                  category={category}
                  styleType="primary"
                  text={actionButtonTxt || "Okay"}
                  margin="1rem auto"
                ></Button>
              </Link>
            ) : (
              // otherwise just a button
              <Button
                onClick={action || this.hide}
                category={category}
                styleType="primary"
                text={actionButtonTxt || "Okay"}
                margin="1rem auto"
              />
            )}
          </PopoverDiv>
        }
        trigger="click"
        visible={this.state.popoverVisible}
        onVisibleChange={this.handleVisibleChange}
      >
        {/* renders popover styled as icon */}
        {iconTooltip && (
          <Icon
            icon={iconTooltip.icon}
            fill={iconTooltip.fill}
            width={iconTooltip.width}
            height={iconTooltip.height}
            margin={margin}
            cursor="pointer"
          />
        )}
        {/* renders popover styled as link */}
        {linkText ? (
          <Button
            styleType="link"
            icon={icon}
            text={linkText}
            margin={margin}
            color={color}
          />
        ) : (
          <>{this.props.children}</>
        )}
        {}
      </Popover>
    );
  }
}

export default PopoverComponent;
