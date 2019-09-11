import React, { Component } from "react";
import { Map } from "immutable";
import { ErrorMessage } from "formik";
import { Checkbox } from "antd";

import { colors } from "../../../../../theme";

import {
  QuestionOptionsWrapper,
  Options,
  StyledErrorMessage,
  StyledCheckList,
  StyledButton
} from "../Question.style";

class CheckList extends Component {
  state = { checkedList: [], clicked: false, rate: 0, hoverRate: undefined };

  shouldComponentUpdate(nextProps, nextState) {
    if (Map(this.props.state.answers).equals(Map(nextProps.state.answers))) {
      return false;
    }
    return true;
  }

  getStyle = () => {
    if (this.state.clicked) {
      return {
        border: `3px solid ${colors.green}`
      };
    } else {
      return {
        border: "3px solid transparent"
      };
    }
  };

  render() {
    const { handleSliderChange, options, number } = this.props;

    return (
      <QuestionOptionsWrapper>
        <Options>
          <StyledCheckList>
            <div>
              <Checkbox.Group
                className="check-group"
                options={options}
                value={this.state.checkedList}
                onChange={checkedList => {
                  this.setState({
                    checkedList,
                    clicked: false
                  });
                  handleSliderChange(checkedList, number);
                }}
              />
            </div>
            <div className="icon-button">
              <StyledButton
                style={this.getStyle()}
                type="button"
                onClick={e => {
                  e.preventDefault();
                  this.setState({
                    checkedList: [],
                    clicked: true
                  });
                  handleSliderChange("I didn't check", number);
                }}
              >
                I didn't check
              </StyledButton>
            </div>
          </StyledCheckList>
        </Options>
        <ErrorMessage name={`questions[${number}]`}>
          {msg => <StyledErrorMessage>{msg}</StyledErrorMessage>}
        </ErrorMessage>
      </QuestionOptionsWrapper>
    );
  }
}

export default CheckList;
