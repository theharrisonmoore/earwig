import React, { Component } from "react";

import { TabsWrapper, Tab } from "./Header.style";

export default class Tabs extends Component {
  render() {
    const orgs = [
      { text: "Agencies", to: "agency" },
      { text: "Payrolls", to: "payroll" },
      { text: "Worksites", to: "worksite" },
      { text: "Companies", to: "company" },
    ];

    const { category } = this.props;

    return (
      <TabsWrapper>
        {orgs.map(org => (
          <Tab
            to={`/search/${org.to}`}
            category={org.to}
            key={org.to}
            isActive={org.to === category}
          >
            {org.text}
          </Tab>
        ))}
      </TabsWrapper>
    );
  }
}
