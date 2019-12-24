import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";

import { Layout } from "antd";
import SideMenu from "./SideMenu";
import Users from "./Users";
import Reviews from "./Reviews";
import Organizations from "./Organizations";
import Trades from "./Trades";

import { routes } from "../../../constants/adminRoutes";

const { Content, Sider } = Layout;

const { USERS, REVIEWS, ORGANIZATIONS, TRADES, DASHBOARD } = routes;

export default class Admin extends Component {
  state = {
    collapsed: false,
  };

  onCollapse = () => {
    console.log();
    this.setState(prevState => ({ collapsed: !prevState.collapsed }));
  };

  render() {
    return (
      <Layout>
        <Sider collapsible collapsed={this.state.collapsed} trigger={null}>
          <SideMenu
            {...this.props}
            toggleCollapsed={this.onCollapse}
            collapsed={this.state.collapsed}
          />
        </Sider>
        <Layout style={{ minHeight: "100vh" }}>
          <Content style={{ margin: "2rem 16px" }}>
            <Switch>
              <Route
                path={DASHBOARD}
                exact
                render={() => <h1>Main dashboard</h1>}
              />
              <Route path={USERS} render={props => <Users {...props} />} />
              <Route path={REVIEWS} render={props => <Reviews {...props} />} />
              <Route
                exact
                path={TRADES}
                render={props => <Trades {...props} />}
              />
              <Route path={ORGANIZATIONS} render={() => <Organizations />} />
              <Route
                render={() => (
                  <>
                    <h1>Not Found</h1>
                    <br />
                    <small>admin</small>
                  </>
                )}
              />
            </Switch>
          </Content>
        </Layout>
      </Layout>
    );
  }
}
