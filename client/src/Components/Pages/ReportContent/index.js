import React, { Component } from "react";

import { Wrapper, ContentWrapper } from "./../../Common/StaticPages.style";

import SelectReason from "./SelectReason";
import GiveInformation from "./GiveInformation";
import Thanks from "./Thanks";

export default class ReportContent extends Component {
  state = {
    reason: "",
    step: 0,
    description: ""
  };

  componentDidMount() {
    console.log(this.props.location);
    // overallReview
    // questionComment
  }

  handleSelect = reason => {
    this.setState({ reason });
  };

  handleCancel = () => {
    this.props.history.goBack();
  };

  handleMove = direction => {
    this.setState({ step: this.state.step + direction });
  };

  handleTextAreaChange = ({ target }) => {
    this.setState({ description: target.value });
  };

  handleSubmit = () => {
    this.handleMove(1);
  };

  render() {
    const Components = [SelectReason, GiveInformation, Thanks];
    const ActiveComponent = Components[this.state.step];

    return (
      <Wrapper>
        <ContentWrapper>
          <ActiveComponent
            handleCancel={this.handleCancel}
            handleSelect={this.handleSelect}
            handleMove={this.handleMove}
            handleSubmit={this.handleSubmit}
            handleTextAreaChange={this.handleTextAreaChange}
            description={this.state.description}
          />
        </ContentWrapper>
      </Wrapper>
    );
  }
}
