import React, { Component } from "react";
import { SideMenuWrapper } from "./SideMenu.style";
import { Menu, Icon, Button } from "antd";
import { Link } from "react-router-dom";
import menuElements from "../../../../constants/adminRoutes";
const SubMenu = Menu.SubMenu;

const rootSubmenuKeys = menuElements.reduce((accu, current) => {
  if (current.items) {
    accu.push(current.route);
  }
  return accu;
}, []);
export default class SideMenu extends Component {
  state = {
    collapsed: false,
    openKeys: []
  };

  toggleCollapsed = () => {
    this.setState({
      collapsed: !this.state.collapsed
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
        openKeys: latestOpenKey ? [latestOpenKey] : []
      });
    }
  };

  render() {
    const { pathname } = this.props.location;
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
              "/" + pathname.split("/admin")[1].split("/")[1]
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
        </Menu>
      </SideMenuWrapper>
    );
  }
}
