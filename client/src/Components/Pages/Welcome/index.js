import React, { Component } from "react";

import { Link } from "react-router-dom";

// COMMON
import Button from "../../Common/Button";
import Layout from "../../Common/Layout";

// STYLING
import {
  Wrapper,
  Title,
  Subtitle,
  ContentWrapper,
  Header,
  Body,
  ButtonsWrapper,
  LogoContainer,
  Logo
} from "./Welcome.style";

// NAV ROUTES
import {
  // GIVE_REVIEW_URL,
  SEARCH_URL
} from "../../../constants/naviagationUrls";
import { organizations } from "../../../theme";

export default class Welcome extends Component {
  render() {
    const { isLoggedIn } = this.props;

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
              {/* this should be extracted to a common component */}
              {!isLoggedIn ? (
                <Subtitle>
                  Get worker reviews about agencies, payrolls, worksites and
                  companies
                </Subtitle>
              ) : (
                <Subtitle>
                  Give reviews!
                  <br /> Read reviews!
                  <br /> Be heard!
                </Subtitle>
              )}
              <ButtonsWrapper>
                <div>
                  <Link to={SEARCH_URL.replace(":category?", "agency")}>
                    <Button
                      borderRadius="none"
                      margin="0.5rem 0"
                      styleType="primary"
                      text="Agencies"
                      backgroundColor={organizations.agency.primary}
                      style={{ minWidth: "7rem" }}
                    />
                  </Link>
                  <Link to={SEARCH_URL.replace(":category?", "payroll")}>
                    <Button
                      borderRadius="none"
                      margin="0.5rem 0"
                      styleType="primary"
                      text="Payrolls"
                      backgroundColor={organizations.payroll.primary}
                      style={{ minWidth: "7rem" }}
                    />
                  </Link>

                  <Link to={SEARCH_URL.replace(":category?", "worksite")}>
                    <Button
                      borderRadius="none"
                      margin="0.5rem 0"
                      styleType="primary"
                      text="Worksites"
                      backgroundColor={organizations.worksite.primary}
                      style={{ minWidth: "7rem" }}
                    />
                  </Link>
                  <Link to={SEARCH_URL.replace(":category?", "company")}>
                    <Button
                      borderRadius="none"
                      margin="0.5rem 0"
                      styleType="primary"
                      text="Companies"
                      backgroundColor={organizations.company.primary}
                      style={{ minWidth: "7rem" }}
                    />
                  </Link>
                </div>
              </ButtonsWrapper>
              <Subtitle>
                earwig is empowering construction workers to own their work
                culture
              </Subtitle>
            </ContentWrapper>
          </Body>
        </Wrapper>
      </Layout>
    );
  }
}
