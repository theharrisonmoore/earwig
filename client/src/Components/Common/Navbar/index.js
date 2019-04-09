import React, { Component } from "react";

import { Wrapper, Icon } from "./Navbar.style";

import SearchIcon from "./../../../assets/search-icon.svg";
import Hamburger from "./../../../assets/hamburger.svg";

export default class Navbar extends Component {
  render() {
    // need to know
    // width
    // page title?
    // meant to be there?
    // search bar?

    return (
      <Wrapper>
        <Icon src={SearchIcon} alt="search" />
        <h2>Hi</h2>
        <Icon src={Hamburger} alt="hamburger" />
        {/* MOBILE VERSION */}
      </Wrapper>
    );
  }
}
