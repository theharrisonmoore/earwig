import React, { Component } from "react";
import styled from "styled-components";
import axios from "axios";
import moment from "moment";
import { Link } from "react-router-dom";

import { Popconfirm, message, Modal } from "antd";

import {
  Wrapper,
  BorderedSubSectionWrapper,
  SubSectionTitleParagraph,
} from "./UserProfile.style";

import { colors, organizations } from "../../../theme";

import CommonLink from "../../Common/Link";

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
  /* border-bottom: 2px solid
    ${({ cancelColor }) => cancelColor || colors.heliotrope}; */

  color: ${colors.primary};
`;

export default class UserReviews extends Component {
  state = {
    reviews: [],
    isLoading: false,
  };

  async componentDidMount() {
    this.getUserReviews();
  }

  getUserReviews = async () => {
    try {
      this.setState({
        isLoading: true,
      });
      const res = await axios.get("/api/reviews");
      this.setState({
        reviews: res.data.sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
        ),
        isLoading: false,
      });
    } catch (error) {
      this.setState({
        isLoading: false,
      });
      message.error(error);
    }
  };

  deleteReview = async reviewId => {
    try {
      await axios.delete("/api/reviews", {
        data: { id: reviewId },
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

  cancel = () => {
    message.error("Cancelled");
  };

  error = async reviewId => {
    try {
      await axios.get(`/api/review/${reviewId}/is-edatable`);
      this.props.history.push(`/review/${reviewId}/edit`);
    } catch (err) {
      Modal.error({
        title: "Edit is not allowed",
        content: "You can't edit this review, please check the rules above",
      });
    }
  };

  render() {
    const { reviews, isLoading } = this.state;

    return (
      <Wrapper>
        <BorderedSubSectionWrapper>
          <SubSectionTitleParagraph>
            You can edit your reviews within four weeks, unless workers have
            found them helpful and given you points, or unless the agency,
            payroll or company has replied.
            <br />
            <br /> You can delete your reviews at any time.
          </SubSectionTitleParagraph>

          <div>
            {isLoading ? (
              <div>Loading...</div>
            ) : (
              <>
                {reviews.length ? (
                  reviews.map(review => {
                    return (
                      <ReviewItem data-id={review._id}>
                        <CommonLink
                          to={`/profile/${review && review.organization._id}`}
                          type="colored"
                          text={review.organization.name}
                          style={{ width: "50%" }}
                          color={
                            organizations[
                              review && review.organization.category
                            ].primary
                          }
                        />

                        <p style={{ width: "15%" }}>
                          {moment(review.createdAt).format("ll")}
                        </p>
                        <ActionGroup
                          style={{ width: "15%", textAlign: "right" }}
                        >
                          <div>
                            <Cancel onClick={() => this.error(review._id)}>
                              Edit
                            </Cancel>
                          </div>

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
                    You haven&apos;t given any reviews yet.&nbsp;
                    <Link to="/welcome">Give a review now</Link>
                  </div>
                )}
              </>
            )}
          </div>
        </BorderedSubSectionWrapper>
      </Wrapper>
    );
  }
}
