import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import axios from "axios";
import moment from "moment";
import { Skeleton } from "antd";

import {
  EDIT_PROFILE_URL,
  UPLOAD_VERIFICATION_URL
} from "./../../../constants/naviagationUrls";

import Button from "./../../Common/Button";

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
  ReviewText,
  BorderedWrapper,
  MiniHeader,
  VerifyTitle,
  VerifyParagraph,
  VerifySection
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
    const {
      userId,
      verified,
      points,
      helpedUsers,
      isSMobile,
      awaitingReview
    } = this.props;

    const { reviewCount, userReviews, loaded } = this.state;
    const isWorker = verified || awaitingReview;

    if (isWorker) {
      return (
        <Wrapper>
          <Header>
            <TopSection>
              <IDWrapper>
                <IDText>Username: {userId}</IDText>
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
                    <p>
                      {awaitingReview ? "Verification pending" : "Unverified"}
                    </p>
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
                <Stat>
                  <Skeleton
                    loading={!loaded}
                    title={{ width: 60 }}
                    paragraph={false}
                    active
                  >
                    {reviewCount} reviews
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
                    {points} points
                  </Skeleton>
                </Stat>
              </StatWrapper>
            </BottomSection>
          </Header>
          {verified ? (
            <VerifiedSection>
              <SectionTitle>Your reviews</SectionTitle>
              <Skeleton
                loading={!loaded}
                title={false}
                paragraph={{
                  rows: 5,
                  width: ["50%", "80%", "70%", "40%", "70%"]
                }}
              >
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
              </Skeleton>
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
    } else {
      // BASIC VIEW FOR NON-WORKERS
      return (
        <Wrapper>
          <BorderedWrapper>
            <div>
              <MiniHeader>
                <NavLink to={EDIT_PROFILE_URL}>Edit Profile</NavLink>
              </MiniHeader>
              <VerifySection>
                <VerifyTitle>You're not a verified worker</VerifyTitle>
                <VerifyParagraph>
                  If you want to give reviews, ask questions and find jobs, you
                  first need to get verified as a genuine worker.
                  <br />
                  <br />
                  This protects the worker community from fake reviews and spam
                  by non-workers.
                </VerifyParagraph>
                <NavLink to={UPLOAD_VERIFICATION_URL}>
                  <Button type="button">Get verified as a worker</Button>
                </NavLink>
              </VerifySection>
            </div>
          </BorderedWrapper>
        </Wrapper>
      );
    }
  }
}
