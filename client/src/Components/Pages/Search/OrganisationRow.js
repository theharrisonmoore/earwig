import React from "react";
import { Rate } from "antd";
import { FBPixelTrack } from "../../../FBPixel";

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

const clickOnOrg = ({ name, category, searchText, id }) => {
  FBPixelTrack("Search", {
    search_string: searchText,
    content_name: name,
    content_category: category,
    content_ids: [id],
  });
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
    category,
    searchText,
  } = props;

  const url = `/profile/${organisation._id}`;

  return (
    <PopOverWrapper>
      <ProfileLink
        as={isButton}
        to={isButton || url}
        onClick={() => {
          clickOnOrg({
            name: organisation.name,
            category,
            searchText,
            id: organisation._id,
          });
          if (storeOrg instanceof Function) {
            storeOrg(organisation);
          }
          return undefined;
        }}
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
            <div style={{ margin: "auto 1.5rem auto auto" }}>
              <Icon
                icon="right"
                height="1.375rem"
                width="1.375rem"
                color={organizations[organisation.category].primary}
              />
            </div>
          </InnerDivSuggestions>
        </SuggestionBox>
      </ProfileLink>
    </PopOverWrapper>
  );
};

export default Suggestion;
