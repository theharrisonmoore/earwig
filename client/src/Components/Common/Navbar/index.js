import React, { Component } from "react";

import { NavLink } from "react-router-dom";

import { SEARCH_URL } from "./../../../constants/naviagationUrls";

import {
  Wrapper,
  LogoIcon,
  Icon,
  NavSearch,
  NavInput,
  NavSearchIcon,
  ToggleMenu,
  SideDiv,
  WrapperH2
} from "./Navbar.style";
import Menu from "./Menu.js";

import SearchIcon from "./../../../assets/search-icon.svg";
import HamburgerIcon from "./../../../assets/hamburger-icon.svg";
import Logo from "./../../../assets/logo.svg";
import CloseIcon from "./../../../assets/close-icon.svg";

export default class Navbar extends Component {
  state = {
    menuOpen: false
  };

  toggleMenu = () => {
    const { menuOpen } = this.state;
    this.setState({ menuOpen: !menuOpen });
  };

  render() {
    const { title, isMobile, search, isLoggedIn } = this.props;
    const { menuOpen } = this.state;

    if (!isMobile) {
      console.log("REACHED");
      return (
        <Wrapper height="4rem">
          <SideDiv position="left">
            <NavLink to={SEARCH_URL}>
              <LogoIcon src={Logo} alt="logo" />
            </NavLink>
          </SideDiv>
          {search && (
            <NavSearch>
              <NavInput placeholder="Try searching for agencies, payrolls, worksites, or companies..." />
              <NavSearchIcon src={SearchIcon} alt="search" />
            </NavSearch>
          )}

          {menuOpen ? (
            <>
              <SideDiv position="right">
                <ToggleMenu onClick={this.toggleMenu}>
                  <WrapperH2>CLOSE</WrapperH2>
                  <img src={CloseIcon} alt="close" />
                </ToggleMenu>
              </SideDiv>
              <Menu isMobile={isMobile} isLoggedIn={isLoggedIn} />
            </>
          ) : (
            <SideDiv position="right">
              <ToggleMenu onClick={this.toggleMenu}>
                <WrapperH2>MENU</WrapperH2>
                <Icon src={HamburgerIcon} alt="hamburger" />
              </ToggleMenu>
            </SideDiv>
          )}
          {/* MOBILE VERSION */}
        </Wrapper>
      );
    } else {
      return (
        <Wrapper height="3rem">
          <SideDiv position="left">
            <Icon src={SearchIcon} alt="search" />
          </SideDiv>
          <WrapperH2>{title && title}</WrapperH2>
          {menuOpen ? (
            <>
              <ToggleMenu onClick={this.toggleMenu}>
                <img src={CloseIcon} alt="close" />
              </ToggleMenu>
              <Menu isMobile={isMobile} isLoggedIn={isLoggedIn} />
            </>
          ) : (
            <SideDiv position="right">
              <ToggleMenu onClick={this.toggleMenu}>
                <Icon src={HamburgerIcon} alt="hamburger" />
              </ToggleMenu>
            </SideDiv>
          )}
          {/* MOBILE VERSION */}
        </Wrapper>
      );
    }
  }
}
