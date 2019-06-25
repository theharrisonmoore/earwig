import React, { Component } from "react";
import { Pie } from "react-chartjs-2";

import { pieColors, organizations } from "./../../../../theme";

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

    const totalLables = Object.entries(labelObject)
    const labelArray = totalLables.map(label => `${label[0]} (${label[1]})`)

    const data = {
      labels: labelArray,
      datasets: [
        {
          data: Object.values(labelObject),
          backgroundColor: pieColors[`${category}`],
          datalabels: {
            align: "start",
            formatter: (value, ctx) => {
              const lable = Object.keys(labelObject)[ctx.dataIndex];
              return `${lable}`;
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
      responsive: true,
      maintainAspectRatio: false,
      height: "100px", 
      legend: {
        display: true,
        position: "top",
        fullWidth: false,
        align: 'start',
        labels : {
          align: 'start',
        },
        onClick: (e) => {}
      },
      tooltips: { 
        callbacks: { 
          label: (tooltipItems, data) => {
            return data.labels[tooltipItems.index]
          }
      } 
    }
    };

    return (
      <div style={{position: "relative", height: "50vh", paddingBottom: "32px"}}>
        <Pie data={data} options={options} />
        <RightCommentWrapper>
          {question.answers.filter(answer => answer.comment).length > 0 ? (
            <Comment
              onClick={() => toggleComments(question)}
              active
              color={organizations[category].primary}
            >
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
