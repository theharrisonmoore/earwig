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
import PopoverComponent from "../Popover";

import { colors } from "../../../theme";

import {
  HOME_PAGE,
  PROFILE_URL,
  // RESOURCES_URL,
  CONTACT_URL,
  FAQ_URL,
  SIGNUP_URL,
  PRIVACY_AND_TERMS_URL,
  ADMIN,
  INVITE_WORKERS_URL,
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
      level,
    } = this.props;

    const data = {
      isAdmin,
      awaitingReview,
      verified,
      isLoggedIn,
    };

    const { isAuthorized } = authorization({ ...data, minimumLevel: "ADMIN" });

    const getPopoverContent = () => {
      return (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            textAlign: "center",
          }}
        >
          <Icon
            icon="newWindow"
            height="50"
            width="50"
            margin="-0.6rem 0 1rem 0"
            fill={colors.gray}
          />
          Helpful stuff will open in a new window.
        </div>
      );
    };

    return (
      <Wrapper isMobile={isMobile}>
        <ToggleMenu
          onClick={toggleMenu}
          position="flex-end"
          isMobile={isMobile}
        >
          <Icon icon="close" height="20px" width="20px" />
        </ToggleMenu>
        {isAuthorized && (
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
            <MenuItem to={HOME_PAGE} onClick={toggleMenu}>
              <PriorityIcon icon="home" height="19" width="19" />
              Home
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
            {level >= 3 && (
              <MenuItem to={INVITE_WORKERS_URL} onClick={toggleMenu}>
                <PriorityIcon
                  icon="win"
                  height="19"
                  width="19"
                  fill={colors.primary}
                />
                Refer a friend
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
            {/* {isWorker && (
              <MenuItem to={MY_REVIEWS_URL} onClick={toggleMenu}>
                <MenuIcon icon="starComment" height="19" width="19" />
                Reviews you&apos;ve given
              </MenuItem>
            )} */}
            <MenuItem to={FAQ_URL} onClick={toggleMenu}>
              <MenuIcon icon="faq" height="19" width="19" />
              FAQ & how to use earwig
            </MenuItem>
            {/* helpful stuff section */}
            {level >= 3 && (
              <MenuItem to="/" target="_blank">
                <MenuIcon icon="helpfulLinks" height="19" width="19" />

                <PopoverComponent
                  popoverOptions={{
                    text: getPopoverContent(),
                    placement: "right",
                    linkButtonOptions: {
                      target: "_blank",
                      pathname: "//www.earwigwork.com/blog",
                    },
                    overlayStyle: { paddingLeft: "4.3rem" },
                    margin: "1rem 0 0 0",
                    bottomCancelBtn: true,
                  }}
                >
                  Helpful stuff
                  <MenuIcon
                    icon="newWindow"
                    height="12"
                    width="12"
                    margin="0 0 0 0.5rem"
                  />
                </PopoverComponent>
              </MenuItem>
            )}
            {level >= 3 && (
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
            <MenuItem to={HOME_PAGE} onClick={toggleMenu}>
              <PriorityIcon icon="home" height="19" width="19" />
              Home
            </MenuItem>
            <MenuItem to={SIGNUP_URL} onClick={toggleMenu}>
              <MenuIcon icon="user" height="19" width="19" />
              Create an account for more
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
