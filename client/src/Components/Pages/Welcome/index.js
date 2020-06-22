import React, { Component } from "react";

import { Link } from "react-router-dom";

// COMMON
import Layout from "../../Common/Layout";

// STYLING
import {
  Wrapper,
  Title,
  Subtitle,
  SubtitleWrapper,
  ContentWrapper,
  Header,
  Body,
  ButtonsWrapper,
  LogoContainer,
  Logo,
  DownArrow,
  FooterTitle,
  Button,
  Explanation,
} from "./Welcome.style";

// NAV ROUTES
import {
  // GIVE_REVIEW_URL,
  SEARCH_URL,
} from "../../../constants/naviagationUrls";
import { organizations } from "../../../theme";

const createButtonContent = (text) => (
  <span>
    {text}
    <br></br>
    <DownArrow />
  </span>
);

export default class Welcome extends Component {
  render() {
    return (
      <Layout type="center" maxWidth="100%">
        <Wrapper>
          <Body>
            <LogoContainer>
              <Logo />
            </LogoContainer>
            <Header>
              <Title>Let&apos;s find where you work</Title>
              <Explanation>
                If you’re looking for new jobs, you know how helpful reviews
                from real workers like you can be. earwig is where workers help
                each other find the best jobs.
              </Explanation>
            </Header>
            <ContentWrapper>
              <SubtitleWrapper>
                <Subtitle>
                  Pick a category and we’ll show you a list of firms or sites to
                  review
                  <span role="img" aria-label="point down">
                    👇
                  </span>
                </Subtitle>
              </SubtitleWrapper>
              <ButtonsWrapper>
                <Link to={SEARCH_URL.replace(":category?", "agency")}>
                  <Button backgroundColor={organizations.agency.primary}>
                    {createButtonContent("Agencies")}
                  </Button>
                </Link>
                <Link to={SEARCH_URL.replace(":category?", "payroll")}>
                  <Button backgroundColor={organizations.payroll.primary}>
                    {createButtonContent("Payrolls")}
                  </Button>
                </Link>

                <Link to={SEARCH_URL.replace(":category?", "worksite")}>
                  <Button backgroundColor={organizations.worksite.primary}>
                    {createButtonContent("Worksites")}
                  </Button>
                </Link>
                <Link to={SEARCH_URL.replace(":category?", "company")}>
                  <Button backgroundColor={organizations.company.primary}>
                    {createButtonContent("Companies")}
                  </Button>
                </Link>
              </ButtonsWrapper>
            </ContentWrapper>
            <FooterTitle>
              <Explanation>
                Tip! You can{" "}
                <span style={{ fontWeight: "500" }}>create new</span> firms and
                sites in the database if they’re not already listed
              </Explanation>
            </FooterTitle>
          </Body>
        </Wrapper>
      </Layout>
    );
  }
}
