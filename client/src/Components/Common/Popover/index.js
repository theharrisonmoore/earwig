import React from "react";

import { Link } from "react-router-dom";

import { Popover } from "antd";

import Button from "../Button";

import Icon from "../Icon/Icon";

import { PopoverDiv } from "./Popover.style";
import { colors } from "../../../theme";

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
    const { popoverOptions, category, children } = this.props;

    const {
      placement,
      overlayStyle,
      text,
      linkText,
      icon,
      margin,
      action,
      color,
      iconTooltip,
      actionButtonTxt,
      linkButtonOptions,
      closeButton,
      bottomCancelBtn,
    } = popoverOptions;

    return (
      <Popover
        overlayStyle={overlayStyle}
        placement={placement || "top"}
        content={
          <PopoverDiv>
            {/* x button to close */}
            {closeButton && (
              <Button
                margin="-1rem -3rem 0 auto"
                style={{
                  border: "none",
                  color: colors.primary,
                }}
                icon="close"
                iconHeight="19px"
                iconWidth="19px"
                onClick={this.hide}
              />
            )}
            {/* renders text contents */}
            {text}
            {/* uses link */}
            {linkButtonOptions ? (
              <Link
                target={linkButtonOptions.target}
                to={{
                  pathname: linkButtonOptions.pathname,
                  state: linkButtonOptions.state,
                }}
              >
                <Button
                  onClick={action || this.hide}
                  category={category}
                  styleType="primary"
                  text={actionButtonTxt || "Okay"}
                  margin="1rem auto"
                />
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
            {/* renders additional cancel button */}
            {bottomCancelBtn && (
              <Button
                onClick={this.hide}
                styleType="secondary"
                text="Cancel"
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
          <>{children}</>
        )}
        {}
      </Popover>
    );
  }
}

export default PopoverComponent;
