import React from "react";
import styled from "styled-components";
import { Select, Divider } from "antd";
import "antd/dist/antd.css";

const { Option } = Select;

const Label = styled.label`
  display: block;
  text-align: left;
  margin-bottom: 0.25rem;
`;

class CustomizedSelects extends React.Component {
  state = {
    open: false,
    searchTerm: "",
  };

  handleOpen = () => {
    this.setState(prevState => ({ open: !prevState.open }), this.scrollToTop);
  };

  scrollToTop = () => {
    const { id, srollToTop } = this.props;
    const element = document.querySelector(`#${id}`);
    if (element && srollToTop) {
      const isSmoothScrollSupported =
        "scrollBehavior" in document.documentElement.style;

      if (isSmoothScrollSupported) {
        element.scrollIntoView({
          behavior: "smooth",
          block: "start",
          inline: "nearest",
        });
      } else {
        element.scrollIntoView(true);
      }
    }
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
          placeholder={disabled ? options[0] && options[0].name : placeholder}
          onSelect={handleChange}
          notFoundContent=""
          open={this.state.open}
          onDropdownVisibleChange={this.handleOpen}
          disabled={disabled}
          showSearch={showSearch}
          onSearch={this.handleSearchChange}
          style={{
            width: "100%",
          }}
          value={value || searchTerm || undefined}
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
              <Option value={item.value || JSON.stringify(item)} key={item._id}>
                {item.label || item.name}
              </Option>
            ))}
        </Select>
      </>
    );
  }
}

export default CustomizedSelects;
