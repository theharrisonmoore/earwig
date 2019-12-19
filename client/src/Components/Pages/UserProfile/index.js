import React, { Component } from "react";
import axios from "axios";
import { Skeleton } from "antd";

import {
  EDIT_PROFILE_URL,
  UPLOAD_VERIFICATION_URL,
  MY_REVIEWS_URL,
  MY_POINTS_URL,
} from "../../../constants/naviagationUrls";

import Link from "../../Common/Link";

import Button from "../../Common/Button";

import {
  Wrapper,
  Header,
  TopSection,
  BottomSection,
  StatWrapper,
  StatTitle,
  Stat,
  IDWrapper,
  Verified,
  IDText,
  MainSection,
  SectionTitle,
  Paragraph,
  UsernameStatusDiv,
} from "./UserProfile.style";

import Icon from "../../Common/Icon/Icon";

export default class index extends Component {
  state = {
    reviewCount: 0,
    loaded: false,
  };

  componentDidMount() {
    axios.get("/api/user-reviews").then(res => {
      this.setState({
        // userReviews: res.data,
        reviewCount: res.data.length,
        loaded: true,
      });
    });
  }

  render() {
    const {
      userId,
      verified,
      trade,
      points,
      helpedUsers,
      isSMobile,
      awaitingReview,
      location: {
        state: {
          orgId,
          redirectToProfile,
          category,
          name,
          redirectToCreateProfile,
        } = {},
      } = {},
      level,
    } = this.props;

    const { reviewCount, loaded } = this.state;

    return (
      <Wrapper>
        <Header>
          <TopSection>
            <IDWrapper>
              {verified && (
                <Icon
                  icon="getVerified"
                  width="20"
                  height="20"
                  margin="0 0 0 0"
                />
              )}
              <UsernameStatusDiv>
                <IDText>{userId}</IDText>
                {verified ? (
                  <Verified>
                    <p>{trade ? "Verified worker" : "Registered user"}</p>
                  </Verified>
                ) : (
                  <Verified>
                    <p>
                      {awaitingReview
                        ? "Verification pending"
                        : `${trade ? "Unverified" : "Registered user"}`}
                    </p>
                  </Verified>
                )}
              </UsernameStatusDiv>
            </IDWrapper>

            <Link to={EDIT_PROFILE_URL} text="Edit profile" type="primary" />
          </TopSection>
          <BottomSection isSMobile={isSMobile}>
            <StatWrapper>
              <StatTitle isSMobile={isSMobile}>Given</StatTitle>
              <Stat>
                <Skeleton
                  loading={!loaded}
                  title={{ width: 60 }}
                  paragraph={false}
                  active
                >
                  {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
                  <Link
                    to={level >= 3 ? MY_REVIEWS_URL : "#"}
                    text={`${reviewCount} reviews`}
                    type="primary"
                  />
                </Skeleton>
              </Stat>
            </StatWrapper>
            <StatWrapper>
              <StatTitle>Helped</StatTitle>
              <Stat>
                <Skeleton
                  loading={!loaded}
                  title={{ width: 60 }}
                  paragraph={false}
                  active
                >
                  {helpedUsers} workers
                </Skeleton>
              </Stat>
            </StatWrapper>
            <StatWrapper>
              <StatTitle>Earned</StatTitle>
              <Stat>
                <Skeleton
                  loading={!loaded}
                  title={{ width: 60 }}
                  paragraph={false}
                  active
                >
                  {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
                  <Link
                    to={level >= 3 ? MY_POINTS_URL : "#"}
                    text={`${points} points`}
                    type="primary"
                  />
                </Skeleton>
              </Stat>
            </StatWrapper>
          </BottomSection>
        </Header>
        {!verified && (
          <MainSection>
            <SectionTitle>
              Wait! You’re not yet verified as a worker
            </SectionTitle>

            <Paragraph>
              If you want to give reviews, earn points and reply to comments,
              you first need to get verified as a worker. <br />
              <br />
              This protects the worker community from fake reviews and spam by
              non-workers.
            </Paragraph>

            <Button
              onClick={() =>
                this.props.history.push({
                  pathname: UPLOAD_VERIFICATION_URL,
                  state: {
                    orgId,
                    redirectToProfile,
                    category,
                    name,
                    redirectToCreateProfile,
                  },
                })
              }
              text="Get verified as a worker"
              styleType="primary"
            />
          </MainSection>
        )}
      </Wrapper>
    );
  }
}
