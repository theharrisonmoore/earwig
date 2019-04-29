import React, { Component } from "react";
import { Pie } from "react-chartjs-2";

import { pieColors } from "./../../../../theme";

import { Comment, RightCommentWrapper } from "./ProfileAnswers.style";

export default class PieAnswer extends Component {
  createLabels = answers => {
    const labels = answers.map(answer => answer.answer);

    const labelAndCount = labels.reduce((acc, label) => {
      acc[label] = acc[label] ? acc[label] + 1 : 1;
      return acc;
    }, Object.create(null));

    return labelAndCount;
  };

  render() {
    const { question, category, toggleComments } = this.props;

    const labelObject = this.createLabels(question.answers);

    const data = {
      labels: Object.keys(labelObject),
      datasets: [
        {
          data: Object.values(labelObject),
          backgroundColor: pieColors[`${category}`],
          hoverBackgroundColor: pieColors[`${category}`]
        }
      ]
    };

    return (
      <div>
        <Pie data={data} legend={{ position: "bottom" }} />
        {question.answers.filter(answer => answer.comment).length > 0 ? (
          <Comment onClick={() => toggleComments(question)} active>
            Comments
          </Comment>
        ) : (
          <Comment>Comments</Comment>
        )}
      </div>
    );
  }
}
