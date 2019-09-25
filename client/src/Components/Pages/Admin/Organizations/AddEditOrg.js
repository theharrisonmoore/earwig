import React, { Component } from "react";
import axios from "axios";

import { message, Input, Button, Select } from "antd";

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

export default class AddEditOrg extends Component {
  state = {
    data: [],
    searchText: "",
    addingOrg: false,
    newOrgs: [],
    fields: {},
    msg: null,
    errors: {}
  };

  componentDidMount() {
    const {
      purpose,
      location,
      record: recordProps,
      purpose: purposeProps
    } = this.props;
    const record = recordProps ? recordProps : location.state;

    if ((purpose === "edit" || purposeProps === "edit") && record) {
      // remove any values that are simply N/A
      const cleanRecord = record;
      const dataArr = Object.entries(cleanRecord);
      // eslint-disable-next-line
      for (const [key, value] of dataArr) {
        if (value === "N/A") delete cleanRecord[key];
      }
      this.setState({ fields: record.record });
    }
  }

  handleSubmit = e => {
    const { fields } = this.state;
    const { purpose } = this.props;
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

      // DECIDE IF EDITING OR ADDING NEW
      if (purpose === "add") {
        const newOrgs = fields;
        axios
          .post("/api/admin/organizations/add", { newOrgs })
          .then(() => {
            this.setState({ fields: {} });
            message.success("Organization successfully added");
          })
          .catch(err => {
            const error =
              err.response && err.response.data && err.response.data.error;
            message.error(error || "Something went wrong");
          });
      } else if (purpose === "edit") {
        const newOrgData = fields;
        axios
          .post("/api/admin/organizations/edit", { newOrgData })
          .then(() => {
            message.success("Organization successfully edited");
          })
          .catch(err => {
            const error =
              err.response && err.response.data && err.response.data.error;
            message.error(error || "Something went wrong");
          });
      }
    }
  };

  handleInput = e => {
    const { fields } = this.state;
    const { name, value } = e.target;
    this.setState({
      fields: { ...fields, [name]: value }
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
    const { purpose } = this.props;
    const { fields } = this.state;
    const errors = {};
    let formIsValid = true;

    if (!fields.name) {
      formIsValid = false;
      errors.nameError = "* Organization name is required";
    }

    if (!fields.category && purpose === "add") {
      formIsValid = false;
      errors.categoryError = "* Category is required";
    }

    this.setState({
      errors
    });
    return formIsValid;
  };

  render() {
    const { fields, errors, msg } = this.state;
    const { nameError, categoryError } = errors;
    const { name, phoneNumber, email, websiteURL } =
      !!Object.keys(fields).length && fields;
    const { Option } = Select;
    const { purpose } = this.props;

    return (
      <AddOrgWrapper>
        <AddHeader>
          <AddOrgTitle>
            {purpose === "add" ? "Add Organization" : "Edit Organisation"}
          </AddOrgTitle>
        </AddHeader>
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
          {purpose === "add" && (
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
          )}
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
          <AddHeader>
            <Button
              onClick={() => this.props.history.goBack()}
              type="danger"
              style={{ marginRight: "1rem" }}
            >
              Cancel changes
            </Button>
            <Button onClick={this.handleSubmit} type="primary">
              {purpose === "add" ? "Add Organization" : "Save changes"}
            </Button>
          </AddHeader>

          <ErrorMsg>{msg}</ErrorMsg>
        </AddOrgForm>
      </AddOrgWrapper>
    );
  }
}
