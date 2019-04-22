import React, { Component } from "react";

import { SEARCH_URL } from "../../../constants/naviagationUrls";
// styles
import {
  HeadlineDiv,
  H2,
  RowDiv,
  ItemDiv,
  LogosContainer,
  FooterDiv,
  H3,
  MainDiv,
  AddWrapper,
  ProfileLink,
  AddProfileLink
} from "./Search.style";
import { SVGCreator } from "../../../helpers";
import { ADD_PROFILE_START_REVIEW_URL } from "../../../constants/naviagationUrls";

export default class AddProfileSelection extends Component {
  render() {
    const { name } = this.props.location.state;

    return (
      <AddWrapper>
        <MainDiv>
          <HeadlineDiv>
            <H2>{name} is a ...</H2>
          </HeadlineDiv>
          <LogosContainer>
            <RowDiv>
              <ItemDiv>
                <AddProfileLink
                  to={{
                    pathname: `${ADD_PROFILE_START_REVIEW_URL}`,
                    state: {
                      name: `${name}`,
                      category: "agency"
                    }
                  }}
                >
                  {SVGCreator("agency-category", "125px", "100%")}
                </AddProfileLink>
              </ItemDiv>
              <ItemDiv>
                <AddProfileLink
                  to={{
                    pathname: `${ADD_PROFILE_START_REVIEW_URL}`,
                    state: { name: `${name}`, category: "payroll" }
                  }}
                >
                  {SVGCreator("payroll-category", "125px", "100%")}
                </AddProfileLink>
              </ItemDiv>
            </RowDiv>
            <RowDiv>
              <ItemDiv>
                <AddProfileLink
                  to={{
                    pathname: `${ADD_PROFILE_START_REVIEW_URL}`,
                    state: { name: `${name}`, category: "worksite" }
                  }}
                >
                  {SVGCreator("worksite-category", "125px", "100%")}
                </AddProfileLink>
              </ItemDiv>
              <ItemDiv>
                <AddProfileLink
                  to={{
                    pathname: `${ADD_PROFILE_START_REVIEW_URL}`,
                    state: { name: `${name}`, category: "company" }
                  }}
                >
                  {SVGCreator("company-category", "125px", "100%")}
                </AddProfileLink>
              </ItemDiv>
            </RowDiv>
          </LogosContainer>
          <ProfileLink to={SEARCH_URL}>
            <FooterDiv>
              <H3>Cancel and return to Search</H3>
            </FooterDiv>
          </ProfileLink>
        </MainDiv>
      </AddWrapper>
    );
  }
}
