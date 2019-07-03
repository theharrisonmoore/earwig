import React, { Component } from "react";

import {
  MainIcon,
  SubTitle,
  SmallParagraph
} from "./../../Common/StaticPages.style";

import Button from "./../../Common/Button";

import checkIcon from "./../../../assets/check-icon.svg";

export default class Thanks extends Component {
  render() {
    const { history } = this.props;
    return (
      <div style={{ paddingTop: "60px" }}>
        <MainIcon src={checkIcon} />
        <SubTitle marginBottom center>
          Thanks for your report
        </SubTitle>
        <SmallParagraph center>
          We’ll get back to you via email as soon as we can.
        </SmallParagraph>

        <Button onClick={history.goBack}>Okay</Button>
      </div>
    );
  }
}
