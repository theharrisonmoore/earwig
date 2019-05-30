import React, { Component } from "react";
import paperIcon from "./../../../assets/paper-icon.svg";
import {
  Wrapper,
  ContentWrapper,
  MainIcon,
  SubTitle,
  SmallParagraph,
  PageTitle,
  LargeLink,
  Ol,
  Li
} from "./../../Common/StaticPages.style";

import {
  COMMUNITY_GUIDELINES_URL,
  TERMS_OF_USE_URL,
  PRIVACY_URL,
  COOKIES_POLICY_URL
} from "../../../constants/naviagationUrls";

export default class PrivacyAndTerms extends Component {
  render() {
    return (
      <Wrapper>
        <ContentWrapper>
          <PageTitle>Privacy & terms</PageTitle>
          <MainIcon src={paperIcon} />
          <LargeLink
            to={COMMUNITY_GUIDELINES_URL}
            style={{ marginTop: "40px" }}
          >
            earwig Community Guidelines
          </LargeLink>
          <LargeLink to={TERMS_OF_USE_URL}>Terms of Use</LargeLink>
          <LargeLink to={PRIVACY_URL}>Privacy Policy</LargeLink>
          <LargeLink to={COOKIES_POLICY_URL}>Cookies Policy</LargeLink>
        </ContentWrapper>
      </Wrapper>
    );
  }
}
