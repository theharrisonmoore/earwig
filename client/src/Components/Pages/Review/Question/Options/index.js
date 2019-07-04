import React from "react";

import YesNo from "./YesNo";
import Open from "./Open";
import Number from "./Number";
import DropDown from "./DropDown";
import OverallReview from "./OverallReview";
import CheckList from "./CheckList";
import Image from "./Image";
import DateRange from "./DateRange";
import CustomRate from "./Rate";

class QuestionOptions extends React.Component {
  render() {
    const { type, category } = this.props;

    switch (type) {
      case "yesno":
      case "radio":
        return <YesNo {...this.props} />;
      case "open":
        return <Open {...this.props} />;
      case "number":
        return <Number {...this.props} />;
      case "dropdown":
        return <DropDown {...this.props} />;
      case "overallReview":
        return <OverallReview {...this.props} />;
      case "checklist":
        return <CheckList {...this.props} />;
      case "image":
        return <Image {...this.props} />;
      case "dateRange":
        return <DateRange {...this.props} />;
      case "rate":
        return <CustomRate {...this.props} category={category} />;
      default:
        return null;
    }
  }
}

export default QuestionOptions;
