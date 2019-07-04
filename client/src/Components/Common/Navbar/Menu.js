import React, { PureComponent } from "react";

import { handleLogout, authorization } from "./../../../helpers";

import { Wrapper, MenuItem, MenuIcon, LogoutButton, PriorityMenuItem, ComingSoon, PriorityIcon } from "./Menu.style.js";
import { Icon as AdminIcon } from "antd";

import { colors } from "./../../../theme";

import {
  SEARCH_URL,
  PROFILE_URL,
  RESOURCES_URL,
  CONTACT_URL,
  FAQ_URL,
  LOGIN_URL,
  PRIVACY_AND_TERMS_URL,
  ADMIN,
  MY_REVIEWS_URL,
  GIVE_REVIEW_URL,
  JOBS_URL,
  INVITE_WORKERS_URL,
  ASK_QUESTION_URL
} from "./../../../constants/naviagationUrls";

export default class Menu extends PureComponent {
  render() {
    const {
      isMobile,
      isLoggedIn,
      toggleMenu,
      isAdmin,
      awaitingReview,
      verified,
      history,
      handleChangeState
    } = this.props;
    const data = {
      isAdmin,
      awaitingReview,
      verified,
      isLoggedIn
    };

    return (
      <Wrapper isMobile={isMobile}>
        

        {authorization({ ...data, minimumLevel: "ADMIN" }) && (
          <PriorityMenuItem to={ADMIN} onClick={toggleMenu}>
            <AdminIcon
              type="dashboard"
              style={{
                fontSize: "19px",
                color: colors.white,
                marginRight: "16px"
              }}
            />
            Admin Dashboard
          </PriorityMenuItem>
        )}

        <PriorityMenuItem to={GIVE_REVIEW_URL} onClick={toggleMenu}>
          <PriorityIcon icon="starComment" height="19" width="19" />
          Give a review
        </PriorityMenuItem>        
<PriorityMenuItem to={SEARCH_URL} onClick={toggleMenu}>
          <PriorityIcon icon="search" height="19" width="19" />
          Read reviews & ratings
        </PriorityMenuItem>
        <PriorityMenuItem disabled to={ASK_QUESTION_URL} onClick={toggleMenu}>
          <PriorityIcon disabled icon="raiseHand" height="19" width="19" />
          <ComingSoon><p>Ask workers a question</p> <span>(coming soon)</span></ComingSoon>
        </PriorityMenuItem>
        <PriorityMenuItem  disabled to={JOBS_URL} onClick={toggleMenu}>
          <PriorityIcon disabled icon="jobBoard" height="19" width="19" />
          <ComingSoon><p>Find a job</p> <span>(coming soon)</span></ComingSoon>
        </PriorityMenuItem>
        <PriorityMenuItem to={INVITE_WORKERS_URL} onClick={toggleMenu}>
          <PriorityIcon icon="win" height="19" width="19" />
          Invite workers to earwig
        </PriorityMenuItem>
        <MenuItem to={PROFILE_URL} onClick={toggleMenu}>
          <MenuIcon icon="getVerified" height="19" width="19" />
          Your profile
        </MenuItem>
        <MenuItem disabled to={PROFILE_URL} onClick={toggleMenu}>
          <MenuIcon disabled icon="email" height="19" width="19" />
          <ComingSoon purple><p>Your inbox</p> <span>(coming soon)</span></ComingSoon>
        </MenuItem>
        <MenuItem to={MY_REVIEWS_URL} onClick={toggleMenu}>
          <MenuIcon icon="starComment" height="19" width="19" />
          Reviews you've given
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
        <MenuItem to={PRIVACY_AND_TERMS_URL} onClick={toggleMenu}>
          <MenuIcon icon="privacyTerms" height="19" width="19" />
          Privacy & terms
        </MenuItem>
        {isLoggedIn ? (
          <LogoutButton
            onClick={() => handleLogout(history, handleChangeState)}
          >
            <MenuIcon icon="logoutLogin" height="19" width="19" />
            Log out
          </LogoutButton>
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
