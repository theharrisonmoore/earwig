import React, { Component } from "react";
import axios from "axios";
import swal from "sweetalert2";
import { Spin } from "antd";

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
  state = {
    isLoading: false
  };

  deleteOrg = name => {
    axios.delete(`/api/delete-organization/${name}`).then(() => {
      // need to trigger a hard refresh here as organisation was still shown in search bar after deletion
      window.location.reload();
      this.props.history.push("/search");
    });
  };

  addOrganisation = (e, orgName, orgCategory) => {
    e.preventDefault();
    const newOrg = { name: orgName, category: orgCategory };
    this.setState({ isLoading: true });
    axios
      .post(API_ADD_ORGANIZATION_URL, newOrg)
      .then(res => {
        this.setState({ isLoading: false });
        this.props.history.push(ADD_PROFILE_START_REVIEW_URL, {
          newOrg: res.data
        });
      })
      .catch(err => {
        this.setState({ isLoading: false });
        swal.fire({
          type: "error",
          title: "Oops...",
          text: `${orgName} already exists. Please contact us directly with your request.`,
          footer: '<a href="/contact">Contact</a>'
        });
      });
  };

  render() {
    const { name } = this.props.location.state;
    const { isLoading } = this.state;

    const categories = ["agency", "payroll", "worksite", "company"];

    return (
      <AddWrapper>
        <MainDiv>
          <HeadlineDiv>
            <H2>{name} is a ...</H2>
          </HeadlineDiv>
          <LogosContainer>
            <Spin tip="Loading..." spinning={isLoading}>
              <RowDiv>
                <ItemDiv>
                  <AddProfileLink
                    as="button"
                    onClick={e => {
                      this.addOrganisation(e, name, categories[0]);
                    }}
                  >
                    <img
                      src={agencyCategory}
                      alt=""
                      style={{ width: "100%" }}
                    />
                  </AddProfileLink>
                </ItemDiv>
                <ItemDiv>
                  <AddProfileLink
                    as="button"
                    onClick={e => {
                      this.addOrganisation(e, name, categories[1]);
                    }}
                  >
                    <img
                      src={payrollCategory}
                      alt=""
                      style={{ width: "100%" }}
                    />
                  </AddProfileLink>
                </ItemDiv>
              </RowDiv>
              <RowDiv>
                <ItemDiv>
                  <AddProfileLink
                    as="button"
                    onClick={e => {
                      this.addOrganisation(e, name, categories[2]);
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
                    as="button"
                    onClick={e => {
                      this.addOrganisation(e, name, categories[3]);
                    }}
                  >
                    <img
                      src={companyCategory}
                      alt=""
                      style={{ width: "100%" }}
                    />
                  </AddProfileLink>
                </ItemDiv>
              </RowDiv>
            </Spin>
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
