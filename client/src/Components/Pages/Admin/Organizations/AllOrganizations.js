import React, { Component } from "react";
import axios from "axios";

import { Table, Modal, message, Input, Icon, Button, Select } from "antd";

import OrganizationsColumns from "./OrganizationsColumns";

// styling
import {
  AddOrgTitle,
  AddHeader,
  AddOrgWrapper,
  AddOrgForm,
  InputLabel,
  InputDiv,
  ErrorMsg
} from "./Organizations.style";

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

  handleSubmit = e => {
    const { fields } = this.state;
    e.preventDefault();
    const isValid = this.handleValidation();

    if (isValid) {
      // tidy organisation name
      const cleanedName =
        fields.name
          .toLowerCase()
          .charAt(0)
          .toUpperCase() + fields.name.slice(1);
      fields.name = cleanedName;

      const newOrgs = fields;

      axios
        .post("/api/admin/organizations/add", { newOrgs })
        .then(() => {
          this.fetchData();
          this.setState({ fields: {} });
          message.success("Organization successfully added");
        })
        .catch(err => {
          const error =
            err.response && err.response.data && err.response.data.error;
          message.error(error || "Something went wrong");
        });
    }

  };

  handleInput = e => {
    const { fields } = this.state;
    fields[e.target.name] = e.target.value;
    this.setState({
      fields
    });
  };

  handleSelect = (name, value) => {
    const { fields } = this.state;
    fields[name] = value;
    this.setState({
      fields
    });
  };

  handleValidation = () => {
    const { fields } = this.state;
    const errors = {};
    let formIsValid = true;

    if (!fields.name) {
      formIsValid = false;
      errors.nameError = "* Organization name is required";
    }

    if (!fields.category) {
      formIsValid = false;
      errors.categoryError = "* Category is required";
    }

    this.setState({
      errors
    });
    return formIsValid;
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
    const { addingOrg, fields, errors, msg } = this.state;
    const { nameError, categoryError } = errors;
    const { name, phoneNumber, email, websiteURL } = fields;
    const { Option } = Select;

    return (
      <div>
        <AddOrgWrapper>
          <AddHeader>
            <Button
              onClick={this.toggleAddOrgForm}
              type={addingOrg ? "danger" : "primary"}
            >
              {addingOrg ? "Cancel changes" : "Add organization"}
            </Button>
          </AddHeader>
          {addingOrg && (
            <AddOrgForm>
              <InputDiv>
                <InputLabel>Name:*</InputLabel>
                <Input
                  placeholder="Name"
                  style={{ width: "70%" }}
                  name="name"
                  value={name}
                  onChange={this.handleInput}
                />
              </InputDiv>
              {nameError && <ErrorMsg>{nameError}</ErrorMsg>}
              <InputDiv>
                <InputLabel>Category:*</InputLabel>
                <Select
                  placeholder="Category"
                  style={{ width: "70%" }}
                  value={fields.category}
                  onChange={value => this.handleSelect("category", value)}
                >
                  <Option value="agency">Agency</Option>
                  <Option value="company">Company</Option>
                  <Option value="worksite">Worksite</Option>
                  <Option value="payroll">Payroll</Option>
                </Select>
              </InputDiv>
              {categoryError && <ErrorMsg>{categoryError}</ErrorMsg>}
              <InputDiv>
                <InputLabel>Phone:</InputLabel>
                <Input
                  placeholder="Phone Number"
                  style={{ width: "70%" }}
                  name="phoneNumber"
                  value={phoneNumber}
                  onChange={this.handleInput}
                />
              </InputDiv>
              <InputDiv>
                <InputLabel>E-mail:</InputLabel>
                <Input
                  placeholder="E-mail"
                  style={{ width: "70%" }}
                  name="email"
                  value={email}
                  onChange={this.handleInput}
                />
              </InputDiv>
              <InputDiv>
                <InputLabel>Website:</InputLabel>
                <Input
                  placeholder="Enter full Url (incl. https:// )"
                  style={{ width: "70%" }}
                  name="websiteURL"
                  value={websiteURL}
                  onChange={this.handleInput}
                />
              </InputDiv>
              <Button
                onClick={this.handleSubmit}
                type="primary"
                style={{ marginTop: "1rem" }}
              >
                Add Organization
              </Button>
              <ErrorMsg>{msg}</ErrorMsg>
            </AddOrgForm>
          )}
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
