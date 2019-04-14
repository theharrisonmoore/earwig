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
  LOGIN_URL
} from "./../../../constants/naviagationUrls";

export default class Menu extends PureComponent {
  render() {
    const { isMobile, isLoggedIn } = this.props;
    console.log(window.innerWidth);
    return (
      <Wrapper isMobile={isMobile}>
        {isMobile && (
          <MenuItem to={SEARCH_URL}>
            <SVG src="/icons/mobile-search-icon.svg" className="menuIcon" />
            Search
          </MenuItem>
        )}
        <MenuItem to={PROFILE_URL}>
          <SVG src="/icons/profile-icon.svg" className="menuIcon" />
          Your profile
        </MenuItem>
        <MenuItem to={FAQ_URL}>
          <SVG src="/icons/faq-icon.svg" className="menuIcon" />
          FAQ & explainer videos
        </MenuItem>
        <MenuItem to={RESOURCES_URL}>
          <SVG src="/icons/links-icon.svg" className="menuIcon" />
          More helpful stuff for workers
        </MenuItem>
        <MenuItem to={CONTACT_URL}>
          <SVG src="/icons/contact-icon.svg" className="menuIcon" />
          Shape earwig
        </MenuItem>
        <MenuItem to={FAQ_URL}>
          <SVG src="/icons/tcs-icon.svg" className="menuIcon" />
          Privacy & terms
        </MenuItem>
        {isLoggedIn ? (
          <MenuItem to={LOGOUT_URL}>
            <SVG src="/icons/log-out-icon.svg" className="menuIcon" />
            Log out
          </MenuItem>
        ) : (
          <MenuItem to={LOGIN_URL}>
            <SVG src="/icons/log-out-icon.svg" className="menuIcon" />
            Log in
          </MenuItem>
        )}
      </Wrapper>
    );
  }
}
