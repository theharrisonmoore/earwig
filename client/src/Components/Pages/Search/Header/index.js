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
    shrink: false,
  };

  componentDidMount() {
    document.addEventListener("scroll", this.checkScroll);
    this.checkScroll();
  }

  componentWillUnmount() {
    document.removeEventListener("scroll", this.checkScroll);
  }

  checkScroll = () => {
    if (
      document.body.scrollTop > 60 ||
      document.documentElement.scrollTop > 60
    ) {
      this.setState({ shrink: true });
    } else {
      this.setState({ shrink: false });
    }
  };

  render() {
    const { isMobile, isTablet, data, category } = this.props;
    const { shrink } = this.state;
    return (
      <HeaderWrapper category={category} shrink={shrink}>
        <Tabs category={category} />
        <Heading title={orgs[category].text} shrink={shrink} />

        <SearchBarContainer shrink={shrink}>
          <AutosuggestComponent
            iconTop="20px"
            bool={() => true}
            height="4.5rem"
            width="80%"
            data={data}
            placeholderText={`Search for ${
              category === "agency" ? "an" : "a"
            } ${category}...`}
            isMobile={isMobile}
            isTablet={isTablet}
          />
        </SearchBarContainer>
      </HeaderWrapper>
    );
  }
}
