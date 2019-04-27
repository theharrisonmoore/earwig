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

import flagIcon from "./../../../assets/flag.svg";

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
export default class SelectReason extends Component {
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
        <MainIcon src={flagIcon} />
        <SubTitle marginBottom>
          Why do you want to report this content?
        </SubTitle>
        <SmallParagraph left>
          You’ll find guidance in our
          <BoldLink to={COMMUNITY_GUIDELINES_URL}>
            {" "}
            Community Guidelines
          </BoldLink>
        </SmallParagraph>
        <Select
          options={options}
          handleChange={this.handleSelect}
          placeholder="Choose a reason"
        />
        <BottomFixedDiv>
          <ContentWrapper>
            <Button>Next</Button>
          </ContentWrapper>
          <UnderlinedLink as="div">Cancel</UnderlinedLink>
        </BottomFixedDiv>
        {/* <TextArea placeholder="More information" /> */}
      </>
    );
  }
}
