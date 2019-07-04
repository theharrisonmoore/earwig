import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import axios from "axios";
import moment from "moment";

import {
  EDIT_PROFILE_URL,
  UPLOAD_VERIFICATION_URL
} from "./../../../constants/naviagationUrls";

import Loading from "./../../Common/AntdComponents/Loading";

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
  EditInfo,
  IDText,
  MainSection,
  VerifiedSection,
  SectionTitle,
  Paragraph,
  UnVerifiedButton,
  Title,
  ReviewDiv,
  AgencyTitle,
  ReviewText
} from "./UserProfile.style";

import Icon from "./../../Common/Icon/Icon";

export default class index extends Component {
  state = {
    reviewCount: 0,
    userReviews: [],
    loaded: false
  };

  componentDidMount() {
    axios.get("/api/user-reviews").then(res => {
      this.setState({
        userReviews: res.data,
        reviewCount: res.data.length,
        loaded: true
      });
    });
  }

  render() {
    const { userId, verified, points, helpedPoints, isSMobile, awaitingReview } = this.props;
    const { reviewCount, userReviews, loaded } = this.state;
    if (!loaded) return <Loading />;

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
                  <p>{awaitingReview ? "Verification pending" : "Unverified"}</p>
                </Verified>
              )}
            </IDWrapper>
            {verified && (
              <NavLink to={EDIT_PROFILE_URL}>
                <EditInfo>Edit info</EditInfo>
              </NavLink>
            )}
          </TopSection>
          <BottomSection isSMobile={isSMobile}>
            <StatWrapper>
              <StatTitle isSMobile={isSMobile}>Given</StatTitle>
              <Stat>{reviewCount} reviews</Stat>
            </StatWrapper>
            <StatWrapper>
              <StatTitle>Helped</StatTitle>
              <Stat>{helpedPoints} workers</Stat>
            </StatWrapper>
            <StatWrapper>
              <StatTitle>Earned</StatTitle>
              <Stat>{points} points</Stat>
            </StatWrapper>
          </BottomSection>
        </Header>
        {verified ? (
          <VerifiedSection>
            <SectionTitle>Your reviews</SectionTitle>
            {userReviews.length > 0 ? (
              userReviews.map((review, index) => (
                <NavLink
                  to={`/profile/${review.organization[0]._id}`}
                  key={index}
                >
                  <ReviewDiv>
                    <Icon
                      icon={review.organization[0].category}
                      width="18"
                      height="18"
                      margin="0 0.5rem 0 0"
                      // fill={colors.lightGray}
                    />
                    <ReviewText>
                      You reviewed{" "}
                      <AgencyTitle type={review.organization[0].category}>
                        {review.organization[0].name}
                      </AgencyTitle>
                    </ReviewText>
                    <ReviewText>
                      {moment().diff(review.createdAt, "weeks")}w
                    </ReviewText>
                  </ReviewDiv>
                </NavLink>
              ))
            ) : (
              <p>You have not completed any reviews yet</p>
            )}
          </VerifiedSection>
        ) : (
          <MainSection>
            <SectionTitle>Your reviews and impact</SectionTitle>

            <Paragraph>
              If you want to search jobs, help other workers by giving reviews
              and comment on other reviews, you need to get verified as a
              genuine worker. <br />
              <br />
              This protects the worker community from fake reviews and spam by
              non-workers.
            </Paragraph>

            <UnVerifiedButton to={UPLOAD_VERIFICATION_URL}>
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
