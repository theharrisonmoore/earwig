import React from "react";
import { Link } from "react-router-dom";

import Layout from "../../Common/Layout";

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
  const { match: { params: { category, name } } = {} } = props;

  return (
    <Layout type="side">
      <AddWrapper>
        <MainDiv>
          <HeadlineDiv>
            <H2>
              Great! Now please review {name} to finish adding it to the
              database
            </H2>
          </HeadlineDiv>

          <Link
            // ADD_REVIEW_TO_NEW_PROFILE
            to={`/organization/review/new/${category}/${name}`}
            style={{ textAlign: "center" }}
          >
            <Button
              margin="2rem auto"
              styleType="primary"
              text="Start your review"
            />
          </Link>
        </MainDiv>
      </AddWrapper>
    </Layout>
  );
};
