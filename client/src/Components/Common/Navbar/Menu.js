import React, { Component } from "react";
import SVG from "react-inlinesvg";

import { Wrapper, MenuItem } from "./Menu.style.js";

// import ProfileIcon from "./../../../assets/profile-icon.svg";

export default class Menu extends Component {
  render() {
    const { width } = this.props;
    return (
      <Wrapper width={width}>
        <MenuItem to="/profile">
          <SVG src="/icons/profile-icon.svg" className="menuIcon" />
          Your profile
        </MenuItem>
        <MenuItem to="/faq">
          <SVG src="/icons/faq-icon.svg" className="menuIcon" />
          FAQ & explainer videos
        </MenuItem>
        <MenuItem to="/resources">
          <SVG src="/icons/links-icon.svg" className="menuIcon" />
          More helpful stuff for workers
        </MenuItem>
        <MenuItem to="/contact">
          <SVG src="/icons/contact-icon.svg" className="menuIcon" />
          Shape earwig
        </MenuItem>
        <MenuItem to="/faq">
          <SVG src="/icons/tcs-icon.svg" className="menuIcon" />
          Privacy & terms
        </MenuItem>
        <MenuItem to="/logout">
          <SVG src="/icons/log-out-icon.svg" className="menuIcon" />
          Log out
        </MenuItem>
      </Wrapper>
    );
  }
}
