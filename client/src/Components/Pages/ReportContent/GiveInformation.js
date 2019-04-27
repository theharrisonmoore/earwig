import React, { Component } from "react";

import {
  SubTitle,
  SmallParagraph,
  TextArea,
  BoldLink,
  BottomFixedDiv,
  UnderlinedLink,
  ButtonsWrapper,
  SmallButton
} from "./../../Common/StaticPages.style";

import { COMMUNITY_GUIDELINES_URL } from "./../../../constants/naviagationUrls";

export default class GiveInformation extends Component {
  render() {
    const {
      handleCancel,
      handleMove,
      handleTextAreaChange,
      description,
      handleSubmit
    } = this.props;

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
        <TextArea
          placeholder="More information"
          onChange={handleTextAreaChange}
          value={description}
        />

        <BottomFixedDiv>
          <div>
            <ButtonsWrapper>
              <UnderlinedLink as="div" onClick={() => handleMove(-1)}>
                Back
              </UnderlinedLink>
              <SmallButton onClick={handleSubmit}>Submit</SmallButton>
            </ButtonsWrapper>
            <UnderlinedLink as="div" onClick={handleCancel}>
              Cancel
            </UnderlinedLink>
          </div>
        </BottomFixedDiv>
      </>
    );
  }
}
