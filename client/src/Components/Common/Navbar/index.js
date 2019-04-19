import React, { Component } from "react";

import { NavLink } from "react-router-dom";
import { Button, Icon as AntIcon } from "antd";

import { SEARCH_URL, ADMIN } from "./../../../constants/naviagationUrls";

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
import axios from "axios";

import AutosuggestComponent from "../../Pages/Search/AutoSuggest";
import { API_SEARCH_URL } from "../../../apiUrls";

export const axiosCall = async () => {
  const response = await axios.get(API_SEARCH_URL);
  return response;
};

export default class Navbar extends Component {
  state = {
    isLoading: false,
    data: null,
    menuOpen: false
  };

  componentDidMount() {
    axiosCall().then(organizations => {
      this.setState({
        data: organizations.data,
        isLoading: true
      });
    });
  }

  toggleMenu = () => {
    const { menuOpen } = this.state;
    this.setState({ menuOpen: !menuOpen });
  };

  render() {
    const { title, isMobile, search, isLoggedIn, isAdmin } = this.props;
    const { menuOpen, isLoading, data } = this.state;
    if (!isLoading) return <p data-testid="loading">loading...</p>;

    if (!isMobile) {
      return (
        <Wrapper height="4rem">
          <SideDiv position={isAdmin ? "space-between" : "flex-start"}>
            <NavLink to={SEARCH_URL}>
              <LogoIcon src={Logo} alt="logo" />
            </NavLink>
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
          {search && (
            <AutosuggestComponent data={data} />
            // <NavSearch>
            //   {/* <NavInput placeholder="Try searching for agencies, payrolls, worksites, or companies..." />
            //   <NavSearchIcon src={SearchIcon} alt="search" /> */}

            // </NavSearch>
          )}
          {menuOpen ? (
            <>
              <SideDiv position="flex-end">
                <ToggleMenu onClick={this.toggleMenu}>
                  <WrapperH2>CLOSE</WrapperH2>
                  <img src={CloseIcon} alt="close" />
                </ToggleMenu>
              </SideDiv>
              <Menu
                isMobile={isMobile}
                isLoggedIn={isLoggedIn}
                toggleMenu={this.toggleMenu}
                isAdmin={isAdmin}
              />
            </>
          ) : (
            <SideDiv position="flex-end">
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
          <SideDiv position="flex-start">
            <Icon src={SearchIcon} alt="search" />
          </SideDiv>
          <WrapperH2>{title && title}</WrapperH2>
          {menuOpen ? (
            <>
              <ToggleMenu onClick={this.toggleMenu}>
                <img src={CloseIcon} alt="close" />
              </ToggleMenu>
              <Menu
                isMobile={isMobile}
                isLoggedIn={isLoggedIn}
                toggleMenu={this.toggleMenu}
                isAdmin={isAdmin}
              />
            </>
          ) : (
            <SideDiv position="flex-end">
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
