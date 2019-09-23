import React, { Component } from "react";
import axios from "axios";
import swal from "sweetalert2";
import { Spin } from "antd";

import { SEARCH_URL } from "../../../constants/naviagationUrls";
import { API_ADD_ORGANIZATION_URL } from "../../../apiUrls";

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
  LinkTitle
} from "./Search.style";
import { ADD_PROFILE_START_REVIEW_URL } from "../../../constants/naviagationUrls";

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
