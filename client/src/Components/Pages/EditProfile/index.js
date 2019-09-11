import React, { Component } from "react";
import { NavLink } from "react-router-dom";

import CancelNavbar from "./../../Common/CancelNavbar";

// nagivation routes
import {
  EDIT_TRADE_URL,
  EDIT_CITY_URL,
  EDIT_ID_URL,
  EDIT_PASSWORD_URL
} from "./../../../constants/naviagationUrls";

import {
  EditWrapper,
  BorderedWrapper,
  VerifiedWrapper,
  Section,
  TopSection,
  Row,
  EditButton,
  DeleteButton,
  Option
} from "./EditProfile.style";

export default class EditProfile extends Component {
  render() {
    const { userId, history, verified, awaitingReview } = this.props;

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
                    <Option>Username: {userId}</Option>
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
                    <Option>Trade</Option>
                    <NavLink to={EDIT_TRADE_URL}>
                      <EditButton type="button">Change</EditButton>
                    </NavLink>
                  </Row>
                </Section>
                <Section>
                  <Row>
                    <Option>Town or City</Option>
                    <NavLink to={EDIT_CITY_URL}>
                      <EditButton type="button">Change</EditButton>
                    </NavLink>
                  </Row>
                </Section>
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
