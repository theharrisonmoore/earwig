import React from "react";
import { Link } from "react-router-dom";

import Layout from "../../Common/Layout";

// constants
import {
  SIGNUP_URL,
  UPLOAD_VERIFICATION_PHOTO,
} from "../../../constants/naviagationUrls";

// common component
import Button from "../../Common/Button";

// styles
import {
  HeadlineDiv,
  H2,
  MainDiv,
  AddWrapper,
} from "../../Common/AddOrganisationPages.style";

export default props => {
  const {
    match: { params: { category, name } } = {},
    history,
    level,
    location,
  } = props;

  return (
    <Layout type="side">
      <AddWrapper>
        <MainDiv>
          <HeadlineDiv>
            <H2>
              Hold up! You need to login or create an account to add a firm or site to the database.
            </H2>
          </HeadlineDiv>
          <Link
            to={{
              pathname: level >= 1 ? UPLOAD_VERIFICATION_PHOTO : SIGNUP_URL,
              state:
                location.state && location.state.redirectToReview
                  ? location.state
                  : {
                      category,
                      name,
                      redirectToCreateProfile: true,
                    },
            }}
            style={{ textAlign: "center" }}
          >
            <Button margin="2rem auto" styleType="primary" text="Continue to Login" />
          </Link>

          <Button
            margin="0 auto"
            styleType="secondary"
            text="Cancel"
            onClick={history.goBack}
          />
        </MainDiv>
      </AddWrapper>
    </Layout>
  );
};
