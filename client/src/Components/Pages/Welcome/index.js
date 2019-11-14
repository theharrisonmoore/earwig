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
  ButtonsWrpper,
} from "./Welcome.style";

// NAV ROUTES
import {
  // GIVE_REVIEW_URL,
  SEARCH_URL,
} from "../../../constants/naviagationUrls";
import { organizations } from "../../../theme";

export default class Welcome extends Component {
  render() {
    const { isLoggedIn } = this.props;

    return (
      <Layout type="side">
        <Wrapper>
          <Body>
            <Header>
              <Title>
                Find out what you’re getting into before you get into it!
              </Title>
            </Header>
            <ContentWrapper>
              {/* this should be extracted to a common component */}
              {!isLoggedIn ? (
                <Subtitle>
                  Without an account, you can still read reviews & ratings,
                  although the data is limited
                </Subtitle>
              ) : (
                <Subtitle>
                  Give reviews!
                  <br /> Read reviews!
                  <br /> Be heard!
                </Subtitle>
              )}
              <ButtonsWrpper>
                <div>
                  <Link to={SEARCH_URL.replace(":category?", "agency")}>
                    <Button
                      margin="0.5rem 0"
                      styleType="primary"
                      text="Agencies"
                      backgroundColor={organizations.agency.primary}
                      style={{ minWidth: "8.5rem" }}
                    />
                  </Link>
                  <Link to={SEARCH_URL.replace(":category?", "payroll")}>
                    <Button
                      margin="0.5rem 0"
                      styleType="primary"
                      text="Payrolls"
                      backgroundColor={organizations.payroll.primary}
                      style={{ minWidth: "8.5rem" }}
                    />
                  </Link>
                </div>
                <div>
                  <Link to={SEARCH_URL.replace(":category?", "worksite")}>
                    <Button
                      margin="0.5rem 0"
                      styleType="primary"
                      text="Worksites"
                      backgroundColor={organizations.worksite.primary}
                      style={{ minWidth: "8.5rem" }}
                    />
                  </Link>
                  <Link to={SEARCH_URL.replace(":category?", "company")}>
                    <Button
                      margin="0.5rem 0"
                      styleType="primary"
                      text="companies"
                      backgroundColor={organizations.company.primary}
                      style={{ minWidth: "8.5rem" }}
                    />
                  </Link>
                </div>
              </ButtonsWrpper>
            </ContentWrapper>
          </Body>
        </Wrapper>
      </Layout>
    );
  }
}
