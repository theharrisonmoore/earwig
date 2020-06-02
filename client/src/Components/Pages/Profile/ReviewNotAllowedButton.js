import React from "react";

import { withRouter } from "react-router-dom";

import Button from "../../Common/Button";
import { SIGNUP_URL } from "../../../constants/naviagationUrls";
import { AccountLink, AccountText } from "./Profile.style";

const ReviewNotAllowedButton = ({ category, sticky, match, header }) => {
  const { params: { profileID } = {} } = match;

  return (
    <AccountLink
      sticky={sticky}
      header={header}
      to={{
        pathname: SIGNUP_URL,
        state: { orgId: profileID, redirectToProfile: true },
      }}
      category={category}
    >
      {header && <AccountText>Login or create an account to review this {category}.</AccountText>}
      <Button text="Continue to Login" styleType="primary" margin="1rem auto" />
    </AccountLink>
  );
};

export default withRouter(ReviewNotAllowedButton);
