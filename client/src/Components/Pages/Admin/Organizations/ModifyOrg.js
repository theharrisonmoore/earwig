import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

// import { Table, Modal, message, Input, Icon, Button } from "antd";

import { Select, Spin, message, Button, Transfer } from "antd";

import OrganizationsColumns from "./OrganizationsColumns";

import { routes } from "./../../../../constants/adminRoutes";

// styling

const { Option } = Select;

export default class AllOrganizations extends Component {
  state = {
    data: [],
    value: [],
    fetching: false,
    dropDownSelection: [],
    targetKeys: [],
    orgSelection: [],
    reviewsOrgSelection: [],
    reviewsTargetKeys: [],
    selectedKeys: []
  };

  componentDidMount() {
    this.fetchData();
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.category !== this.props.category) {
      this.fetchData();
    }
  }

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

  renderSelectField = (placeholder, orgArray) => (
    <Select
      showSearch
      style={{ width: 400 }}
      placeholder={`${placeholder}`}
      optionFilterProp="children"
      onChange={this.setOrgs}
      filterOption={(input, option) =>
        option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
      }
    >
      {orgArray.map((d, i) => (
        <Option key={d.name} value={i}>
          {d.name}
        </Option>
      ))}
    </Select>
  );

  setOrgs = e => {
    // const obj = {key: e, content: this.state.data[e]}
    const obj = { key: this.state.data[e]._id, org: this.state.data[e] };

    this.setState({
      dropDownSelection: [...this.state.dropDownSelection, obj]
    });
  };

  handleClick = () => {
    const apiCall1 = () =>
      axios.get(
        `/api/admin/organizations/reviews/${
          this.state.dropDownSelection[0].key
        }`
      );
    const apiCall2 = () =>
      axios.get(
        `/api/admin/organizations/reviews/${
          this.state.dropDownSelection[1].key
        }`
      );

    axios
      .all([apiCall1(), apiCall2()])
      .then(result => {
        console.log("heyy", result);
        // this.setState({
        //   reviewsOrgSelection: result[0].data,
        //   reviewsTargetKeys: result[1].data
        // });
      })
      .catch(err => console.log(err));

    const targetKeys = [];

    const orgSelection = [];

    for (let i = 0; i < this.state.dropDownSelection.length; i++) {
      const data = this.state.dropDownSelection[i];
      if (i === 0) {
        targetKeys.push(data.key);
      }
      orgSelection.push(data);
    }
    this.setState({ orgSelection, targetKeys });

    // const oriTargetKeys = orgSelection.map(e => e);
    // console.log(oriTargetKeys);

    // this.setState({ targetKeys: [...this.state.targetKeys, oriTargetKeys] });
  };

  handleChange = (targetKeys, direction, moveKeys) => {
    console.log(targetKeys, direction, moveKeys);
    this.setState({ targetKeys });
  };

  renderItem = item => {
    const customLabel = <span className="custom-item">{item.org.name}</span>;
    return {
      label: customLabel,
      value: item.org.name
    };
  };

  render() {
    // const { category } = this.props;
    const { data } = this.state;

    console.log(this.state);

    return (
      <div>
        <h3>Source</h3>
        {this.renderSelectField("select first option", data)}
        <h3>Target</h3>
        {this.renderSelectField("select second option", data)}

        <Button onClick={this.handleClick}>click</Button>

        {this.state.targetKeys.length > 0 && (
          <Transfer
            dataSource={this.state.orgSelection}
            targetKeys={this.state.targetKeys}
            titles={[
              `${this.state.orgSelection[0].org.name}`,
              `${this.state.orgSelection[1].org.name}`
            ]}
            listStyle={{
              width: 300,
              height: 300
            }}
            render={this.renderItem}
            // rowKey={record => record.uid}
          />
        )}
      </div>
    );
  }
}
