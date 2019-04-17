import React, { PureComponent } from "react";
import SVG from "react-inlinesvg";

import { Wrapper, MenuItem } from "./Menu.style.js";

import {
  SEARCH_URL,
  PROFILE_URL,
  RESOURCES_URL,
  CONTACT_URL,
  FAQ_URL,
  LOGOUT_URL,
  LOGIN_URL,
  PRIVACY_URL
} from "./../../../constants/naviagationUrls";

export default class Menu extends PureComponent {
  render() {
    const { isMobile, isLoggedIn, toggleMenu } = this.props;
    return (
      <Wrapper isMobile={isMobile}>
        {isMobile && (
          <MenuItem to={SEARCH_URL} onClick={toggleMenu}>
            <SVG src="/icons/mobile-search-icon.svg" className="menuIcon" />
            Search
          </MenuItem>
        )}
        <MenuItem to={PROFILE_URL} onClick={toggleMenu}>
          <SVG src="/icons/profile-icon.svg" className="menuIcon" />
          Your profile
        </MenuItem>
        <MenuItem to={FAQ_URL} onClick={toggleMenu}>
          <SVG src="/icons/faq-icon.svg" className="menuIcon" />
          FAQ & explainer videos
        </MenuItem>
        <MenuItem to={RESOURCES_URL} onClick={toggleMenu}>
          <SVG src="/icons/links-icon.svg" className="menuIcon" />
          More helpful stuff for workers
        </MenuItem>
        <MenuItem to={CONTACT_URL} onClick={toggleMenu}>
          <SVG src="/icons/contact-icon.svg" className="menuIcon" />
          Shape earwig
        </MenuItem>
        <MenuItem to={PRIVACY_URL} onClick={toggleMenu}>
          <SVG src="/icons/tcs-icon.svg" className="menuIcon" />
          Privacy & terms
        </MenuItem>
        {isLoggedIn ? (
          <MenuItem to={LOGOUT_URL} onClick={toggleMenu}>
            <SVG src="/icons/log-out-icon.svg" className="menuIcon" />
            Log out
          </MenuItem>
        ) : (
          <MenuItem to={LOGIN_URL} onClick={toggleMenu}>
            <SVG src="/icons/log-out-icon.svg" className="menuIcon" />
            Log in
          </MenuItem>
        )}
      </Wrapper>
    );
  }
}
