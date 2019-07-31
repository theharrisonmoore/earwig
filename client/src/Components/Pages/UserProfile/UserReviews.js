import React, { Component } from "react";
import styled from "styled-components";
import axios from "axios";
import moment from "moment";
import { Link } from "react-router-dom";

import { Popconfirm, message } from "antd";

import { Wrapper } from "./UserProfile.style";

import { colors, breakpoints } from "./../../../theme";

import Icon from "../../Common/Icon/Icon";

const Paragraph = styled.p`
  margin: 0 auto;
  margin-top: 3.5rem;
  padding-bottom: 2rem;
  border-bottom: 1px solid ${colors.veryLightGray};
  width: 90%;
  text-align: center;
  margin-bottom: 3rem;
`;

const BorderedWrapper = styled.div`
  max-width: 700px;
  margin: 0 auto;
  padding: 3rem 0;
  border: none;
  min-height: 100vh;

  & > div {
    max-width: 500px;
    margin: 0 auto;
    width: 90%;
    margin-top: 1rem;
  }

  @media ${breakpoints.tablet} {
    border-left: 3px solid ${colors.heliotrope};
    border-right: 3px solid ${colors.heliotrope};
  }
`;

const ReviewItem = styled.div`
  display: flex;
  align-items: center;
  border-bottom: 1px solid ${colors.veryLightGray};
  /* justify-content: space-between; */
  text-align: left;
  /* padding: 0.5rem; */
  height: 7rem;
  padding: 1rem 0;
  width: 100%;

  & > * {
    margin-bottom: 0;
  }
`;

const ActionGroup = styled.div`
  display: flex;
  flex-direction: column;
  width: 15%;
  text-align: right;
  justify-content: center;
  height: 100%;
  align-items: flex-end;
  margin-left: auto;

  & * {
    margin-bottom: 0.5rem;
  }
`;

const Cancel = styled.p`
  line-height: 1;
  font-size: 1.125rem;
  font-weight: 700;
  display: inline-block;
  cursor: pointer;
  text-decoration: none;
  /* pointer-events: none; */
  border-bottom: 2px solid
    ${({ cancelColor }) => (cancelColor ? cancelColor : colors.heliotrope)};

  color: ${({ cancelColor }) =>
    cancelColor ? cancelColor : colors.heliotrope};
`;

export default class UserReviews extends Component {
  state = {
    reviews: [],
    isLoading: false
  };
  async componentDidMount() {
    this.getUserReviews();
  }

  getUserReviews = async () => {
    try {
      this.setState({
        isLoading: true
      });
      const res = await axios.get("/api/reviews");
      this.setState({
        reviews: res.data,
        isLoading: false
      });
    } catch (error) {
      this.setState({
        isLoading: false
      });
      message.error(error);
    }
  };

  deleteReview = async reviewId => {
    try {
      await axios.delete("/api/reviews", {
        data: { id: reviewId }
      });
      this.getUserReviews();
    } catch (error) {
      message.error(error);
    }
  };

  confirm = reviewId => {
    this.deleteReview(reviewId);
    message.success("Successfully deleted");
  };

  cancel = e => {
    message.error("Cancelled");
  };

  render() {
    const { reviews, isLoading } = this.state;

    return (
      <Wrapper>
        <BorderedWrapper>
          <Paragraph>
            You can edit any of your reviews within 4 weeks, unless the agency,
            payroll, or company has responded, or workers have found them
            helpful.
            <br />
            <br /> You can delete your reviews at any time.
          </Paragraph>

          <div>
            {isLoading ? (
              <div>Loading...</div>
            ) : (
              <>
                {reviews.length ? (
                  reviews.map(review => {
                    return (
                      <ReviewItem data-id={review._id}>
                        <Icon
                          icon={review.organization.category}
                          margin="0 1rem 0 0"
                          height="2rem"
                          width="2rem"
                          color="grey"
                        />
                        <p style={{ width: "50%" }}>
                          {review.organization.name}
                        </p>
                        <p style={{ width: "15%" }}>
                          {moment(review.createdAt).format("ll")}
                        </p>
                        <ActionGroup
                          style={{ width: "15%", textAlign: "right" }}
                        >
                          <Link
                            to={{
                              pathname: `/review/${review._id}/edit`,
                              state: { orgID: `${review.organization._id}` }
                            }}
                          >
                            <Cancel>Edit</Cancel>
                          </Link>
                          <span>
                            <Popconfirm
                              title="Are you sure you want to delete this review?"
                              onConfirm={() => this.confirm(review._id)}
                              onCancel={this.cancel}
                              okText="Yes"
                              cancelText="No"
                              data-review-id={review._id}
                            >
                              <Cancel>Delete</Cancel>
                            </Popconfirm>
                          </span>
                        </ActionGroup>
                      </ReviewItem>
                    );
                  })
                ) : (
                  <div>
                    You have no reivews yet. You can add your review from&nbsp;
                    <Link to={"/search"}>here</Link>
                  </div>
                )}
              </>
            )}
          </div>
        </BorderedWrapper>
      </Wrapper>
    );
  }
}
