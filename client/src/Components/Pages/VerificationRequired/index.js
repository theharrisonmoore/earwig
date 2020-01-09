import React from "react";
import { Link } from "react-router-dom";

import Layout from "../../Common/Layout";

// constants
import {
  SIGNUP_URL,
  LOGIN_URL,
  UPLOAD_VERIFICATION_PHOTO
} from "../../../constants/naviagationUrls";

// common component
import Button from "../../Common/Button";

// styles
import {
  HeadlineDiv,
  H2,
  MainDiv,
  AddWrapper,
  SubHeading,
  StyledLink
} from "../../Common/AddOrganisationPages.style";

export default props => {
  const {
    match: { params: { category, name } } = {},
    history,
    level,
    location
  } = props;

  console.log(location);

  return (
    <Layout type="side">
      <AddWrapper>
        <MainDiv>
          <HeadlineDiv>
            <H2>Hold up! You need to be a verified worker to give a review.</H2>
          </HeadlineDiv>
          <SubHeading margin="2rem auto">
            You only need to get verified once :)
          </SubHeading>
          <Link
            to={{
              pathname: level >= 1 ? UPLOAD_VERIFICATION_PHOTO : SIGNUP_URL,
              state:
                location.state && location.state.redirectToReview
                  ? location.state
                  : {
                      category,
                      name,
                      redirectToCreateProfile: true
                    }
            }}
            style={{ textAlign: "center" }}
          >
            <Button
              margin="2rem auto"
              styleType="primary"
              text="Get verified now"
            />
          </Link>

          <Button
            margin="0 auto"
            styleType="secondary"
            text="Cancel"
            onClick={history.goBack}
          />
          <SubHeading margin="6rem auto 4rem">
            Already verified?{" "}
            <StyledLink
              to={{
                pathname: LOGIN_URL,
                state: {
                  category,
                  name,
                  redirectToCreateProfile: true
                }
              }}
            >
              Log in
            </StyledLink>
          </SubHeading>
        </MainDiv>
      </AddWrapper>
    </Layout>
  );
};
