import React, { PureComponent } from "react";

import { handleLogout, authorization } from "./../../../helpers";

import { Wrapper, MenuItem, MenuIcon } from "./Menu.style.js";
import { Icon as AdminIcon } from "antd";

import {
  SEARCH_URL,
  PROFILE_URL,
  RESOURCES_URL,
  CONTACT_URL,
  FAQ_URL,
  LOGIN_URL,
  PRIVACY_URL,
  ADMIN
} from "./../../../constants/naviagationUrls";

export default class Menu extends PureComponent {
  render() {
    const {
      isMobile,
      isLoggedIn,
      toggleMenu,
      isAdmin,
      awaitingReview,
      verified
    } = this.props;
    const data = {
      isAdmin,
      awaitingReview,
      verified,
      isLoggedIn
    };

    return (
      <Wrapper isMobile={isMobile}>
        
          <MenuItem to={SEARCH_URL} onClick={toggleMenu}>
            <MenuIcon icon="search" height="19" width="19" />
            Search
          </MenuItem>
        

        {authorization({ ...data, minimumLevel: "ADMIN" }) && (
          <MenuItem to={ADMIN} onClick={toggleMenu}>
            <AdminIcon
              type="dashboard"
              style={{
                fontSize: "24px",
                color: "#4a4a4a",
                marginRight: "16px"
              }}
            />
            Admin Dashboard
          </MenuItem>
        )}

        <MenuItem to={PROFILE_URL} onClick={toggleMenu}>
          <MenuIcon icon="getVerified" height="19" width="19" />
          Your profile
        </MenuItem>
        {authorization({ ...data, minimumLevel: "LEVEL0" }) && (
          <MenuItem to={FAQ_URL} onClick={toggleMenu}>
            <MenuIcon icon="faq" height="19" width="19" />
            FAQ & explainer videos
          </MenuItem>
        )}
        <MenuItem to={RESOURCES_URL} onClick={toggleMenu}>
          <MenuIcon icon="helpfulLinks" height="19" width="19" />
          Stuff you might find helpful
        </MenuItem>
        {authorization({ ...data, minimumLevel: "LEVEL1" }) && (
          <MenuItem to={CONTACT_URL} onClick={toggleMenu}>
            <MenuIcon icon="shapeEarwig" height="19" width="19" />
            Shape earwig
          </MenuItem>
        )}
          <MenuItem to={PRIVACY_URL} onClick={toggleMenu}>
            <MenuIcon icon="privacyTerms" height="19" width="19" />
            Privacy & terms
          </MenuItem>
        {isLoggedIn ? (
          <MenuItem to=" " onClick={handleLogout}>
            <MenuIcon icon="logoutLogin" height="19" width="19" />
            Log out
          </MenuItem>
        ) : (
          <MenuItem to={LOGIN_URL} onClick={toggleMenu}>
            <MenuIcon icon="logoutLogin" height="19" width="19" />
            Log in
          </MenuItem>
        )}
      </Wrapper>
    );
  }
}
