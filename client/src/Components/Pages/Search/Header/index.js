import React, { Component } from "react";

import AutosuggestComponent from "../AutoSuggest";

import { HeaderWrapper, SearchBarContainer } from "./Header.style";
import Tabs from "./Tabs";
import GeneralTabs from "../../../Common/GeneralTabs";

export default class SearchHeader extends Component {
  state = {
    shrink: true,
  };

  // componentDidMount() {
  //   document.addEventListener("scroll", this.checkScroll);
  //   this.checkScroll();
  // }

  // componentWillUnmount() {
  //   document.removeEventListener("scroll", this.checkScroll);
  // }

  // checkScroll = () => {
  //   if (
  //     document.body.scrollTop > 60 ||
  //     document.documentElement.scrollTop > 60
  //   ) {
  //     this.setState({ shrink: true });
  //   } else {
  //     this.setState({ shrink: false });
  //   }
  // };

  render() {
    const { isMobile, isTablet, data, category, setActiveTab, activeTab = "all" } = this.props;
    const { shrink } = this.state;
    return (
      <HeaderWrapper category={category} shrink={shrink}>
        <Tabs category={category} />
        <SearchBarContainer shrink={shrink}>
          <AutosuggestComponent
            iconTop={shrink ? "28px" : "34px"}
            bool={() => true}
            height={`${shrink ? "3.5rem" : "4.5rem"}`}
            width="80%"
            data={data}
            placeholderText={`Search for ${
              category === "agency" ? "an" : "a"
            } ${category}...`}
            isMobile={isMobile}
            isTablet={isTablet}
          />
        </SearchBarContainer>
        <GeneralTabs setActiveTab={setActiveTab} activeTab={activeTab} tabOne="all" tabTwo="recent" />
      </HeaderWrapper>
    );
  }
}
