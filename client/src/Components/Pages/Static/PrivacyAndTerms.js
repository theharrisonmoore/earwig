import React, { Component } from "react";
import paperIcon from "../../../assets/paper-icon.svg";
import {
  Wrapper,
  ContentWrapper,
  MainIcon,
  PageTitle,
  LargeLink,
  BlueDiv,
  PurpleDiv,
} from "../../Common/StaticPages.style";

import Layout from "../../Common/Layout";

import {
  COMMUNITY_GUIDELINES_URL,
  TERMS_OF_USE_URL,
  PRIVACY_URL,
  COOKIES_POLICY_URL,
} from "../../../constants/naviagationUrls";

export default class PrivacyAndTerms extends Component {
  render() {
    return (
      <Layout type="side" position="right">
        <Wrapper>
          <ContentWrapper
            style={{ maxWidth: "32rem", margin: "0 auto", paddingTop: "6rem" }}
          >
            <PageTitle>Privacy & terms</PageTitle>
            <MainIcon src={paperIcon} />
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
        </Wrapper>
      </Layout>
    );
  }
}
