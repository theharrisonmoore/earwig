import React, { Component } from "react";
import { Spin } from "antd";

import { organizations } from "../../../theme";

import Layout from "../../Common/Layout";
import Button from "../../Common/Button";

import { ADD_PROFILE_START_REVIEW_URL } from "../../../constants/naviagationUrls";

// styles
import {
  HeadlineDiv,
  H2,
  LogosContainer,
  MainDiv,
  AddWrapper,
  ButtonsWrpper,
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
      <Layout type="side">
        <AddWrapper>
          <MainDiv>
            <HeadlineDiv>
              <H2>{name} is a ...</H2>
            </HeadlineDiv>
            <LogosContainer>
              <Spin tip="Loading..." spinning={isLoading} />
              <ButtonsWrpper>
                <div>
                  <Button
                    margin="1rem 0"
                    styleType="primary"
                    text="Agencies"
                    backgroundColor={organizations.agency.primary}
                    style={{ minWidth: "8.5rem" }}
                    onClick={e => {
                      this.addOrganisation(e, name, categories[0]);
                    }}
                  />
                  <Button
                    margin="1rem 0"
                    styleType="primary"
                    text="Payrolls"
                    backgroundColor={organizations.payroll.primary}
                    style={{ minWidth: "8.5rem" }}
                    onClick={e => {
                      this.addOrganisation(e, name, categories[1]);
                    }}
                  />
                </div>
                <div>
                  <Button
                    margin="1rem 0"
                    styleType="primary"
                    text="Worksites"
                    backgroundColor={organizations.worksite.primary}
                    style={{ minWidth: "8.5rem" }}
                    onClick={e => {
                      this.addOrganisation(e, name, categories[2]);
                    }}
                  />
                  <Button
                    margin="1rem 0"
                    styleType="primary"
                    text="companies"
                    backgroundColor={organizations.company.primary}
                    style={{ minWidth: "8.5rem" }}
                    onClick={e => {
                      this.addOrganisation(e, name, categories[3]);
                    }}
                  />
                </div>
              </ButtonsWrpper>
              <Button
                margin="0.5rem auto"
                styleType="secondary"
                text="Cancel"
                onClick={this.goBack}
                style={{ width: "6rem" }}
              />
            </LogosContainer>
          </MainDiv>
        </AddWrapper>
      </Layout>
    );
  }
}
