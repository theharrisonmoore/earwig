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
              <AddProfileLink
                to={{
                  pathname: `${ADD_PROFILE_START_REVIEW_URL}`,
                  state: { name: `${name}`, category: "agency" }
                }}
              >
                <ItemDiv>
                  {SVGCreator("agency-category", "125px", "100%")}
                </ItemDiv>
              </AddProfileLink>
              <AddProfileLink
                to={{
                  pathname: `${ADD_PROFILE_START_REVIEW_URL}`,
                  state: { name: `${name}`, category: "payroll" }
                }}
              >
                <ItemDiv>
                  {SVGCreator("payroll-category", "125px", "100%")}
                </ItemDiv>
              </AddProfileLink>
            </RowDiv>
            <RowDiv>
              <AddProfileLink
                to={{
                  pathname: `${ADD_PROFILE_START_REVIEW_URL}`,
                  state: { name: `${name}`, category: "worksite" }
                }}
              >
                <ItemDiv>
                  {SVGCreator("worksite-category", "125px", "100%")}
                </ItemDiv>
              </AddProfileLink>
              <AddProfileLink
                to={{
                  pathname: `${ADD_PROFILE_START_REVIEW_URL}`,
                  state: { name: `${name}`, category: "company" }
                }}
              >
                <ItemDiv>
                  {SVGCreator("company-category", "125px", "100%")}
                </ItemDiv>
              </AddProfileLink>
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
