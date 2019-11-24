import React from "react";

import Button from "../../Common/Button";
import { SIGNUP_URL } from "../../../constants/naviagationUrls";

import { AccountLink } from "./Profile.style";

const SignUpSection = ({ category, location }) => {
  return (
    <AccountLink
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

export default SignUpSection;
