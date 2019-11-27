import React, { Component } from "react";
import {
  Wrapper,
  ContentWrapper,
  LargeLink,
  BlueDiv,
  PurpleDiv,
} from "../../Common/StaticPages.style";

import {
  COMMUNITY_GUIDELINES_URL,
  TERMS_OF_USE_URL,
  PRIVACY_URL,
  COOKIES_POLICY_URL,
} from "../../../constants/naviagationUrls";

export default class PrivacyAndTerms extends Component {
  render() {
    return (
      <Wrapper>
        <PurpleDiv width="25%" />
        <ContentWrapper
          width="50%"
          style={{ maxWidth: "32rem", margin: "0 auto", paddingTop: "6rem" }}
        >
          <LargeLink
            primary
            target="_blank"
            to={COMMUNITY_GUIDELINES_URL}
            style={{ marginTop: "40px" }}
          >
            earwig Community Guidelines
          </LargeLink>
          <LargeLink primary target="_blank" to={TERMS_OF_USE_URL}>
            Terms of Use
          </LargeLink>
          <LargeLink primary target="_blank" to={PRIVACY_URL}>
            Privacy Policy
          </LargeLink>
          <LargeLink primary target="_blank" to={COOKIES_POLICY_URL}>
            Cookies Policy
          </LargeLink>
        </ContentWrapper>
        <BlueDiv width="25%" />
      </Wrapper>
    );
  }
}
