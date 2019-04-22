import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";

import { routes } from "./../../../../constants/adminRoutes";
import AllOrganizations from "./AllOrganizations";

const { COMPANIES, AGENCIES, PAYROLLS, WORKSITES } = routes;
export default class Organizations extends Component {
  render() {
    return (
      <Switch>
        <Route
          exact
          path={COMPANIES}
          render={props => <AllOrganizations category="company" {...props} />}
        />
        <Route
          exact
          path={AGENCIES}
          render={props => <AllOrganizations category="agency" {...props} />}
        />
        <Route
          exact
          path={PAYROLLS}
          render={props => <AllOrganizations category="payroll" {...props} />}
        />
        <Route
          exact
          path={WORKSITES}
          render={props => <AllOrganizations category="worksite" {...props} />}
        />
      </Switch>
    );
  }
}
