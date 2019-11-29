import React, { Component } from "react";
import moment from "moment";
import { Scatter } from "react-chartjs-2";

import { organizations } from "../../../../theme";

export default class ScatterAnswer extends Component {
  // displayName: "ScatterExample",

  createData = answers => {
    const dataArr = answers.map(answer => ({
      x: moment(answer.createdAt),
      y: answer.answer,
    }));

    return dataArr;
  };

  render() {
    const { category, question } = this.props;

    const minDate = Number(
      moment(question.answers[0].createdAt)
        .subtract(2, "M")
        .format("x")
    );

    const maxDate = Number(
      moment(question.answers[question.answers.length - 1].createdAt)
        .add(2, "M")
        .format("x")
    );

    const data = {
      labels: ["Scatter"],
      datasets: [
        {
          label: "My First dataset",
          fill: false,
          backgroundColor: organizations[`${category}`].primary,
          pointBorderColor: organizations[`${category}`].primary,
          pointBackgroundColor: organizations[`${category}`].primary,
          pointBorderWidth: 2,
          pointHoverRadius: 10,
          pointHoverBackgroundColor: organizations[`${category}`].primary,
          pointHoverBorderColor: organizations[`${category}`].secondary,
          pointHoverBorderWidth: 4,
          pointRadius: 4,
          pointHitRadius: 20,
          data: this.createData(question.answers),
        },
      ],
    };

    const options = {
      legend: {
        display: false,
      },
      scales: {
        xAxes: [
          {
            type: "time",
            time: {
              unit: "month",
              min: minDate,
              max: maxDate,
            },
          },
        ],
      },
    };

    return (
      <div>
        <Scatter data={data} options={options} />
      </div>
    );
  }
}
