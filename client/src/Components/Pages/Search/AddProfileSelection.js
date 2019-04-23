import React, { Component } from "react";
import axios from "axios";

import { SEARCH_URL } from "../../../constants/naviagationUrls";
import { API_ADD_ORGANIZATION_URL } from "../../../apiUrls";
import Swal from "sweetalert2";

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
  addOrganisation = (orgName, orgCategory) => {
    const newOrg = { name: orgName, category: orgCategory, active: false };

    axios
      .post(API_ADD_ORGANIZATION_URL, newOrg)
      .then(result => {
        Swal.fire({
          type: "success",
          title: `Thanks! Be the first to review ${newOrg.name}`
        });
      })
      .catch(err => {
        Swal.fire({
          type: "error",
          title: "Oops. Organisation seems to already exist. Please try again.",
          text: err
        }).then(() => {
          this.props.history.push("/search");
        });
      });
  };

  render() {
    const { name } = this.props.location.state;
    const categories = ["agency", "payroll", "worksite", "company"];
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
                      category: categories[0]
                    }
                  }}
                  onClick={() => {
                    this.addOrganisation(name, categories[0]);
                  }}
                >
                  {SVGCreator("agency-category", "125px", "100%")}
                </AddProfileLink>
              </ItemDiv>
              <ItemDiv>
                <AddProfileLink
                  to={{
                    pathname: `${ADD_PROFILE_START_REVIEW_URL}`,
                    state: { name: `${name}`, category: categories[1] }
                  }}
                  onClick={() => {
                    this.addOrganisation(name, categories[1]);
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
                    state: { name: `${name}`, category: categories[2] }
                  }}
                  onClick={() => {
                    this.addOrganisation(name, categories[2]);
                  }}
                >
                  {SVGCreator("worksite-category", "125px", "100%")}
                </AddProfileLink>
              </ItemDiv>
              <ItemDiv>
                <AddProfileLink
                  to={{
                    pathname: `${ADD_PROFILE_START_REVIEW_URL}`,
                    state: { name: `${name}`, category: categories[3] }
                  }}
                  onClick={() => {
                    this.addOrganisation(name, categories[3]);
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
