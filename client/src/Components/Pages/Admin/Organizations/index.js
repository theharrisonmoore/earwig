import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";

import { routes } from "./../../../../constants/adminRoutes";
const { COMPANIES, AGENCIES, PAYROLLS, WORKSITES } = routes;

export default class Organizations extends Component {
  render() {
    return (
      <Switch>
        <Route exact path={COMPANIES} render={props => <h1>companies</h1>} />
        <Route exact path={AGENCIES} render={props => <h1>agencies</h1>} />
        <Route exact path={PAYROLLS} render={props => <h1>payrolls</h1>} />
        <Route exact path={WORKSITES} render={props => <h1>worksites</h1>} />
      </Switch>
    );
  }
}
