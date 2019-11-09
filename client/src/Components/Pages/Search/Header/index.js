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
  render() {
    const { orgsIds, isMobile, isTablet, data, category } = this.props;
    return (
      <HeaderWrapper category={category}>
        <Tabs category={category} />
        <Heading title={orgs[category].text} />

        <SearchBarContainer>
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
