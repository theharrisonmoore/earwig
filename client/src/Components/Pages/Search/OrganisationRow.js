import React from "react";

import { Rate } from "antd";

import PopOverWrapper from "./PopOverWrapper";
import Icon from "../../Common/Icon/Icon";

import { organizations } from "../../../theme";

import {
  ProfileLink,
  SuggestionBox,
  InnerDivSuggestions,
  SymbolDiv,
  OrganisationDetailsDiv,
  ReviewDetailsDiv,
} from "./Search.style";

// renders individual suggestions
const Suggestion = props => {
  // check if no suggestion is available and returns so that renderSuggestionsContainer function is still being called (gets deactivated otherwise)

  // also need to check if button to see if we make it a link or not
  // THIS RELATES TO THE ORGCHECK COMPONENT
  const {
    isButton,
    storeOrg,
    noIcon,
    orgsIds,
    target,
    organisation,
    withoutBorder,
  } = props;

  const url =
    target === "profile"
      ? `/profile/${organisation._id}`
      : `/organization/${organisation._id}/review`;

  const disabled =
    target === "review" && orgsIds && orgsIds.includes(organisation._id);

  return (
    <PopOverWrapper disabled={disabled}>
      <ProfileLink
        as={isButton || disabled ? "div" : undefined}
        to={isButton || disabled ? undefined : url}
        onClick={() => !disabled && isButton && storeOrg(organisation)}
      >
        <SuggestionBox
          orgType={organisation.category}
          withoutBorder={withoutBorder}
        >
          <InnerDivSuggestions>
            <SymbolDiv>
              {!noIcon && (
                <Icon
                  icon="search"
                  height="1.5rem"
                  width="1.5rem"
                  margin="0 1rem 0 0"
                />
              )}
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
