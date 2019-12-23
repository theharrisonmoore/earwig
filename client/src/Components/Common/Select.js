import React from "react";
import styled from "styled-components";
import { Select, Divider } from "antd";

import withSelect from "./withSelect";

import "antd/dist/antd.css";
import Icon from "./Icon/Icon";

import { colors } from "../../theme";

const { Option } = Select;

const Label = styled.label`
  display: block;
  text-align: left;
  margin-bottom: 0.25rem;
`;

const SelectDiv = styled.div`
  position: relative;
  width: ${({ width }) => width || "100%"};

  .selectIcon {
    position: absolute !important;
    right: 1rem;
    top: 29%;

    :hover {
      cursor: pointer;
    }
  }
`;

class CustomizedSelects extends React.Component {
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
      width,
      ismodalVisible,
      searchTerm,
      ...rest
    } = this.props;

    return (
      <SelectDiv width={width}>
        {label && <Label onClick={this.props.handleOpen}>{label}</Label>}
        <Select
          placeholder={placeholder}
          onSelect={handleChange}
          showArrow={false}
          notFoundContent=""
          open={this.props.open}
          onDropdownVisibleChange={this.props.handleOpen}
          disabled={disabled}
          showSearch={showSearch}
          onSearch={this.props.onSearch}
          style={{
            width: "100%",
          }}
          value={value || searchTerm || undefined}
          filterOption={this.filterOption}
          size="large"
          onBlur={this.props.onBlur}
          onFocus={this.props.onFocus}
          dropdownRender={menu =>
            isCreateNew ? (
              <div
                onMouseDown={e => {
                  e.preventDefault();
                  return false;
                }}
              >
                {!!searchTerm && (
                  <>
                    <div
                      style={{
                        padding: "8px",
                        paddingLeft: "32px",
                        cursor: "pointer",
                        fontWeight: "bold",
                      }}
                      onClick={addHandler}
                      data-search-term={searchTerm}
                    >
                      &quot;{searchTerm}&quot; (Create new)
                    </div>
                    <Divider style={{ margin: "4px 0" }} />
                  </>
                )}
                {menu}
              </div>
            ) : (
              menu
            )
          }
          {...rest}
        >
          {!!options &&
            options.map(item => (
              <Option value={item.value} key={item._id}>
                {item.label || item.name}
              </Option>
            ))}
        </Select>
        <Icon
          icon="search"
          height="19px"
          width="19px"
          className="selectIcon"
          color={colors.dustyGray1}
          onClick={this.props.handleOpen}
        />
      </SelectDiv>
    );
  }
}

export default withSelect(CustomizedSelects);
