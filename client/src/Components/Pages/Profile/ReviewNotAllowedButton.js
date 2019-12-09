import React from "react";

import { withRouter } from "react-router-dom";

import Button from "../../Common/Button";
import { SIGNUP_URL } from "../../../constants/naviagationUrls";
import { AccountLink } from "./Profile.style";

const ReviewNotAllowedButton = ({ category, sticky, match }) => {
  const { params: { profileID } = {} } = match;

  return (
    <AccountLink
      sticky={sticky}
      to={{
        pathname: SIGNUP_URL,
        state: { orgId: profileID, redirectToProfile: true },
      }}
      category={category}
    >
      <Button text="Sign up for more" styleType="primary" margin="1rem auto" />
    </AccountLink>
  );
};

export default withRouter(ReviewNotAllowedButton);
