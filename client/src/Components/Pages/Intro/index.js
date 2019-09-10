import React, { Component } from "react";

import { WELCOME_URL } from "./../../../constants/naviagationUrls";

import { Link } from "react-router-dom";

import {
  IntroWrapper,
  Iframe,
  VideoContainer,
  YellowDiv,
  BlackDiv,
  PurpleDiv,
  BlueDiv,
  Title,
  Logo
} from "./Intro.style";

import logo from "./../../../assets/logo.svg";
import Button from "./../../Common/Button";

export default class Intro extends Component {
  render() {
    return (
      <IntroWrapper>
        <VideoContainer>
          <Logo src={logo} alt="logo" />
          <Title>An important message for workers</Title>
          <Iframe
            src="https://www.youtube.com/embed/nV2Wbg3pMPE?controls=0"
            frameBorder="0"
            allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen
          />
          <Link to={WELCOME_URL}>
            <Button>Got it</Button>
          </Link>
        </VideoContainer>
        <YellowDiv backgroundColor="yellow" />
        <PurpleDiv backgroundColor="red" />
        <BlackDiv backgroundColor="black" />
        <BlueDiv backgroundColor="blue" />
      </IntroWrapper>
    );
  }
}
