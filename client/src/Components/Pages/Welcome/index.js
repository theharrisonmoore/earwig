import React, { Component } from "react";

import { Link } from "react-router-dom";

// COMMON
// import Button from "../../Common/Button";
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
} from "./Welcome.style";

// NAV ROUTES
import {
  // GIVE_REVIEW_URL,
  SEARCH_URL,
} from "../../../constants/naviagationUrls";
import { organizations } from "../../../theme";

const createButtonContent = text => (
  <span>
    {text}
    <br></br>
    <DownArrow />
  </span>
);

export default class Welcome extends Component {
  render() {
    return (
      <Layout type="center">
        <Wrapper>
          <Body>
            <LogoContainer>
              <Logo />
            </LogoContainer>
            <Header>
              <Title>Hello! Welcome to earwig.</Title>
            </Header>
            <ContentWrapper>
              <SubtitleWrapper>
                <Subtitle>
                  Get worker reviews about agencies, payrolls, worksites and
                  companies
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
              <Subtitle>
                earwig is empowering construction workers to own their work
                culture
              </Subtitle>
            </FooterTitle>
          </Body>
        </Wrapper>
      </Layout>
    );
  }
}
