import React, { Component } from "react";

import {
  MainIcon,
  SubTitle,
  SmallParagraph,
  Button,
  PageTitle,
  BottomFixedDiv
} from "./../../Common/StaticPages.style";

import checkIcon from "./../../../assets/check-icon.svg";

export default class Thanks extends Component {
  render() {
    const { handleCancel } = this.props;
    return (
      <>
        <PageTitle>Report this content</PageTitle>
        <MainIcon src={checkIcon} />
        <SubTitle marginBottom center>
          Thanks for your report
        </SubTitle>
        <SmallParagraph center>
          We’ll get back to you via email as soon as we can.
        </SmallParagraph>

        <BottomFixedDiv>
          <Button onClick={handleCancel}>Okay</Button>
        </BottomFixedDiv>
      </>
    );
  }
}
