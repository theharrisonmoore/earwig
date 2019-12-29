import React, { Component } from "react";

import BarChartAnswer from "./BarChartAnswer";
import CanteenItemAnswer from "./CanteenItemAnswer";
import CommentsBox from "./CommentsBox";
import ImageSlider from "./ImageSlider";
import ListAnswer from "./ListAnswer";
import PayrollAnswer from "./PayrollAnswer";
import PieAnswer from "./PieAnswer";
import ScatterAnswer from "./ScatterAnswer";
import SiteItemAnswer from "./SiteItemAnswer";
import VoiceReview from "./VoiceReview";
import YesNoAnswer from "./YesNoAnswer";
import CanteenSubItemAnswer from "./CanteenSubItemAnswer";

const withComments = WrapprdComponent => {
  return class WrapprdComponentWithComments extends Component {
    // commentsCount
    render() {
      return (
        <div>
          <WrapprdComponent {...this.props} />
        </div>
      );
    }
  };
};

export default {
  BarChartAnswer: withComments(BarChartAnswer),
  CanteenItemAnswer: withComments(CanteenItemAnswer),
  CommentsBox: withComments(CommentsBox),
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
