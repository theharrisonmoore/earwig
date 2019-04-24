import React, { Component } from "react";
import axios from "axios";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { Table, Modal, message } from "antd";
import {
  ReviewWrapper,
  SubmitButton,
  UserAgreement,
  CheckboxWrapper,
  Header,
  Content,
  ImageBox,
  Image,
  Organization,
  OrgName,
  ReviewTime,
  Paragraph,
  FormWrapper,
  Level2Header,
  AgreementLabel
} from "../../Review/Review.style";

import Question from "../../Review/Question/index";

import { initQueestionsValues } from "../../Review/initialQuestionsValues";

const STATIC_QUESTIONS = [
  {
    number: 18,
    text: "How would you rate this agency?",
    type: "rate",
    options: ["Bad", "Poor", "Average", "Great", "Excellent"]
  },
  {
    number: 19,
    text: "If you’d like to write an overall review, go ahead here",
    type: "overallReview",
    hintText:
      "To help other workers, please try to explain why something was or wasn't good."
  },
  {
    number: 20,
    text: "Share a voice review",
    hintText:
      "30 seconds max. Bear in mind that people may be able to identify you from your voice.",
    type: "voiceReview"
  }
];

export default class SingleReview extends Component {
  state = {
    isLoading: true,
    groups: [],
    organization: { category: "", name: "" },
    id: ""
  };
  fetchData = () => {
    const { category, name } = this.props.location.state;
    const { organization } = this.state;
    organization.category = category;
    organization.name = name;
    const reviewID = window.location.href.split("/")[5];
    axios
      .get(`/api/admin/single-review/${reviewID}`)
      .then(res => {
        this.setState({ groups: res.data, isLoading: false });
      })
      .catch(err => {
        const error =
          err.response && err.response.data && err.response.data.error;
        message.error(error || "Something went wrong");
        this.fetchData();
      });
  };
  componentDidMount() {
    this.fetchData();
  }
  render() {
    const { isLoading } = this.state;
    if (isLoading) {
      return <div>loading....</div>;
    }
    console.log(this.state);

    return (
      <>
        <h1>hey</h1>
      </>
    );
  }
}
