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

import SelectReason from "./SelectReason";
import GiveInformation from "./GiveInformation";
import Thanks from "./Thanks";
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
export default class ReportContent extends Component {
  state = {
    reason: ""
  };

  handleSelect = something => {
    console.log(something);
  };

  render() {
    return (
      <Wrapper>
        <ContentWrapper>
          <SelectReason />
          <GiveInformation />
          <Thanks />
        </ContentWrapper>
      </Wrapper>
    );
  }
}
