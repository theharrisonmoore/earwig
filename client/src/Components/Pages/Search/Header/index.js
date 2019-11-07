import React, { Component } from "react";

import AutosuggestComponent from "../AutoSuggest";

import { HeaderWrapper, SearchBarContainer } from "./Header.style";
import Tabs from "./Tabs";
import Heading from "./Heading";

const orgs = {
  agency: { text: "Agencies", to: "agency" },
  payroll: { text: "Payrolls", to: "payroll" },
  worksite: { text: "Worksites", to: "worksite" },
  company: { text: "Companies", to: "company" },
};

export default class SearchHeader extends Component {
  state = {
    showOtherSections: false,
  };

  componentDidMount() {
    document.addEventListener("mousedown", this.handleClickOutside, false);
  }

  componentWillUnmount() {
    document.removeEventListener("mousedown", this.handleClickOutside);
  }

  handleClickOutside = event => {
    if (this.searchBoxRef && !this.searchBoxRef.contains(event.target)) {
      this.setState({ showOtherSections: true });
    } else {
      this.setState({ showOtherSections: false });
    }
  };

  setSearchBoxRef = node => {
    this.searchBoxRef = node;
  };

  handleCancelIconClick = () => {
    this.setState({ showOtherSections: true });
  };

  render() {
    const { orgsIds, isMobile, isTablet, data, category } = this.props;
    const { showOtherSections } = this.state;
    return (
      <HeaderWrapper category={category}>
        <Tabs category={category} />
        <Heading title={orgs[category].text} />

        <SearchBarContainer ref={this.setSearchBoxRef}>
          <AutosuggestComponent
            iconTop="20px"
            bool={() => true}
            height="4.5rem"
            width="80%"
            data={data}
            placeholderText="Start typing..."
            isMobile={isMobile}
            isTablet={isTablet}
            handleCancelIconClick={this.handleCancelIconClick}
            orgsIds={orgsIds}
          />
        </SearchBarContainer>
      </HeaderWrapper>
    );
  }
}
