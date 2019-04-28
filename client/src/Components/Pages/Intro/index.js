import React, { Component } from "react";

import { SEARCH_URL } from "./../../../constants/naviagationUrls";

import { Link } from "react-router-dom";

import { IntroWrapper, Iframe, Button, VideoContainer } from "./Intro.style";

import logo from "./../../../assets/logo.svg";

export default class Intro extends Component {
  render() {
    return (
      <IntroWrapper>
        <img src={logo} alt="logo" />
        <VideoContainer>
          <Iframe
            src="https://www.youtube.com/embed/OCWj5xgu5Ng"
            frameBorder="0"
          />
          <Link to={SEARCH_URL}>
            <Button>Skip</Button>
          </Link>
        </VideoContainer>
      </IntroWrapper>
    );
  }
}
