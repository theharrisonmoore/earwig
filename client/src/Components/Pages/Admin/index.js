import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";

import SideMenu from "./SideMenu";
import Users from "./Users";
import Reviews from "./Reviews";
import Organizations from "./Organizations";
import { ContentWrapper, AdminWrapper } from "./Admin.style";

import { routes } from "./../../../constants/adminRoutes";
const { USERS, REVIEWS, ORGANIZATIONS, TRADES } = routes;

export default class Admin extends Component {
  state = {
    menuWidth: 0
  };

  menuSizeObserver = width => {
    this.setState({ menuWidth: width });
  };

  render() {
    return (
      <AdminWrapper>
        <SideMenu {...this.props} menuSizeObserver={this.menuSizeObserver} />
        <ContentWrapper marginLeft={`${Math.ceil(this.state.menuWidth)}`}>
          <Switch>
            <Route path={USERS} render={props => <Users {...props} />} />
            <Route path={REVIEWS} render={props => <Reviews {...props} />} />
            <Route path={TRADES} render={props => <h1>Trades</h1>} />
            <Route path={ORGANIZATIONS} render={props => <Organizations />} />
          </Switch>
        </ContentWrapper>
      </AdminWrapper>
    );
  }
}
