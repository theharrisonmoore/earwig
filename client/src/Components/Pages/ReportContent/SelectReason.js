import React, { Component } from "react";

import {
  MainIcon,
  SubTitle,
  SmallParagraph,
  BoldLink,
  SelectWrapper,
  TextArea
} from "./../../Common/StaticPages.style";

import Button from "./../../Common/Button";

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

  render() {
    const {
      handleSelect,
      handleTextAreaChange,
      description,
      handleSubmit,
      loading
    } = this.props;
    return (
      <div style={{ paddingTop: "60px" }}>
        <MainIcon src={flagIcon} />
        <SubTitle
          marginBottom
          style={{ fontSize: "1.75rem", paddingTop: "2rem" }}
        >
          Why do you want to report this piece of content?
        </SubTitle>
        <SmallParagraph left>
          You’ll find guidance in our
          <BoldLink to={COMMUNITY_GUIDELINES_URL}>
            {" "}
            Community&nbsp;Guidelines
          </BoldLink>
        </SmallParagraph>
        <SelectWrapper>
          <Select
            options={options}
            handleChange={handleSelect}
            placeholder="Choose a reason"
          />
        </SelectWrapper>
        <SubTitle marginBottom style={{ fontSize: "1rem", paddingTop: "0" }}>
          Please give us more information, telling us exactly why you think this
          content needs reporting.
        </SubTitle>
        <TextArea
          placeholder="More information"
          onChange={handleTextAreaChange}
          value={description}
        />
        <Button onClick={handleSubmit} loading={loading}>
          Send report
        </Button>
      </div>
    );
  }
}
