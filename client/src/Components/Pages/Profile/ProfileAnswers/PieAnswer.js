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
          datalabels: {
            display: "auto",
            color: "white",
            anchor: "center",
            rotation: "3",
            clamp: true,
            align: "top",
            clip: true,
            formatter: (value, ctx) => {
              const lable = Object.keys(labelObject)[ctx.dataIndex];
              return `${lable}: ${value}`;
            },
            font: {
              weight: "700",
              size: "12",
              family: "roboto"
            }
          },
          hoverBackgroundColor: pieColors[`${category}`]
        }
      ]
    };

    const options = {
      responsive: 1,
      legend: {
        display: false
      }
    };

    return (
      <div>
        <Pie data={data} options={options} />
        <RightCommentWrapper>
          {question.answers.filter(answer => answer.comment).length > 0 ? (
            <Comment onClick={() => toggleComments(question)} active>
              Comments
            </Comment>
          ) : (
            <Comment>Comments</Comment>
          )}
        </RightCommentWrapper>
      </div>
    );
  }
}
