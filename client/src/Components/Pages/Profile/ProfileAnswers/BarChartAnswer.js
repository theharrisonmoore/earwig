import React, { Component } from "react";
import { Chart, Bar } from "react-chartjs-2";
import "chartjs-plugin-datalabels";

import { colors } from "../../../../theme";

// Globally disable datalabels
Chart.defaults.global.plugins.datalabels.display = false;

export default class BarChartAnswer extends Component {
  createDataObj = question => {
    // create object

    const optionsObj = question.options.reduce((acc, option) => {
      acc[option] = 0;
      return acc;
    }, Object.create(null));

    // get all of the answers
    const totalAnswers = question.answers.map(answer => answer.answer);
    // get the total for the number of answers
    const totalCount = totalAnswers.length;

    totalAnswers.map(answer => {
      optionsObj[answer] += (1 / totalCount) * 100;
      const roundedNum = Math.round(optionsObj[answer]);
      return (optionsObj[answer] = roundedNum);
    });

    return optionsObj;
  };

  render() {
    const { question } = this.props;

    this.createDataObj(question);

    const labelObject = this.createDataObj(question);

    const options = {
      legend: {
        display: false,
      },
      scales: {
        yAxes: [
          {
            ticks: {
              display: false,
            },
            gridLines: {
              display: false,
              drawBorder: false,
            },
          },
        ],
        xAxes: [
          {
            gridLines: {
              display: false,
            },
          },
        ],
      },
    };

    const data = {
      labels: question.options,
      datasets: [
        {
          backgroundColor: colors.dustyGray2,
          data: Object.values(labelObject),
          datalabels: {
            display: true,
            color: "white",
            anchor: "end",
            clamp: true,
            align: "bottom",
            clip: true,
            formatter: value => {
              return `${value}%`;
            },
            font: {
              weight: "900",
              size: "16",
              family: "arial",
            },
          },
        },
      ],
    };

    return (
      <>
        <Bar data={data} options={options} aspectRatio={6} />
      </>
    );
  }
}
