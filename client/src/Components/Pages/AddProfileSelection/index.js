import React, { Component } from "react";
import { Spin } from "antd";

import { organizations } from "../../../theme";

import Layout from "../../Common/Layout";
import Button from "../../Common/Button";

// styles
import {
  HeadlineDiv,
  H2,
  MainDiv,
  AddWrapper,
  LogosContainer,
  ButtonsWrpper,
} from "../../Common/AddOrganisationPages.style";

export default class AddProfileSelection extends Component {
  state = {
    isLoading: false,
  };

  goBack = () => {
    this.props.history.push("/search");
  };

  addOrganisation = (e, name, category) => {
    const { level } = this.props;
    e.preventDefault();
    this.setState({ isLoading: true });

    this.props.history.push(
      level >= 2
        ? `/add-profile-start-review/${category}/${name}`
        : `/verification-required/${category}/${name}`
    );
  };

  render() {
    const { match: { params: { name } } = {} } = this.props;
    const { isLoading } = this.state;
    const categories = ["agency", "payroll", "worksite", "company"];

    if (!name) {
      this.goBack();
      return null;
    }

    return (
      <Layout type="side">
        <AddWrapper>
          <MainDiv>
            <HeadlineDiv>
              <H2>Just double checking, {name} is a…</H2>
            </HeadlineDiv>
            <LogosContainer>
              <Spin tip="Loading..." spinning={isLoading} />
              <ButtonsWrpper>
                <div>
                  <Button
                    margin="1rem 0"
                    styleType="primary"
                    text="Agency"
                    backgroundColor={organizations.agency.primary}
                    style={{ minWidth: "8.5rem" }}
                    onClick={e => {
                      this.addOrganisation(e, name, categories[0]);
                    }}
                  />
                  <Button
                    margin="1rem 0"
                    styleType="primary"
                    text="Payroll"
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
                    text="Worksite"
                    backgroundColor={organizations.worksite.primary}
                    style={{ minWidth: "8.5rem" }}
                    onClick={e => {
                      this.addOrganisation(e, name, categories[2]);
                    }}
                  />
                  <Button
                    margin="1rem 0"
                    styleType="primary"
                    text="Company"
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
