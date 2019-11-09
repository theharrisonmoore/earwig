import React, { Component } from "react";

// COMMON
import Button from "../../Common/Button";

// STYLING
import {
  Wrapper,
  Title,
  Subtitle,
  ContentWrapper,
  PurpleDiv,
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
            <Button
              left
              margin="0.5rem 0"
              styleType="primary"
              text="Read reviews & ratings"
              onClick={() => this.props.history.push(SEARCH_URL)}
            />
          ) : (
            <>
              <Button
                margin="0.5rem 0"
                styleType="primary"
                text="Give a review"
                onClick={() => {
                  verified || awaitingReview
                    ? this.props.history.push(`${SEARCH_URL}/review`)
                    : this.props.history.push(UPLOAD_VERIFICATION_PHOTO);
                }}
              />
              <Button
                margin="0.5rem 0"
                styleType="primary"
                text="Read reviews & ratings"
                onClick={() => this.props.history.push(SEARCH_URL)}
              />
              <Button
                margin="0.5rem 0"
                disabled
                styleType="primary"
                text="Ask workers a question (coming soon)"
                onClick={() => {
                  verified || awaitingReview
                    ? this.props.history.push(ASK_QUESTION_URL)
                    : this.props.history.push(UPLOAD_VERIFICATION_PHOTO);
                }}
              />
              <Button
                margin="0.5rem 0"
                disabled
                styleType="primary"
                text="Find a job (coming soon)"
                onClick={() => {
                  verified || awaitingReview
                    ? this.props.history.push(JOBS_URL)
                    : this.props.history.push(UPLOAD_VERIFICATION_PHOTO);
                }}
              />
            </>
          )}
        </ContentWrapper>
        <PurpleDiv />
      </Wrapper>
    );
  }
}
