import React, { Component } from "react";
import { Bar as MonthlyBar } from "react-chartjs-2";

import { QuestionTitle } from "../ReviewSection.style";

import { organizations } from "../../../../theme";

export default class MonthlyReviews extends Component {
  render() {
    const { category, reviewsByMonth } = this.props;

    const options = {
      legend: {
        display: false
      },
      scales: {
        yAxes: [
          {
            ticks: {
              stepSize: 1
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
      labels: Object.keys(reviewsByMonth),
      datasets: [
        {
          backgroundColor: organizations[`${category}`].primary,
          data: Object.values(reviewsByMonth)
        }
      ]
    };

    return (
      <>
        <QuestionTitle>Total reviews by month</QuestionTitle>
        <MonthlyBar data={data} options={options} />
      </>
    );
  }
}
