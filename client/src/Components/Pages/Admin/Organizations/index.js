import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";

export default class Organizations extends Component {
  render() {
    return (
      <Switch>
        <Route
          exact
          path="/admin/organizations/companies"
          render={props => <h1>companies</h1>}
        />
        <Route
          exact
          path="/admin/organizations/agencies"
          render={props => <h1>agencies</h1>}
        />
        <Route
          exact
          path="/admin/organizations/payrolls"
          render={props => <h1>payrolls</h1>}
        />
        <Route
          exact
          path="/admin/organizations/worksites"
          render={props => <h1>worksites</h1>}
        />
      </Switch>
    );
  }
}
