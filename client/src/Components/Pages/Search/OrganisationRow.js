import React from "react";

import { Rate } from "antd";

import PopOverWrapper from "./PopOverWrapper";
import Icon from "../../Common/Icon/Icon";

import { organizations, colors } from "../../../theme";

import {
  ProfileLink,
  SuggestionBox,
  InnerDivSuggestions,
  SymbolDiv,
  OrganisationDetailsDiv,
  ReviewDetailsDiv,
  LogoWrapper,
} from "./Search.style";

// renders the organisation logo
const renderLogo = orgType => {
  if (orgType === "worksite") {
    return (
      <LogoWrapper orgColor={organizations[orgType].primary}>
        <Icon icon="worksite" width="24" height="24" color={colors.white} />
      </LogoWrapper>
    );
  }
  return (
    <LogoWrapper orgColor={organizations[orgType].primary}>
      <p>LOGO</p>
    </LogoWrapper>
  );
};

// renders individual suggestions
const Suggestion = props => {
  // check if no suggestion is available and returns so that renderSuggestionsContainer function is still being called (gets deactivated otherwise)

  // also need to check if button to see if we make it a link or not
  // THIS RELATES TO THE ORGCHECK COMPONENT
  const {
    isButton,
    storeOrg,
    searchIcon,
    organisation,
    withoutBorder,
    logoIcon,
  } = props;

  const url = `/profile/${organisation._id}`;

  return (
    <PopOverWrapper>
      <ProfileLink
        as={isButton}
        to={isButton || url}
        onClick={() =>
          storeOrg instanceof Function ? storeOrg(organisation) : undefined
        }
      >
        <SuggestionBox
          orgType={organisation.category}
          withoutBorder={withoutBorder}
        >
          <InnerDivSuggestions>
            <SymbolDiv>
              {searchIcon && (
                <Icon
                  icon="search"
                  height="1.5rem"
                  width="1.5rem"
                  margin="0 1rem 0 0"
                />
              )}
              {logoIcon && renderLogo(organisation.category)}
            </SymbolDiv>
            <OrganisationDetailsDiv>
              <h3
                style={{
                  color: organizations[organisation.category].primary,
                  textTransform: "capitalize",
                  textDecorationLine: "underline",
                  marginBottom: 0,
                }}
              >
                {organisation.name}
              </h3>
              <ReviewDetailsDiv>
                <Rate
                  disabled
                  value={organisation.avgRatings || organisation.value || 0}
                  style={{
                    fontSize: "0.75rem",
                    textTransform: "capitalize",
                  }}
                  className="last-reviewed-star-rate"
                />
                <p>{organisation.totalReviews} reviews</p>
              </ReviewDetailsDiv>
            </OrganisationDetailsDiv>
          </InnerDivSuggestions>
        </SuggestionBox>
      </ProfileLink>
    </PopOverWrapper>
  );
};

export default Suggestion;
