import React, { Component } from "react";

// COMMON
import Button from "../../Common/Button";
import Icon from "../../Common/Icon/Icon";

// STYLING
import {
  Wrapper,
  Title,
  Subtitle,
  ContentWrapper,
  PurpleDiv,
  StyledLink,
  HintText,
  Text,
  ButtonText,
  ComingSoon,
} from "./Welcome.style";

// NAV ROUTES
import {
  // GIVE_REVIEW_URL,
  SEARCH_URL,
  ASK_QUESTION_URL,
  JOBS_URL,
  UPLOAD_VERIFICATION_PHOTO,
} from "../../../constants/naviagationUrls";

export default class Welcome extends Component {
  render() {
    const { verified, awaitingReview, isLoggedIn } = this.props;

    return (
      <Wrapper>
        <ContentWrapper>
          <Title>
            Thanks! <br />
            Welcome to earwig
          </Title>
          {/* this should be extracted to a common component */}
          {!isLoggedIn ? (
            <Subtitle>
              Without an account, you can still read reviews & ratings, although
              the data is limited
            </Subtitle>
          ) : (
            <Subtitle>What would you like to do?</Subtitle>
          )}

          {!isLoggedIn ? (
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
          ) : (
            <>
              <StyledLink
                to={
                  verified || awaitingReview
                    ? `${SEARCH_URL}/review`
                    : UPLOAD_VERIFICATION_PHOTO
                }
              >
                <Button alignContent left margin="0 0 0 0">
                  <Icon
                    icon="starComment"
                    margin="0 1rem 0 0"
                    width="20px"
                    height="20px"
                  />
                  <ButtonText>
                    <Text>Give a review</Text>
                    {!verified && !awaitingReview && (
                      <HintText>(Click here to get verified first)</HintText>
                    )}
                  </ButtonText>
                </Button>
              </StyledLink>
              <StyledLink
                // to={
                //   verified || awaitingReview
                //     ? `${SEARCH_URL}/profile`
                //     : SEARCH_URL
                // }
                to={SEARCH_URL}
              >
                <Button alignContent left margin="0 0 0 0">
                  <Icon
                    icon="search"
                    margin="0 1rem 0 0"
                    width="20px"
                    height="20px"
                  />
                  Read reviews & ratings
                </Button>
              </StyledLink>
              <StyledLink
                to={
                  verified || awaitingReview
                    ? ASK_QUESTION_URL
                    : UPLOAD_VERIFICATION_PHOTO
                }
                disabled
              >
                <Button alignContent left disabled margin="0 0 0 0">
                  <Icon
                    icon="raiseHand"
                    margin="0 1rem 0 0"
                    width="20px"
                    height="20px"
                  />
                  <ButtonText>
                    <Text>
                      Ask workers a question
                      <ComingSoon>(coming soon)</ComingSoon>
                    </Text>
                    {/* will go in once this feature is built */}
                    {/* {!verified && !awaitingReview && (
                      <HintText>(Click here to get verified first)</HintText>
                    )} */}
                  </ButtonText>
                </Button>
              </StyledLink>
              <StyledLink
                to={
                  verified || awaitingReview
                    ? JOBS_URL
                    : UPLOAD_VERIFICATION_PHOTO
                }
                disabled
              >
                <Button alignContent left disabled margin="0 0 1.5rem 0">
                  <Icon
                    icon="jobBoard"
                    margin="0 1rem 0 0"
                    width="20px"
                    height="20px"
                  />
                  <ButtonText>
                    <Text>
                      Find a job <ComingSoon>(coming soon)</ComingSoon>
                    </Text>
                    {/* will go in once this feature is built */}
                    {/* {!verified && !awaitingReview && (
                      <HintText>(Click here to get verified first)</HintText>
                    )} */}
                  </ButtonText>
                </Button>
              </StyledLink>
            </>
          )}
        </ContentWrapper>
        <PurpleDiv />
      </Wrapper>
    );
  }
}
