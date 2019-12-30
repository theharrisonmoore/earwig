import React, { Component } from "react";

import axios from "axios";

import { message } from "antd";
import RepliesAndCommentsCollaps from "../../../Common/RepliesAndCommentsCollaps";

import BarChartAnswer from "./BarChartAnswer";
import CanteenItemAnswer from "./CanteenItemAnswer";
// import CommentsBox from "./CommentsBox";
import ImageSlider from "./ImageSlider";
import ListAnswer from "./ListAnswer";
import PayrollAnswer from "./PayrollAnswer";
import PieAnswer from "./PieAnswer";
import ScatterAnswer from "./ScatterAnswer";
import SiteItemAnswer from "./SiteItemAnswer";
import VoiceReview from "./VoiceReview";
import YesNoAnswer from "./YesNoAnswer";
import CanteenSubItemAnswer from "./CanteenSubItemAnswer";

// custom HOC to append the comments for each question
const withComments = WrapprdComponent => {
  return class WrapprdComponentWithComments extends Component {
    state = {
      comments: [],
      loading: false,
      isActive: false,
    };

    toggleComments = () => {
      this.setState(prevState => {
        if (!prevState.isActive) {
          this.fetchComments();
        }
        return {
          isActive: !prevState.isActive,
          loading: true,
        };
      });
    };

    fetchComments = () => {
      const { question: { _id: questionID } = {}, organizationID } = this.props;
      // fetch comments
      axios
        .post("/api/comments", { organizationID, questionID })
        .then(res => {
          this.setState({
            comments: res.data,
            loading: false,
          });
        })
        .catch(err => {
          const error =
            err.response && err.response.data && err.response.data.error;
          message.error(error || "Something went wrong");
        });
    };

    render() {
      const {
        question: { commentsCount, _id: questionID } = {},
        organizationID,
      } = this.props;

      const { isActive } = this.state;

      return (
        <div>
          <WrapprdComponent {...this.props} />
          {commentsCount && (
            <RepliesAndCommentsCollaps
              id={`${organizationID}/${questionID}`}
              isActive={isActive}
              panelKey={`${organizationID}/${questionID}`}
              count={commentsCount}
              onToggle={this.toggleComments}
              comments
            />
          )}
        </div>
      );
    }
  };
};

export default {
  BarChartAnswer: withComments(BarChartAnswer),
  CanteenItemAnswer: withComments(CanteenItemAnswer),
  // CommentsBox: withComments(CommentsBox),
  ImageSlider: withComments(ImageSlider),
  ListAnswer: withComments(ListAnswer),
  PayrollAnswer: withComments(PayrollAnswer),
  PieAnswer: withComments(PieAnswer),
  ScatterAnswer: withComments(ScatterAnswer),
  SiteItemAnswer: withComments(SiteItemAnswer),
  VoiceReview: withComments(VoiceReview),
  YesNoAnswer: withComments(YesNoAnswer),
  CanteenSubItemAnswer: withComments(CanteenSubItemAnswer),
};
