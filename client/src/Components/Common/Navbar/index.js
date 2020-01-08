import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import { Button, Icon as AntIcon } from "antd";

import Icon from "../Icon/Icon";
import Link from "../Link";

import {
  ADMIN,
  HOME_PAGE,
  MY_REVIEWS_URL,
  MY_POINTS_URL,
  PROFILE_URL,
} from "../../../constants/naviagationUrls";

import { Wrapper, ToggleMenu, SideDiv, WrapperH2 } from "./Navbar.style";
import Menu from "./Menu";
import { colors } from "../../../theme";

import { MenuItem } from "./Menu.style";

export default class Navbar extends Component {
  state = {
    menuOpen: false,
  };

  toggleMenu = () => {
    const { menuOpen } = this.state;
    this.setState({ menuOpen: !menuOpen });
  };

  render() {
    const { url } = this.props.match;
    const {
      title,
      isMobile,
      isLoggedIn,
      isAdmin,
      history,
      handleChangeState,
      verified,
      awaitingReview,
      match,
      level,
    } = this.props;

    let text = title;
    if (url === "/search/review") {
      text = "Give review";
    }
    const { path: currentPath } = match;

    const { menuOpen } = this.state;
    if (!isMobile) {
      return (
        <Wrapper height="4rem">
          <SideDiv position="flex-start">
            {menuOpen ? (
              <>
                {/* <ToggleMenu onClick={this.toggleMenu} position="flex-end">
                  <img src={CloseIcon} alt="close" />
                </ToggleMenu> */}
                <Menu
                  isMobile={isMobile}
                  isLoggedIn={isLoggedIn}
                  toggleMenu={this.toggleMenu}
                  isAdmin={isAdmin}
                  history={history}
                  handleChangeState={handleChangeState}
                  verified={verified}
                  awaitingReview={awaitingReview}
                  level={level}
                />
              </>
            ) : (
              <>
                {[MY_POINTS_URL, MY_REVIEWS_URL].includes(currentPath) ? (
                  <ToggleMenu isMobile={isMobile}>
                    <Link to={PROFILE_URL} type="primary" text="Back" />
                  </ToggleMenu>
                ) : (
                  <ToggleMenu isMobile={isMobile} onClick={this.toggleMenu}>
                    <Icon
                      icon="hamburger"
                      width="1.5rem"
                      height="1.5rem"
                      color={colors.primary}
                    />
                  </ToggleMenu>
                )}
              </>
            )}
          </SideDiv>
          <WrapperH2>{text && text}</WrapperH2>
          <SideDiv position="flex-end" isDesktop={!isMobile}>
            {isAdmin && (
              <NavLink to={ADMIN}>
                <Button type="primary" style={{ marginRight: "25px" }}>
                  <AntIcon
                    type="dashboard"
                    style={{
                      fontSize: "24px",
                      color: "#FFFFFF",
                    }}
                  />
                </Button>
              </NavLink>
            )}
            {currentPath !== HOME_PAGE && (
              <MenuItem to={HOME_PAGE} extraRightPadding>
                <Icon
                  icon="home"
                  height="26"
                  width="26"
                  color={colors.primary}
                />
              </MenuItem>
            )}
          </SideDiv>
          {/* MOBILE VERSION */}
        </Wrapper>
      );
    }
    return (
      <Wrapper height={menuOpen ? "200vh" : "3rem"}>
        {menuOpen ? (
          <>
            <Menu
              isMobile={isMobile}
              isLoggedIn={isLoggedIn}
              toggleMenu={this.toggleMenu}
              isAdmin={isAdmin}
              history={history}
              handleChangeState={handleChangeState}
              verified={verified}
              awaitingReview={awaitingReview}
              level={level}
            />
          </>
        ) : (
          <SideDiv position="flex-start">
            {[MY_POINTS_URL, MY_REVIEWS_URL].includes(currentPath) ? (
              <ToggleMenu isMobile={isMobile}>
                <Link to={PROFILE_URL} type="primary" text="Back" />
              </ToggleMenu>
            ) : (
              <ToggleMenu isMobile={isMobile} onClick={this.toggleMenu}>
                <Icon
                  icon="hamburger"
                  width="1.5rem"
                  height="1.5rem"
                  color={colors.primary}
                />
              </ToggleMenu>
            )}
          </SideDiv>
        )}
        <WrapperH2 style={{ fontWeight: "900" }}>{text && text}</WrapperH2>
        <SideDiv position="flex-end">
          {currentPath !== HOME_PAGE && (
            <MenuItem to={HOME_PAGE} extraRightPadding>
              <Icon icon="home" height="22" width="22" color={colors.primary} />
            </MenuItem>
          )}
        </SideDiv>
      </Wrapper>
    );
  }
}
