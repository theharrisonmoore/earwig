import React, { Component } from "react";
import axios from "axios";
import swal from "sweetalert2";

import { SEARCH_URL } from "../../../constants/naviagationUrls";
import { API_ADD_ORGANIZATION_URL } from "../../../apiUrls";

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
import { ADD_PROFILE_START_REVIEW_URL } from "../../../constants/naviagationUrls";

import agencyCategory from "../../../assets/agency-category.svg";
import companyCategory from "../../../assets/company-category.svg";
import worksiteCategory from "../../../assets/worksite-category.svg";
import payrollCategory from "../../../assets/payroll-category.svg";

export default class AddProfileSelection extends Component {
  deleteOrg = name => {
    axios.delete(`/api/delete-organization/${name}`).then(() => {
      // need to trigger a hard refresh here as organisation was still shown in search bar after deletion
      window.location.reload();
      this.props.history.push("/search");
    });
  };

  addOrganisation = (orgName, orgCategory) => {
    const newOrg = { name: orgName, category: orgCategory };

    axios.post(API_ADD_ORGANIZATION_URL, newOrg).catch(err =>
      swal
        .fire({
          type: "error",
          title: "Oops...",
          text: `${orgName} already exists. Please contact us directly with your request.`,
          footer: '<a href="/contact">Contact</a>'
        })
        .then(() => this.props.history.push(SEARCH_URL))
    );
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
                  <img src={agencyCategory} alt="" style={{ width: "100%" }} />
                </AddProfileLink>
              </ItemDiv>
              <ItemDiv>
                <AddProfileLink
                  to={linkProps(categories[1])}
                  onClick={() => {
                    this.addOrganisation(name, categories[1]);
                  }}
                >
                  <img src={payrollCategory} alt="" style={{ width: "100%" }} />
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
                  <img
                    src={worksiteCategory}
                    alt=""
                    style={{ width: "100%" }}
                  />
                </AddProfileLink>
              </ItemDiv>
              <ItemDiv>
                <AddProfileLink
                  to={linkProps(categories[3])}
                  onClick={() => {
                    this.addOrganisation(name, categories[3]);
                  }}
                >
                  <img src={companyCategory} alt="" style={{ width: "100%" }} />
                </AddProfileLink>
              </ItemDiv>
            </RowDiv>
          </LogosContainer>
          <AddProfileLink
            to={SEARCH_URL}
            style={{
              position: "fixed",
              bottom: "3rem",
              left: "50%",
              transform: "translateX(-50%)"
            }}
          >
            <FooterDiv>
              <H3 onClick={() => this.deleteOrg(name)}>
                Cancel and return to Search
              </H3>
            </FooterDiv>
          </AddProfileLink>
        </MainDiv>
      </AddWrapper>
    );
  }
}
