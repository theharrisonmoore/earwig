import React, { Component } from "react";

import { Wrapper, Icon, NavSearch, ToggleMenu } from "./Navbar.style";
import Menu from "./Menu.js";

import SearchIcon from "./../../../assets/search-icon.svg";
import Hamburger from "./../../../assets/hamburger.svg";
import Logo from "./../../../assets/logo.svg";
import Close from "./../../../assets/close.svg";

export default class Navbar extends Component {
  state = {
    menuOpen: false
  };

  openMenu = () => {
    const { menuOpen } = this.state;
    this.setState({ menuOpen: !menuOpen });
  };

  render() {
    const { title, width, search, isLoggedIn } = this.props;
    const { menuOpen } = this.state;

    if (width > 769) {
      return (
        <Wrapper height="4rem">
          <Icon src={Logo} alt="logo" />
          {search && (
            <NavSearch>
              <input placeholder="Try searching for agencies, payrolls, worksites, or companies..." />
              <img src={SearchIcon} alt="search" />
            </NavSearch>
          )}

          {menuOpen ? (
            <>
              <ToggleMenu onClick={this.openMenu}>
                <h2>CLOSE</h2>
                <img src={Close} alt="close" />
              </ToggleMenu>
              <Menu width={width} isLoggedIn={isLoggedIn} />
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
          {menuOpen ? (
            <>
              <ToggleMenu onClick={this.openMenu}>
                <img src={Close} alt="close" />
              </ToggleMenu>
              <Menu width={width} isLoggedIn={isLoggedIn} />
            </>
          ) : (
            <ToggleMenu onClick={this.openMenu}>
              <Icon src={Hamburger} alt="hamburger" />
            </ToggleMenu>
          )}
          {/* MOBILE VERSION */}
        </Wrapper>
      );
    }
  }
}
