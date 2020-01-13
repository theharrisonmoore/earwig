import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import axios from "axios";

import CancelNavbar from "../../Common/CancelNavbar";

// nagivation routes
import {
  EDIT_TRADE_URL,
  EDIT_CITY_URL,
  EDIT_ID_URL,
  EDIT_PASSWORD_URL,
} from "../../../constants/naviagationUrls";

import {
  EditWrapper,
  BorderedWrapper,
  VerifiedWrapper,
  Section,
  TopSection,
  Row,
  EditButton,
  DeleteButton,
  Option,
} from "./EditProfile.style";

// API ROUTES
const { API_USERS_TRADE } = require("../../../apiUrls");

export default class EditProfile extends Component {
  state = {
    currentTradeName: "",
  };

  componentDidMount() {
    axios
      .get(API_USERS_TRADE)
      .then(({ data }) => {
        this.setState({
          currentTradeName: (data && data.title) || null,
        });
      })
      .catch(err => {
        console.log("err", err);
      });
  }

  render() {
    const { userId, city, history, verified, awaitingReview } = this.props;

    const isWorker = awaitingReview || verified;

    return (
      <>
        <CancelNavbar
          history={history}
          CancelText="Back"
          title="Edit your profile"
        />

        {isWorker ? (
          <EditWrapper>
            <BorderedWrapper>
              <VerifiedWrapper>
                <TopSection>
                  <Row>
                    <Option>Display name: {userId}</Option>
                    <NavLink to={EDIT_ID_URL}>
                      <EditButton type="button">Change</EditButton>
                    </NavLink>
                  </Row>
                </TopSection>
                <Section>
                  <Row>
                    <Option>Password</Option>
                    <NavLink to={EDIT_PASSWORD_URL}>
                      <EditButton type="button">Change</EditButton>
                    </NavLink>
                  </Row>
                </Section>
                <Section>
                  <Row>
                    <Option>
                      Trade:&nbsp;
                      {this.state.currentTradeName}
                    </Option>
                    <NavLink to={EDIT_TRADE_URL}>
                      <EditButton type="button">Change</EditButton>
                    </NavLink>
                  </Row>
                </Section>
                <Section>
                  <Row>
                    <Option>Town or City:&nbsp;{city}</Option>
                    <NavLink to={EDIT_CITY_URL}>
                      <EditButton type="button">Change</EditButton>
                    </NavLink>
                  </Row>
                </Section>
                <Section>
                  <Row>
                    <Option>Delete your account</Option>
                    <NavLink to="/delete-profile">
                      <DeleteButton>Delete</DeleteButton>
                    </NavLink>
                  </Row>
                </Section>
              </VerifiedWrapper>
            </BorderedWrapper>
          </EditWrapper>
        ) : (
          <EditWrapper>
            <BorderedWrapper>
              <VerifiedWrapper>
                <TopSection>
                  <Row>
                    <Option>Password</Option>
                    <NavLink to={EDIT_PASSWORD_URL}>
                      <EditButton type="button">Change</EditButton>
                    </NavLink>
                  </Row>
                </TopSection>
                <Section>
                  <Row>
                    <Option>Delete my account</Option>
                    <NavLink to="/delete-profile">
                      <DeleteButton>Delete</DeleteButton>
                    </NavLink>
                  </Row>
                </Section>
              </VerifiedWrapper>
            </BorderedWrapper>
          </EditWrapper>
        )}
      </>
    );
  }
}
