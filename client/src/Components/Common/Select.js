import React from "react";
import styled from "styled-components";
import { Select, Icon } from "antd";
import "antd/dist/antd.css";

const Option = Select.Option;

const Label = styled.label`
  display: block;
  text-align: left;
  margin-bottom: 0.25rem;
`;

class CustomizedSelects extends React.Component {
  state = {
    open: false
  };

  handleOpen = () => {
    this.setState({ open: !this.state.open });
  };

  addHandler = () => {
    this.setState({ open: false });
    this.props.addHandler();
  };

  // filter the result and return "addNew" always
  filterOption = (inputValue, option) => {
    if (
      option.props.children.includes(inputValue) ||
      option.props.value === "addnew"
    ) {
      return true;
    }
  };

  render() {
    const {
      options,
      isCreateNew,
      handleChange,
      placeholder,
      label,
      disabled
    } = this.props;
    return (
      <>
        {label && <Label onClick={this.handleOpen}>{label}</Label>}
        <Select
          placeholder={placeholder}
          onSelect={handleChange}
          open={this.state.open}
          onDropdownVisibleChange={this.handleOpen}
          disabled={disabled}
          showSearch
          filterOption={this.filterOption}
          value={options[0] && options[0].label}
          style={{
            width: "100%"
          }}
        >
          {isCreateNew && (
            <Option
              value="addnew"
              key="addnew"
              onClick={this.addHandler}
              style={{
                display: "flex",
                alignItems: "center",
                fontWeight: "700"
              }}
            >
              <Icon type="plus" style={{ marginRight: "10px" }} /> Add item
            </Option>
          )}
          {options.map(item => (
            <Option value={item.value} key={item.value}>
              {item.label}
            </Option>
          ))}
        </Select>
      </>
    );
  }
}

export default CustomizedSelects;
