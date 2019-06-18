import React, { Component } from "react";
import axios from "axios";

import { Table, Modal, message, Input, Icon, Button } from "antd";

import VerifyUser from "./VerifyUser";

import userColumns from "./UsersColumns";

export default class AllUsers extends Component {
  state = {
    data: [],
    visible: false,
    id: "",
    searchText: ""
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

  showDrawer = id => {
    this.setState({
      visible: true,
      id
    });
  };

  closeDrawer = () => {
    this.setState({
      visible: false
    });
  };

  showDeleteConfirm = id => {
    Modal.confirm({
      title: "Are you sure delete this user?",
      okText: "Yes",
      okType: "danger",
      cancelText: "Cancel",
      onOk: () => {
        return new Promise((resolve, reject) => {
          axios
            .delete(`/api/admin/users`, {
              data: { id }
            })
            .then(() => {
              message.success("Deleted");
              this.fetchData();
              resolve();
            })
            .catch(err => {
              const error =
                err.response && err.response.data && err.response.data.error;
              message.error(error || "Something went wrong");
              this.fetchData();
            });
        });
      }
    });
  };

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.awaitingReview !== this.props.awaitingReview) {
      this.fetchData();
    }
  }

  fetchData = () => {
    const query = this.props.awaitingReview ? "?awaitingReview=true" : "";
    axios
      .get(`/api/admin/users${query}`)
      .then(res => {
        this.setState({ data: res.data });
      })
      .catch(err => {
        const error =
          err.response && err.response.data && err.response.data.error;
        message.error(error || "Something went wrong");
      });
  };

  componentDidMount() {
    this.fetchData();
  }

  render() {
    return (
      <>
        <Table
          columns={userColumns({
            deletHandler: this.showDeleteConfirm,
            viewHandler: this.showDrawer,
            getColumnSearchProps: this.getColumnSearchProps
          })}
          dataSource={this.state.data}
          style={{ backgroundColor: "#ffffff" }}
          bordered
        />
        {this.state.visible && (
          <VerifyUser
            visible={this.state.visible}
            closeDrawer={this.closeDrawer}
            userId={this.state.id}
            updateData={this.fetchData}
          />
        )}
      </>
    );
  }
}
