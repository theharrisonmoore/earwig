import React from "react";

import { withRouter } from "react-router-dom";

import Button from "../../Common/Button";
import { SIGNUP_URL } from "../../../constants/naviagationUrls";
import { AccountLink } from "./Profile.style";

const ReviewNotAllowedButton = ({ category, location, sticky }) => {
  return (
    <AccountLink
      sticky={sticky}
      to={{
        pathname: SIGNUP_URL,
        state: { from: location },
      }}
      category={category}
    >
      <Button
        text="Sign up to see more"
        styleType="primary"
        margin="1rem auto"
      />
    </AccountLink>
  );
};

export default withRouter(ReviewNotAllowedButton);
