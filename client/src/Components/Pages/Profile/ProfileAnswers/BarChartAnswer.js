import React, { Component } from "react";
import { Chart, Bar } from "react-chartjs-2";
import "chartjs-plugin-datalabels";

import { organizations } from "../../../../theme";

// Globally disable datalabels
Chart.defaults.global.plugins.datalabels.display = false;

export default class BarChartAnswer extends Component {
  // createLabels = answers => {
  //   const labels = answers.map(answer => answer.answer);

  //   const labelAndCount = labels.reduce
  //   uce((acc, label) => {
  //     acc[label] = acc[label] ? acc[label] + 1 : 1;
  //     return acc;
  //   }, Object.create(null));

  //   console.log("ANSWERS", labelAndCount);

  //   return labelAndCount;
  // };

  createDataObj = question => {
    // create object

    let optionsObj = question.question.options.reduce((acc, option) => {
      acc[option] = 0;
      return acc;
    }, Object.create(null));

    // get all of the answers
    const totalAnswers = question.answers.map(answer => answer.answer);
    // get the total for the number of answers
    const totalCount = totalAnswers.length;

    totalAnswers.map(answer => (optionsObj[answer] += (1 / totalCount) * 100));

    return optionsObj;
  };

  render() {
    const { category, question } = this.props;

    this.createDataObj(question);

    const labelObject = this.createDataObj(question);

    const options = {
      legend: {
        display: false
      },
      scales: {
        yAxes: [
          {
            ticks: {
              display: false
            },
            gridLines: {
              display: false,
              drawBorder: false
            }
          }
        ],
        xAxes: [
          {
            gridLines: {
              display: false
            }
          }
        ]
      }
    };

    const data = {
      labels: question.question.options,
      datasets: [
        {
          backgroundColor: organizations[`${category}`].primary,
          data: Object.values(labelObject),
          datalabels: {
            display: true,
            color: "white",
            anchor: "end",
            clamp: true,
            align: "bottom",
            clip: true,
            formatter: value => {
              return value + "%";
            },
            font: {
              weight: "900",
              size: "16",
              family: "roboto"
            }
          }
        }
      ]
    };

    return (
      <>
        <Bar data={data} options={options} />
      </>
    );
  }
}
