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
    open: false
  };

  handleOpen = () => {
    this.setState({ open: !this.state.open });
  };

  render() {
    const {
      options,
      handleChange,
      placeholder,
      label,
      disabled,
      addHandler,
      isCreateNew,
      showSearch
    } = this.props;
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
          style={{
            width: "100%"
          }}
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
                >
                  <Icon type="plus" /> Add item
                </div>
              </div>
            ) : (
              menu
            )
          }
        >
          {options.map(item => (
            <Option value={item.value} key={item.value}>
              {item.label}
            </Option>
          ))}
        </Select>
        ,
      </>
    );
  }
}

export default CustomizedSelects;
