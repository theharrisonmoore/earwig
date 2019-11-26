import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import { Button, Icon as AntIcon } from "antd";

import Icon from "../Icon/Icon";
import { ADMIN } from "../../../constants/naviagationUrls";
import { Wrapper, ToggleMenu, SideDiv, WrapperH2 } from "./Navbar.style";
import Menu from "./Menu";

export default class Navbar extends Component {
  state = {
    menuOpen: false
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
      awaitingReview
    } = this.props;

    let text = title;
    if (url === "/search/review") {
      text = "Give review";
    }

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
                />
              </>
            ) : (
              <>
                <ToggleMenu isMobile={isMobile} onClick={this.toggleMenu}>
                  <Icon icon="hamburger" width="1.5rem" height="1.5rem" />
                </ToggleMenu>
              </>
            )}
          </SideDiv>
          <WrapperH2 style={{ fontWeight: "900" }}>{text && text}</WrapperH2>
          <SideDiv position="flex-end" isDesktop={!isMobile}>
            {isAdmin && (
              <NavLink to={ADMIN}>
                <Button type="primary" style={{ marginRight: "25px" }}>
                  <AntIcon
                    type="dashboard"
                    style={{
                      fontSize: "24px",
                      color: "#FFFFFF"
                    }}
                  />
                </Button>
              </NavLink>
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
            />
          </>
        ) : (
          <SideDiv position="flex-start">
            <ToggleMenu onClick={this.toggleMenu}>
              <Icon icon="hamburger" width="1.5rem" height="1.5rem" />
            </ToggleMenu>
          </SideDiv>
        )}
        <WrapperH2 style={{ fontWeight: "900" }}>{text && text}</WrapperH2>
        <SideDiv position="flex-end"></SideDiv>
      </Wrapper>
    );
  }
}
