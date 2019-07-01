import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

// import { Table, Modal, message, Input, Icon, Button } from "antd";

import { Select, Spin, message, Button } from "antd";

import OrganizationsColumns from "./OrganizationsColumns";

import { routes } from "./../../../../constants/adminRoutes";

// styling

const { Option } = Select;

export default class AllOrganizations extends Component {
  state = {
    data: [],
    value: [],
    fetching: false,
    firstOrg: null,
    secondOrg: null
  };

  componentDidMount() {
    this.fetchData();
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.category !== this.props.category) {
      this.fetchData();
    }
  }

  setFirstOrg = e => {
    this.setState({ firstOrg: this.state.data[e] });
  };

  setSecondOrg = e => {
    this.setState({ secondOrg: this.state.data[e] });
  };

  fetchData = () => {
    const { category } = this.props;
    axios
      .get(`/api/admin/organizations/${category}`)
      .then(({ data }) => {
        this.setState({ data, fetching: true });
      })
      .catch(err => {
        const error =
          err.response && err.response.data && err.response.data.error;
        message.error(error || "Something went wrong");
        this.fetchData();
      });
  };

  renderOption = data =>
    data.map((d, i) => (
      <Option key={d.name} value={i}>
        {d.name}
      </Option>
    ));

  render() {
    const { category } = this.props;
    const { fetching, data, value } = this.state;

    console.log(this.state);

    return (
      <div>
        <Select
          showSearch
          style={{ width: 400 }}
          placeholder="first profile"
          optionFilterProp="children"
          onChange={this.setFirstOrg}
          filterOption={(input, option) =>
            option.props.children.toLowerCase().indexOf(input.toLowerCase()) >=
            0
          }
        >
          {this.renderOption(data)}
        </Select>

        <Select
          showSearch
          style={{ width: 400 }}
          placeholder="second profile"
          optionFilterProp="children"
          onChange={this.setSecondOrg}
          filterOption={(input, option) =>
            option.props.children.toLowerCase().indexOf(input.toLowerCase()) >=
            0
          }
        >
          {this.renderOption(data)}
        </Select>

        <Button>Continue to Modify Profiles</Button>
      </div>
    );
  }
}
