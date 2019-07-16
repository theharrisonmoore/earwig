import React, { Component } from "react";

// COMMON
import Button from "./../../Common/Button";
import Icon from "./../../Common/Icon/Icon";

// STYLING
import {
  Wrapper,
  Title,
  Subtitle,
  ContentWrapper,
  PurpleDiv,
  StyledLink
} from "./Welcome.style.js";

// NAV ROUTES
import {
  SEARCH_URL,
  ASK_QUESTION_URL,
  JOBS_URL
} from "./../../../constants/naviagationUrls.js";

export default class Welcome extends Component {
  render() {
    return (
      <Wrapper>
        <ContentWrapper>
          <Title>
            Thanks! <br />
            Welcome to earwig
          </Title>
          <Subtitle>What would you like to do?</Subtitle>
          <StyledLink to={`${SEARCH_URL}/review`}>
            <Button alignContent left margin="0 0 1.5rem 0">
              <Icon
                icon="starComment"
                margin="0 1rem 0 0"
                width="20px"
                height="20px"
              />
              Give a review
            </Button>
          </StyledLink>
          <StyledLink to={SEARCH_URL}>
            <Button alignContent left margin="0 0 1.5rem 0">
              <Icon
                icon="search"
                margin="0 1rem 0 0"
                width="20px"
                height="20px"
              />
              Read reviews & ratings
            </Button>
          </StyledLink>
          <StyledLink to={ASK_QUESTION_URL}>
            <Button alignContent left disabled margin="0 0 1.5rem 0">
              <Icon
                icon="raiseHand"
                margin="0 1rem 0 0"
                width="20px"
                height="20px"
              />
              Ask workers a question
            </Button>
          </StyledLink>
          <StyledLink to={JOBS_URL}>
            <Button alignContent left disabled margin="0 0 1.5rem 0">
              <Icon
                icon="jobBoard"
                margin="0 1rem 0 0"
                width="20px"
                height="20px"
              />
              Find a job
            </Button>
          </StyledLink>
        </ContentWrapper>
        <PurpleDiv />
      </Wrapper>
    );
  }
}
