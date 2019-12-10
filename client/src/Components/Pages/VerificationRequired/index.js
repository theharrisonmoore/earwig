import React from "react";
import { Link } from "react-router-dom";

import Layout from "../../Common/Layout";

// constants
import { SIGNUP_URL, LOGIN_URL } from "../../../constants/naviagationUrls";

// common component
import Button from "../../Common/Button";

// styles
import {
  HeadlineDiv,
  H2,
  MainDiv,
  AddWrapper,
  SubHeading,
  StyledLink,
} from "../../Common/AddOrganisationPages.style";

export default props => {
  const { match: { params: { category } } = {}, history } = props;

  return (
    <Layout type="side">
      <AddWrapper>
        <MainDiv>
          <HeadlineDiv>
            <H2>
              Hold up! You need to be a verified worker to create a new{" "}
              {category} in our database.
            </H2>
          </HeadlineDiv>
          <SubHeading margin="2rem auto">
            You only need to get verified once :)
          </SubHeading>
          <Link to={SIGNUP_URL} style={{ textAlign: "center" }}>
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
            Already verified?<StyledLink to={LOGIN_URL}> Log in</StyledLink>
          </SubHeading>
        </MainDiv>
      </AddWrapper>
    </Layout>
  );
};
