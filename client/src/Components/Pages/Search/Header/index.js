import React, { Component } from "react";

import { FlexContainer } from "../Search.style";
import AutosuggestComponent from "../AutoSuggest";

import { HeaderWrapper } from "./Header.style";

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
          <FlexContainer ref={this.setSearchBoxRef}>
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
          </FlexContainer>
        </div>
      </HeaderWrapper>
    );
  }
}
