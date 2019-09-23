import React, { Component } from "react";
import { Spin } from "antd";

import {
  SEARCH_URL,
  ADD_PROFILE_START_REVIEW_URL,
} from "../../../constants/naviagationUrls";

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
  AddProfileLink,
} from "./Search.style";

import agencyCategory from "../../../assets/agency-category.svg";
import companyCategory from "../../../assets/company-category.svg";
import worksiteCategory from "../../../assets/worksite-category.svg";
import payrollCategory from "../../../assets/payroll-category.svg";

export default class AddProfileSelection extends Component {
  state = {
    isLoading: false,
  };

  goBack = () => {
    this.props.history.push("/search");
  };

  addOrganisation = (e, orgName, orgCategory) => {
    e.preventDefault();
    this.setState({ isLoading: true });
    this.props.history.push(ADD_PROFILE_START_REVIEW_URL, {
      orgName,
      orgCategory,
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
                      style={{ width: "100%", cursor: "pointer" }}
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
                      style={{ width: "100%", cursor: "pointer" }}
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
                      style={{ width: "100%", cursor: "pointer" }}
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
                      style={{ width: "100%", cursor: "pointer" }}
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
              transform: "translateX(-50%)",
            }}
          >
            <FooterDiv>
              <H3 onClick={this.goBack}>Cancel and return to Search</H3>
            </FooterDiv>
          </AddProfileLink>
        </MainDiv>
      </AddWrapper>
    );
  }
}
