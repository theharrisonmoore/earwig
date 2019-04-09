import React, { Component } from "react";

import { Wrapper, Icon, NavSearch, ToggleMenu } from "./Navbar.style";
import Menu from "./Menu.js";

import SearchIcon from "./../../../assets/search-icon.svg";
import Hamburger from "./../../../assets/hamburger.svg";
import Logo from "./../../../assets/logo.svg";

export default class Navbar extends Component {
  state = {
    menuOpen: false
  };

  openMenu = () => {
    const { menuOpen } = this.state;
    this.setState({ menuOpen: !menuOpen });
    console.log("hello", menuOpen);
  };

  render() {
    // need to know
    // width
    // page title?
    // meant to be there?
    // search bar?

    const { title, width } = this.props;
    const { menuOpen } = this.state;

    if (width > 769) {
      return (
        <Wrapper height="4rem">
          <Icon src={Logo} alt="logo" />
          <NavSearch>
            <input placeholder="Try searching for agencies, payrolls, worksites, or companies..." />
            <img src={SearchIcon} alt="search" />
          </NavSearch>
          {menuOpen ? (
            <>
              <ToggleMenu onClick={this.openMenu}>
                <h2>CLOSE</h2>
                <h2>X</h2>
              </ToggleMenu>
              <Menu width={width} />
            </>
          ) : (
            <ToggleMenu onClick={this.openMenu}>
              <h2>MENU</h2>
              <Icon src={Hamburger} alt="hamburger" />
            </ToggleMenu>
          )}
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
