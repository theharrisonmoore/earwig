import React, { Component } from "react";
import { Map } from "immutable";
import { ErrorMessage } from "formik";
import { Select, Icon as AntdIcon, Divider } from "antd";

import { colors } from "../../../../../theme";
import {
  QuestionOptionsWrapper,
  Options,
  StyledErrorMessage
} from "../Question.style";

import ModalComment from "../../../../Common/AntdComponents/ModalComment";

class DropDown extends Component {
  state = { placeholder: "" };
  shouldComponentUpdate(nextProps, nextState) {
    if (Map(this.props.state.answers).equals(Map(nextProps.state.answers))) {
      return false;
    }
    return true;
  }

  addOrgType = category => {
    switch (category) {
      case "agency":
        return "payroll";
      case "payroll":
        return "agency";
      default:
        return category;
    }
  };

  render() {
    const { props } = this;
    const { number, label, handleSliderChange, category } = props;
    const { dropdownOptions } = this.props;
    let newOptions = [...dropdownOptions];

    return (
      <QuestionOptionsWrapper>
        <Options>
          <Select
            showSearch
            placeholder={this.state.placeholder || label}
            style={{
              border: `1px solid ${colors.dustyGray1}`,
              borderRadius: "4px"
            }}
            onChange={value => {
              handleSliderChange(value, number);
            }}
            // onSearch={value => {
            //   if (value) {
            //     this.setState({ placeholder: value });
            //     form.setFieldValue(`questions[${number}]`, value);
            //   }
            // }}
            dropdownRender={menu => {
              return (
                <div>
                  {menu}
                  <Divider style={{ margin: "4px 0" }} />
                  <ModalComment
                    title={`Add a new ${this.addOrgType(category)}`}
                    setFieldValue={value => {
                      this.setState({ placeholder: value });
                      handleSliderChange(value, number);
                    }}
                    number={number}
                    category={category}
                    render={renderProps => {
                      newOptions = [...newOptions, renderProps.text];
                      return (
                        <div
                          onMouseDown={e => {
                            e.preventDefault();
                            return false;
                          }}
                          style={{
                            padding: "8px",
                            cursor: "pointer"
                          }}
                        >
                          <AntdIcon type="plus" /> Add item
                        </div>
                      );
                    }}
                  />
                </div>
              );
            }}
          >
            {newOptions.map(option => (
              <Select.Option value={option} key={option}>
                {option}
              </Select.Option>
            ))}
          </Select>
        </Options>
        <ErrorMessage name={`questions[${number}]`}>
          {msg => <StyledErrorMessage>{msg}</StyledErrorMessage>}
        </ErrorMessage>
      </QuestionOptionsWrapper>
    );
  }
}

export default DropDown;
