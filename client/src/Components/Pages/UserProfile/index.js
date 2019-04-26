import React, { Component } from "react";
import { NavLink } from "react-router-dom";

import {
  Wrapper,
  Header,
  TopSection,
  IDWrapper,
  Verified,
  EditInfo,
  IDText,
  MainSection,
  UnVerifiedTitle,
  Paragraph,
  UnVerifiedButton,
  Title
} from "./UserProfile.style";

import Icon from "./../../Common/Icon/Icon";

export default class index extends Component {
  render() {
    const { userId, verified } = this.props;

    return (
      <Wrapper>
        <Header>
          <TopSection>
            <IDWrapper>
              <IDText>ID: {userId}</IDText>
              {verified ? (
                <Verified>
                  <Icon
                    icon="getVerified"
                    width="20"
                    height="20"
                    margin="0 0.5rem 0 0"
                  />
                  <p>Verified</p>
                </Verified>
              ) : (
                <Verified>
                  <p>Unverified</p>
                </Verified>
              )}
            </IDWrapper>
            <NavLink to="/edit-profile">
              <EditInfo>Edit info</EditInfo>
            </NavLink>
          </TopSection>
        </Header>
        {verified ? (
          <MainSection>
            <div>Other stuff to go here</div>
          </MainSection>
        ) : (
          <MainSection>
            <UnVerifiedTitle>Your reviews and impact</UnVerifiedTitle>

            <Paragraph>
              If you want to search jobs, help other workers by giving reviews
              and comment on other reviews, you need to get verified as a
              genuine worker. <br />
              <br />
              This protects the worker community from fake reviews and spam by
              non-workers.
            </Paragraph>

            <UnVerifiedButton to="/upload-verification-photo">
              <Icon
                icon="getVerified"
                width="24"
                height="24"
                margin="0 0.5rem 0 0"
              />
              <Title>Get verified now</Title>
            </UnVerifiedButton>
          </MainSection>
        )}
      </Wrapper>
    );
  }
}
