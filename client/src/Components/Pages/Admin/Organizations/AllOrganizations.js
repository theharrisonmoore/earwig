import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

import { Table, Modal, message, Input, Icon, Button } from "antd";

import OrganizationsColumns from "./OrganizationsColumns";

import { routes } from "./../../../../constants/adminRoutes";

// styling
import { AddHeader, AddOrgWrapper } from "./Organizations.style";

const { ADDORG } = routes;

export default class AllOrganizations extends Component {
  state = {
    data: [],
    searchText: "",
    addingOrg: false,
    newOrgs: [],
    fields: {},
    msg: null,
    errors: {}
  };

  getColumnSearchProps = dataIndex => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters
    }) => (
      <div style={{ padding: 8 }}>
        <Input
          ref={node => {
            this.searchInput = node;
          }}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={e =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() => this.handleSearch(selectedKeys, confirm)}
          style={{ width: 188, marginBottom: 8, display: "block" }}
        />
        <Button
          type="primary"
          onClick={() => this.handleSearch(selectedKeys, confirm)}
          icon="search"
          size="small"
          style={{ width: 90, marginRight: 8 }}
        >
          Search
        </Button>
        <Button
          onClick={() => this.handleReset(clearFilters)}
          size="small"
          style={{ width: 90 }}
        >
          Reset
        </Button>
      </div>
    ),
    filterIcon: filtered => (
      <Icon
        type="search"
        style={{ fontSize: "20px", color: filtered ? "#1890ff" : undefined }}
      />
    ),
    onFilter: (value, record) => {
      return record[dataIndex]
        .toString()
        .toLowerCase()
        .includes(value.toLowerCase());
    },
    onFilterDropdownVisibleChange: visible => {
      if (visible) {
        setTimeout(() => this.searchInput.select());
      }
    }
  });

  handleSearch = (selectedKeys, confirm) => {
    confirm();
    this.setState({ searchText: selectedKeys[0] });
  };

  handleReset = clearFilters => {
    clearFilters();
    this.setState({ searchText: "" });
  };

  componentDidMount() {
    this.fetchData();
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.category !== this.props.category) {
      this.fetchData();
    }
  }

  deleteHandler = ({ id, active }) => {
    const { category } = this.props;
    Modal.confirm({
      title: `Are you sure you want to ${
        active ? "deactivate" : "activate"
      } this ${category}?`,
      okText: "Yes",
      okType: "danger",
      cancelText: "Cancel",
      onOk: () => {
        return new Promise((resolve, reject) => {
          axios
            .patch(`/api/admin/organizations`, {
              id,
              active
            })
            .then(() => {
              message.success(active ? "Activated!" : "Deactivated!");
              this.fetchData();
              resolve();
            })
            .catch(() => {
              message.error("Something went wrong!");
              this.fetchData();
              resolve();
            });
        });
      }
    });
  };

  toggleAddOrgForm = () => {
    const { addingOrg } = this.state;
    this.setState({ addingOrg: !addingOrg, newOrgs: [] });
  };

  fetchData = () => {
    const { category } = this.props;
    axios
      .get(`/api/admin/organizations/${category}`)
      .then(({ data }) => {
        this.setState({ data });
      })
      .catch(err => {
        const error =
          err.response && err.response.data && err.response.data.error;
        message.error(error || "Something went wrong");
        this.fetchData();
      });
  };

  render() {
    const { category } = this.props;

    return (
      <div>
        <AddOrgWrapper>
          <AddHeader>
            <Link
              to={{
                pathname: ADDORG,
                state: {
                  category
                }
              }}
            >
              <Button type="primary">Add organization</Button>
            </Link>
          </AddHeader>
        </AddOrgWrapper>
        <Table
          rowClassName={(record, index) => {
            if (!record.active) {
              return "disabled";
            }
          }}
          columns={OrganizationsColumns({
            category,
            getColumnSearchProps: this.getColumnSearchProps,
            searchText: this.state.searchText,
            deleteHandler: this.deleteHandler
          })}
          dataSource={this.state.data}
          style={{ backgroundColor: "#ffffff" }}
          bordered={true}
        />
      </div>
    );
  }
}
