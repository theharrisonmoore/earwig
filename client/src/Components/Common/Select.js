import React from "react";
import styled from "styled-components";
import { Select, Icon, Divider } from "antd";
import "antd/dist/antd.css";

const Option = Select.Option;

const Label = styled.label`
  display: block;
  text-align: left;
  margin-bottom: 0.25rem;
`;

class CustomizedSelects extends React.Component {
  state = {
    open: false,
    searchTerm: ""
  };

  handleOpen = () => {
    this.setState({ open: !this.state.open });
  };

  handleSearchChange = value => {
    this.setState({ searchTerm: value });
  };

  filterOption = (input, option) =>
    option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0;

  render() {
    const {
      options,
      handleChange,
      placeholder,
      label,
      disabled,
      addHandler,
      isCreateNew,
      showSearch,
      value,
      ...rest
    } = this.props;

    const { searchTerm } = this.state;

    return (
      <>
        {label && <Label onClick={this.handleOpen}>{label}</Label>}
        <Select
          placeholder={disabled ? options[0] && options[0].label : placeholder}
          onSelect={handleChange}
          open={this.state.open}
          onDropdownVisibleChange={this.handleOpen}
          disabled={disabled}
          showSearch={showSearch}
          onSearch={this.handleSearchChange}
          style={{
            width: "100%"
          }}
          value={value || undefined}
          filterOption={this.filterOption}
          size="large"
          dropdownRender={menu =>
            isCreateNew ? (
              <div
                onMouseDown={e => {
                  e.preventDefault();
                  return false;
                }}
              >
                {menu}
                <Divider style={{ margin: "4px 0" }} />
                <div
                  style={{ padding: "8px", cursor: "pointer" }}
                  onClick={addHandler}
                  data-search-term={searchTerm}
                >
                  <Icon type="plus" /> Add item: {searchTerm}
                </div>
              </div>
            ) : (
              menu
            )
          }
          {...rest}
        >
          {options &&
            options.map(item => (
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
