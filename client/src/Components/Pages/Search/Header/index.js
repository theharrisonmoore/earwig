import React, { Component } from "react";

import AutosuggestComponent from "../AutoSuggest";

import { HeaderWrapper, SearchBarContainer } from "./Header.style";

export default class SearchHeader extends Component {
  render() {
    const { orgsIds, isMobile, isTablet, data, category } = this.props;
    return (
      <HeaderWrapper category={category}>
        <div>tabs</div>
        <div>Category</div>
        <div>
          Search bar
          {/* ---------------------- the old code for test before deleting--------------------------- */}
          {/* <FlexContainer ref={this.setSearchBoxRef}> */}
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
        </div>
      </HeaderWrapper>
    );
  }
}
