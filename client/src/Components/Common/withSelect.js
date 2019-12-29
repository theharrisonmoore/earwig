import React from "react";
import styled from "styled-components";
import { Prompt } from "react-router-dom";

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

export default WrappedComponent => {
  return class CustomizedSelects extends React.Component {
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

        if ("scrollBehavior" in document.documentElement.style) {
          window.scrollTo({
            top: offsetPosition,
            behavior: "smooth",
          });
        } else {
          let i = windowScroll;
          const int = setInterval(() => {
            window.scrollTo(0, i);
            i += 20;
            if (i >= offsetPosition) clearInterval(int);
          }, 10);
        }
      }
    };

    handleSearchChange = value => {
      this.setState({ searchTerm: value });
    };

    addMarginToPage = () => {
      document.body.style.marginBottom = "20rem";
    };

    removeMarginFromPage = () => {
      document.body.style.marginBottom = "0";
    };

    onFocus = () => {
      this.addMarginToPage();
      this.scrollToTop();
      this.handleOpen();
    };

    onBlur = () => {
      this.removeMarginFromPage();
      this.handleOpen();
    };

    render() {
      const {
        label,
        width,
        ismodalVisible,
        options,
        placeholder,
        disabled,
        id,
      } = this.props;

      return (
        <>
          <SelectDiv width={width} id={id}>
            {label && <Label onClick={this.handleOpen}>{label}</Label>}
            <WrappedComponent
              onBlur={this.onBlur}
              onFocus={this.onFocus}
              onSearch={this.handleSearchChange}
              handleOpen={this.handleOpen}
              placeholder={
                disabled ? options[0] && options[0].name : placeholder
              }
              {...this.props}
              {...this.state}
            />
          </SelectDiv>
          <Prompt
            when={ismodalVisible}
            message="Are you sure you want to leave this page? You will lose any unsaved data."
          />
        </>
      );
    }
  };
};
