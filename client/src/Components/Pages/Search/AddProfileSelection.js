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
  AddProfileLink
} from "./Search.style";
import { SVGCreator } from "../../../helpers";
import { ADD_PROFILE_START_REVIEW_URL } from "../../../constants/naviagationUrls";

export default class AddProfileSelection extends Component {
  addOrganisation = (orgName, orgCategory) => {
    const newOrg = { name: orgName, category: orgCategory, active: false };

    axios.post(API_ADD_ORGANIZATION_URL, newOrg).catch(err => {
      Swal.fire({
        type: "error",
        title: "Error adding Organisation. Please try again.",
        text: err
      }).then(() => {
        this.props.history.push("/search");
      });
    });
  };

  render() {
    const { name } = this.props.location.state;

    const linkProps = category => {
      return {
        pathname: `${ADD_PROFILE_START_REVIEW_URL}`,
        state: {
          name: `${name}`,
          category: category,
          needsVerification: true
        }
      };
    };

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
                  to={linkProps(categories[0])}
                  onClick={() => {
                    this.addOrganisation(name, categories[0]);
                  }}
                >
                  {SVGCreator("agency-category", "125px", "100%")}
                </AddProfileLink>
              </ItemDiv>
              <ItemDiv>
                <AddProfileLink
                  to={linkProps(categories[1])}
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
                  to={linkProps(categories[2])}
                  onClick={() => {
                    this.addOrganisation(name, categories[2]);
                  }}
                >
                  {SVGCreator("worksite-category", "125px", "100%")}
                </AddProfileLink>
              </ItemDiv>
              <ItemDiv>
                <AddProfileLink
                  to={linkProps(categories[3])}
                  onClick={() => {
                    this.addOrganisation(name, categories[3]);
                  }}
                >
                  {SVGCreator("company-category", "125px", "100%")}
                </AddProfileLink>
              </ItemDiv>
            </RowDiv>
          </LogosContainer>
          <AddProfileLink to={SEARCH_URL}>
            <FooterDiv>
              <H3>Cancel and return to Search</H3>
            </FooterDiv>
          </AddProfileLink>
        </MainDiv>
      </AddWrapper>
    );
  }
}
