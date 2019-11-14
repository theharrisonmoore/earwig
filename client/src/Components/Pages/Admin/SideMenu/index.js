import React, { Component } from "react";
import { Menu, Icon } from "antd";
import { Link } from "react-router-dom";

import { SideMenuWrapper, StyledButton as Button } from "./SideMenu.style";

import { handleLogout } from "../../../../helpers";

import { menuElements } from "../../../../constants/adminRoutes";

import { SEARCH_URL } from "../../../../constants/naviagationUrls";

const { SubMenu } = Menu;

const rootSubmenuKeys = menuElements.reduce((accu, current) => {
  if (current.items) {
    accu.push(current.route);
  }
  return accu;
}, []);

export default class SideMenu extends Component {
  state = {
    collapsed: false,
    openKeys: [],
    menuWidth: 0,
  };

  toggleCollapsed = () => {
    this.setState({
      collapsed: !this.state.collapsed,
    });
  };

  onOpenChange = openKeys => {
    const latestOpenKey = openKeys.find(
      key => this.state.openKeys.indexOf(key) === -1
    );

    if (rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
      this.setState({ openKeys });
    } else {
      this.setState({
        openKeys: latestOpenKey ? [latestOpenKey] : [],
      });
    }
  };

  componentDidMount() {
    const resizeObserver = new ResizeObserver(entries => {
      this.props.menuSizeObserver(entries[0].contentRect.width);
    });
    resizeObserver.observe(document.querySelector("#watcher"));
  }

  render() {
    const { pathname } = this.props.location;
    const { handleChangeState, history } = this.props;
    return (
      <SideMenuWrapper style={{ height: "100%" }}>
        <Button
          type="primary"
          onClick={this.toggleCollapsed}
          style={{ marginBottom: 16 }}
        >
          <Icon type={this.state.collapsed ? "menu-unfold" : "menu-fold"} />
        </Button>

        <Menu
          defaultSelectedKeys={["/"]}
          defaultOpenKeys={[menuElements[0].title]}
          mode="inline"
          theme="dark"
          inlineCollapsed={this.state.collapsed}
          onOpenChange={this.onOpenChange}
          openKeys={
            this.state.openKeys || [
              `/${pathname.split("/admin")[1].split("/")[1]}`,
            ]
          }
        >
          {menuElements.map(element =>
            element.items ? (
              <SubMenu
                style={{ textAlign: "left" }}
                key={element.route}
                title={
                  <span>
                    <Icon type={element.icon} />
                    <span>{element.title}</span>
                  </span>
                }
              >
                {element.items.map(item => (
                  <Menu.Item
                    key={element.route + item.route}
                    style={{ textAlign: "left" }}
                  >
                    <Link to={`/admin${element.route + item.route}`}>
                      <Icon type={item.icon} />
                      <span>{item.title}</span>
                    </Link>
                  </Menu.Item>
                ))}
              </SubMenu>
            ) : (
              <Menu.Item key={element.route} style={{ textAlign: "left" }}>
                <Link to={`/admin${element.route}`}>
                  <Icon type={element.icon} />
                  <span>{element.title}</span>
                </Link>
              </Menu.Item>
            )
          )}
          <Menu.Item style={{ textAlign: "left" }}>
            <Link to={SEARCH_URL.replace(":category?", "")}>
              <Icon type="search" />
              <span>Vist Website</span>
            </Link>
          </Menu.Item>
          <Menu.Item
            style={{ textAlign: "left" }}
            onClick={() => handleLogout(history, handleChangeState)}
          >
            <Icon type="logout" />
            <span>Log out</span>
          </Menu.Item>
        </Menu>
        <div id="watcher" style={{ height: "1px", widht: "100%" }} />
      </SideMenuWrapper>
    );
  }
}
