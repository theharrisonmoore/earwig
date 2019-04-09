import React, { Component } from "react";

import { Wrapper, Icon, NavSearch, DesktopMenu } from "./Navbar.style";

import SearchIcon from "./../../../assets/search-icon.svg";
import Hamburger from "./../../../assets/hamburger.svg";
import Logo from "./../../../assets/logo.svg";

export default class Navbar extends Component {
  render() {
    // need to know
    // width
    // page title?
    // meant to be there?
    // search bar?

    const { title, width } = this.props;

    if (width > 769) {
      return (
        <Wrapper height="4rem">
          <Icon src={Logo} alt="logo" />
          <NavSearch>
            <input placeholder="Try searching for agencies, payrolls, worksites, or companies..." />
            <img src={SearchIcon} alt="search" />
          </NavSearch>
          <DesktopMenu>
            <h2>MENU</h2>
            <Icon src={Hamburger} alt="hamburger" />
          </DesktopMenu>
          {/* MOBILE VERSION */}
        </Wrapper>
      );
    } else {
      return (
        <Wrapper height="3rem">
          <Icon src={SearchIcon} alt="search" />
          <h2>{title && title}</h2>
          <Icon src={Hamburger} alt="hamburger" />
          {/* MOBILE VERSION */}
        </Wrapper>
      );
    }
  }
}
