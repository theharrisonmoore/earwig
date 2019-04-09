import React, { Component } from "react";

import { Wrapper } from "./Menu.style.js";

export default class Menu extends Component {
  render() {
    const { width } = this.props;
    return <Wrapper width={width} />;
  }
}
