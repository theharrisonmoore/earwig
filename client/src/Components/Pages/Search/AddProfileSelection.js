import React, { Component } from "react";
import { Spin } from "antd";

import {
  SEARCH_URL,
  ADD_PROFILE_START_REVIEW_URL,
} from "../../../constants/naviagationUrls";

import Icon from "../../Common/Icon/Icon";

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
  AddProfileButton,
  LinkTitle,
} from "./Search.style";

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
                <ItemDiv category="agency">
                  <AddProfileButton
                    as="button"
                    onClick={e => {
                      this.addOrganisation(e, name, categories[0]);
                    }}
                  >
                    <Icon
                      icon="agency"
                      width="50%"
                      height="auto"
                      color="white"
                      margin="0 0 1rem 0"
                    />
                    <LinkTitle>Agency</LinkTitle>
                  </AddProfileButton>
                </ItemDiv>
                <ItemDiv category="payroll">
                  <AddProfileButton
                    as="button"
                    onClick={e => {
                      this.addOrganisation(e, name, categories[1]);
                    }}
                  >
                    <Icon
                      icon="payroll"
                      width="50%"
                      height="auto"
                      color="white"
                      margin="0 0 1rem 0"
                      cursor="pointer"
                    />
                    <LinkTitle>Payroll</LinkTitle>
                  </AddProfileButton>
                </ItemDiv>
              </RowDiv>
              <RowDiv>
                <ItemDiv category="worksite">
                  <AddProfileButton
                    as="button"
                    onClick={e => {
                      this.addOrganisation(e, name, categories[2]);
                    }}
                    category="worksite"
                  >
                    <Icon
                      icon="worksite"
                      width="50%"
                      height="auto"
                      color="white"
                      margin="0 0 1rem 0"
                    />
                    <LinkTitle>Worksite</LinkTitle>
                  </AddProfileButton>
                </ItemDiv>
                <ItemDiv category="company">
                  <AddProfileButton
                    as="button"
                    onClick={e => {
                      this.addOrganisation(e, name, categories[3]);
                    }}
                  >
                    <Icon
                      icon="company"
                      width="50%"
                      height="auto"
                      color="white"
                      margin="0 0 1rem 0"
                    />
                    <LinkTitle>Company</LinkTitle>
                  </AddProfileButton>
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
