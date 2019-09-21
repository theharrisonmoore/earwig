import React, { Component } from "react";

import {
  MainIcon,
  SmallParagraph,
  BoldLink,
  SelectWrapper,
  TextArea,
  PageTitle,
  LargeParagraph
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

  decidePaddingTop = mobileWidth => {
    let height;
    mobileWidth ? (height = "80px") : (height = "100px");
    return height;
  };

  render() {
    const {
      handleSelect,
      handleTextAreaChange,
      description,
      handleSubmit,
      isMobile,
      loading
    } = this.props;

    return (
      <div style={{ paddingTop: this.decidePaddingTop(isMobile) }}>
        <MainIcon src={flagIcon} />
        <PageTitle
          style={{
            fontSize: "1.75rem",
            paddingTop: "2rem",
            marginBottom: "2rem"
          }}
        >
          Why do you want to report this piece of content?
        </PageTitle>
        <SmallParagraph left>
          You’ll find guidance in our
          <BoldLink to={COMMUNITY_GUIDELINES_URL} target="_blank">
            {" "}
            Community&nbsp;Guidelines
          </BoldLink>
        </SmallParagraph>
        <SelectWrapper>
          <Select
            options={options}
            handleChange={handleSelect}
            placeholder="Choose a reason"
            value={this.props.reason}
            dropdownClassName="full-text-select"
          />
        </SelectWrapper>
        <LargeParagraph
          marginBottom
          style={{ fontSize: "1rem", paddingTop: "0" }}
        >
          Please give us more information, telling us exactly why you think this
          content needs reporting.
        </LargeParagraph>
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
