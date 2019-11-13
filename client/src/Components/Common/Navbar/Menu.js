import React, { PureComponent } from "react";

import { Icon as AdminIcon } from "antd";
import { handleLogout, authorization } from "../../../helpers";

import {
  Wrapper,
  MenuItem,
  MenuIcon,
  LogoutButton,
  PriorityIcon,
  MenuWrapper,
} from "./Menu.style";

import { ToggleMenu } from "./Navbar.style";

import Icon from "../Icon/Icon";

import { colors } from "../../../theme";

import {
  WELCOME_URL,
  PROFILE_URL,
  RESOURCES_URL,
  CONTACT_URL,
  FAQ_URL,
  LOGIN_URL,
  PRIVACY_AND_TERMS_URL,
  ADMIN,
  MY_REVIEWS_URL,
  INVITE_WORKERS_URL,
  SEARCH_URL,
} from "../../../constants/naviagationUrls";

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
      handleChangeState,
    } = this.props;
    const data = {
      isAdmin,
      awaitingReview,
      verified,
      isLoggedIn,
    };

    const isWorker = awaitingReview || verified;

    return (
      <Wrapper isMobile={isMobile}>
        <ToggleMenu
          onClick={toggleMenu}
          position="flex-end"
          isMobile={isMobile}
        >
          <Icon icon="close" height="20px" width="20px" />
        </ToggleMenu>
        {authorization({ ...data, minimumLevel: "ADMIN" }) && (
          <MenuItem to={ADMIN} onClick={toggleMenu}>
            <AdminIcon
              type="dashboard"
              style={{
                fontSize: "19px",
                color: colors.white,
                marginRight: "16px",
              }}
            />
            Admin Dashboard
          </MenuItem>
        )}

        {isLoggedIn ? (
          <MenuWrapper>
            <MenuItem to={WELCOME_URL} onClick={toggleMenu}>
              <PriorityIcon icon="search" height="19" width="19" />
              Search
            </MenuItem>
            {/* <MenuItem
              disabled
              to={isWorker ? ASK_QUESTION_URL : PROFILE_URL}
              onClick={toggleMenu}
            >
              <PriorityIcon disabled icon="raiseHand" height="19" width="19" />
              <ComingSoon>
                <p>Ask workers a question</p> <span>(coming soon)</span>
              </ComingSoon>
            </MenuItem> */}
            {/* {isWorker && (
              <MenuItem disabled to={JOBS_URL} onClick={toggleMenu}>
                <PriorityIcon disabled icon="jobBoard" height="19" width="19" />
                <ComingSoon>
                  <p>Find a job</p> <span>(coming soon)</span>
                </ComingSoon>
              </MenuItem>
            )} */}
            {isWorker && (
              <MenuItem to={INVITE_WORKERS_URL} onClick={toggleMenu}>
                <PriorityIcon icon="win" height="19" width="19" />
                Invite workers to earwig
              </MenuItem>
            )}
            <MenuItem to={PROFILE_URL} onClick={toggleMenu}>
              <MenuIcon icon="getVerified" height="19" width="19" />
              Your profile
            </MenuItem>
            {/* {isWorker && (
              <MenuItem disabled to={PROFILE_URL} onClick={toggleMenu}>
                <MenuIcon disabled icon="email" height="19" width="19" />
                <ComingSoon purple>
                  <p>Your inbox</p> <span>(coming soon)</span>
                </ComingSoon>
              </MenuItem>
            )} */}
            {isWorker && (
              <MenuItem to={MY_REVIEWS_URL} onClick={toggleMenu}>
                <MenuIcon icon="starComment" height="19" width="19" />
                Reviews you&apos;ve given
              </MenuItem>
            )}
            {isWorker && (
              <MenuItem to={FAQ_URL} onClick={toggleMenu}>
                <MenuIcon icon="faq" height="19" width="19" />
                FAQ & how to use earwig
              </MenuItem>
            )}
            {isWorker && (
              <MenuItem to={RESOURCES_URL} onClick={toggleMenu}>
                <MenuIcon icon="helpfulLinks" height="19" width="19" />
                Stuff you might find helpful
              </MenuItem>
            )}
            {isWorker && (
              <MenuItem to={CONTACT_URL} onClick={toggleMenu}>
                <MenuIcon icon="shapeEarwig" height="19" width="19" />
                Shape earwig
              </MenuItem>
            )}
            <MenuItem to={PRIVACY_AND_TERMS_URL} onClick={toggleMenu}>
              <MenuIcon icon="privacyTerms" height="19" width="19" />
              Privacy & terms
            </MenuItem>
            <LogoutButton
              onClick={() => handleLogout(history, handleChangeState)}
            >
              <MenuIcon icon="logoutLogin" height="19" width="19" />
              Log out
            </LogoutButton>
          </MenuWrapper>
        ) : (
          <MenuWrapper>
            <MenuItem to={WELCOME_URL} onClick={toggleMenu}>
              <PriorityIcon icon="search" height="19" width="19" />
              Search
            </MenuItem>
            <MenuItem to={LOGIN_URL} onClick={toggleMenu}>
              <MenuIcon icon="user" height="19" width="19" />
              Log in to see more
            </MenuItem>
            <MenuItem to={PRIVACY_AND_TERMS_URL} onClick={toggleMenu}>
              <MenuIcon icon="privacyTerms" height="19" width="19" />
              Privacy & terms
            </MenuItem>
          </MenuWrapper>
        )}
      </Wrapper>
    );
  }
}
