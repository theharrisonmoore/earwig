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
  ProfileLink
} from "./Search.style";
import { SVGCreator } from "../../../helpers";
export default class addItem extends Component {
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
                {SVGCreator("agency-category", "125px", "100%")}
              </ItemDiv>
              <ItemDiv>
                {SVGCreator("payroll-category", "125px", "100%")}
              </ItemDiv>
            </RowDiv>
            <RowDiv>
              <ItemDiv>
                {SVGCreator("worksite-category", "125px", "100%")}
              </ItemDiv>
              <ItemDiv>
                {SVGCreator("company-category", "125px", "100%")}
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
