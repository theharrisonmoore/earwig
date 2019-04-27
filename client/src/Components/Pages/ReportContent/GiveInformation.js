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
  UnderlinedLink,
  ButtonsWrapper,
  SmallButton
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
export default class GiveInformation extends Component {
  state = {
    reason: ""
  };

  handleSelect = something => {
    console.log(something);
  };

  render() {
    return (
      <>
        <SubTitle marginBottom>
          Please give us more information, telling us exactly why you think this
          content needs reporting.
        </SubTitle>
        <SmallParagraph left>
          You’ll find guidance in our
          <BoldLink to={COMMUNITY_GUIDELINES_URL}>
            {" "}
            Community Guidelines
          </BoldLink>
        </SmallParagraph>
        <TextArea placeholder="More information" />

        <BottomFixedDiv>
          <div>
            <ButtonsWrapper>
              <UnderlinedLink as="div">Back</UnderlinedLink>
              <SmallButton>Submit</SmallButton>
            </ButtonsWrapper>
            <UnderlinedLink as="div">Cancel</UnderlinedLink>
          </div>
        </BottomFixedDiv>
      </>
    );
  }
}
