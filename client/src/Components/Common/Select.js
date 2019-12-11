import React from "react";
import styled from "styled-components";
import { Select, Divider } from "antd";
import "antd/dist/antd.css";
import Icon from "./Icon/Icon"

import { colors } from "../../theme"

const { Option } = Select;


const Label = styled.label`
  display: block;
  text-align: left;
  margin-bottom: 0.25rem;
`;

const SelectDiv = styled.div`
  position: relative;
  width: ${({ width }) => width || "100%" };

  .selectIcon {
    position: absolute;
    right: 1rem;
    top: 29%;

    :hover {
      cursor: pointer;
    }
  }
` 

class CustomizedSelects extends React.Component {
  state = {
    open: false,
    searchTerm: "",
  };

  handleOpen = () => {
    this.setState(prevState => ({ open: !prevState.open }), this.scrollToTop);
  };

  isElementFixed = element => {
    if (element) {
      const elementStyle = window.getComputedStyle(element);
      if (elementStyle) {
        const { position } = elementStyle;
        if (position === "fixed") {
          return true;
        }
      }
    }
    return false;
  };

  scrollToTop = () => {
    const { id, scrollToTop } = this.props;
    const element = document.querySelector(`#${id}`);
    let topOffset = 30;
    if (scrollToTop && element) {
      // Fixed Elements
      const navbar = document.querySelector("#navbar");
      const cancelNavbar = document.querySelector("#cancel-navbar");
      const reviewHeader = document.querySelector("#review-header");

      // add fixed elements offset to the page offset
      if (navbar && this.isElementFixed(navbar)) {
        topOffset += navbar.offsetHeight;
      }

      if (cancelNavbar && this.isElementFixed(cancelNavbar)) {
        topOffset += cancelNavbar.offsetHeight;
      }
      if (reviewHeader && this.isElementFixed(reviewHeader)) {
        topOffset += reviewHeader.offsetHeight;
      }

      // get current element positon on the viewport
      const elementPosition = element.getBoundingClientRect().top;
      // current window scroll value
      const windowScroll = document.documentElement.scrollTop;
      // offset to be scrolled
      const offsetPosition = windowScroll + elementPosition - topOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  };

  handleSearchChange = value => {
    this.setState({ searchTerm: value });
  };

  filterOption = (input, option) =>
    option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0;

  addMarginToPage = () => {
    document.body.style.marginBottom = "20rem";
  };

  removeMarginFromPage = () => {
    document.body.style.marginBottom = "0";
  };

  onFocus = () => {
    this.addMarginToPage();
    this.scrollToTop();
  };

  onBlur = () => {
    this.removeMarginFromPage();
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
      showSearch,
      value,
      width,
      ...rest
    } = this.props;

    const { searchTerm } = this.state;

    return (
      <SelectDiv width={width}>
        {label && <Label onClick={this.handleOpen}>{label}</Label>}
        <Select
          placeholder={disabled ? options[0] && options[0].name : placeholder}
          onSelect={handleChange}
          showArrow={false}
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
          onBlur={this.onBlur}
          onFocus={this.onFocus}
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
        <Icon icon="search" height="19px" width="19px" className="selectIcon" color={colors.dustyGray1} onClick={this.handleOpen} />
      </SelectDiv>
    );
  }
}

export default CustomizedSelects;
