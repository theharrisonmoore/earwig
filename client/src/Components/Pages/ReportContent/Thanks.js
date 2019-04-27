import React, { Component } from "react";

import {
  Wrapper,
  ContentWrapper,
  MainIcon,
  SubTitle,
  SmallParagraph,
  Iframe,
  LargeParagraph,
  TextArea,
  Button,
  PageTitle,
  Devider,
  BoldLink,
  BottomFixedDiv,
  UnderlinedLink
} from "./../../Common/StaticPages.style";

import checkIcon from "./../../../assets/check-icon.svg";

import { COMMUNITY_GUIDELINES_URL } from "./../../../constants/naviagationUrls";

import Select from "./../../Common/Select";

const options = [
  {
    value: "This content violates earwig's guidelines",
    label: "This content violates earwig's guidelines"
  },
  {
    value: "This content contains false information",
    label: "This content contains false information"
  },
  {
    value: "The same person has posted multiple bits of content",
    label: "The same person has posted multiple bits of content"
  },
  {
    value: "This content was posted by management or HR",
    label: "This content was posted by management or HR"
  },
  {
    value: "This content is for the wrong agency/payroll/worksite/company",
    label: "This content is for the wrong agency/payroll/worksite/company"
  },
  {
    value: "I want to comment on this content",
    label: "I want to comment on this content"
  },
  {
    value: "My reason is not listed here",
    label: "My reason is not listed here"
  }
];
export default class Thanks extends Component {
  state = {
    reason: ""
  };

  handleSelect = something => {
    console.log(something);
  };

  render() {
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
          <Button>Okay</Button>
        </BottomFixedDiv>
      </>
    );
  }
}
