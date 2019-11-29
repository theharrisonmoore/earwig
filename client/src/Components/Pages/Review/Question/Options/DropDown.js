import React, { Component } from "react";
// import { Map } from "immutable";
import { Modal, Alert } from "antd";
import axios from "axios";

import { QuestionOptionsWrapper, Options, Input } from "../Question.style";

import Select from "../../../../Common/Select";

class DropDown extends Component {
  state = {
    newOrg: "",
    ismodalVisible: false,
    dropdownOptions: [],
    confirmLoading: false,
    newOrgSuccess: false,
    newOrgError: "",
    // disableSelect: false,
  };

  componentDidMount() {
    const { dropdownOptions } = this.props;

    this.setState({ dropdownOptions });
  }

  // shouldComponentUpdate(nextProps, nextState) {
  //   const sameProps = Map(this.props).equals(Map(nextProps));
  //   const sameState = Map(this.state).equals(Map(nextState));
  //   if (sameProps && sameState) {
  //     return false;
  //   }
  //   return true;
  // }

  addedOrgCategory = category => {
    switch (category) {
      case "agency":
        return "payroll";
      case "payroll":
        return "agency";
      case "worksite":
        return "company";
      default:
        return category;
    }
  };

  showModal = e => {
    const { searchTerm } = e.target.dataset;
    this.setState({
      ismodalVisible: true,
      newOrg: searchTerm,
    });
  };

  handleOk = async () => {
    const { dropdownOptions } = this.state;

    const { number, category, handleAddNewOrgChange } = this.props;

    if (this.state.newOrg && this.state.newOrg.length >= 3) {
      this.setState(
        {
          confirmLoading: true,
        },
        async () => {
          try {
            const res = await axios.post("/api/organizations", {
              name: this.state.newOrg,
              active: false,
              category: this.addedOrgCategory(category),
            });
            const { data } = res;
            const addedOrg = {
              _id: data._id,
              name: data.name,
            };

            this.setState({
              newOrg: data.name,
              // disableSelect: true,
              dropdownOptions: [...dropdownOptions, addedOrg],
            });

            handleAddNewOrgChange(JSON.stringify(addedOrg), number);

            this.setState(
              {
                newOrgSuccess: true,
              },
              () => {
                setTimeout(() => {
                  this.setState({
                    newOrgSuccess: false,
                    ismodalVisible: false,
                    confirmLoading: false,
                    newOrg: data.name,
                  });
                }, 1000);
              }
            );
          } catch (err) {
            this.setState(
              {
                newOrgSuccess: false,
                newOrgError: err.response.data.error,
              },
              () => {
                setTimeout(() => {
                  this.setState({
                    ismodalVisible: false,
                    confirmLoading: false,
                  });
                }, 1000);
              }
            );
          }
        }
      );
    } else if (this.state.newOrg.length < 3) {
      this.setState({
        newOrgError: "Organization name must be at least 3 characters long",
      });
    }
  };

  addNewOrgHandler = e => {
    const { name, value } = e.target;
    const { dropdownOptions } = this.state;
    this.setState({
      dropdownOptions: [...dropdownOptions, { [name]: value }],
      newOrg: value,
    });
  };

  handleCancel = () => {
    this.setState({
      ismodalVisible: false,
      newOrgSuccess: false,
      newOrgError: "",
      newOrg: "",
    });
  };

  handleChange = value => {
    const { fields } = this.state;
    this.setState({ newOrg: value, fields: { ...fields, newOrg: value } });
  };

  handleInput = event => {
    const { name, value } = event.target;
    const { fields } = this.state;
    fields[name] = value;
    this.setState({ fields });
  };

  addOrgType = category => {
    switch (category) {
      case "agency":
        return "payroll";
      case "payroll":
        return "agency";
      case "worksite":
        return "main contractor";
      default:
        return category;
    }
  };

  render() {
    const { number, handleAddNewOrgChange, category, label } = this.props;
    const {
      ismodalVisible,
      confirmLoading,
      newOrg,
      dropdownOptions,
    } = this.state;

    return (
      <QuestionOptionsWrapper>
        <Options>
          <Select
            showSearch
            placeholder={label}
            id="newOrg"
            name="newOrg"
            options={dropdownOptions}
            handleChange={value => {
              this.setState({ newOrg: value });
              handleAddNewOrgChange(value, number);
            }}
            value={newOrg}
            // disabled={this.state.disableSelect}
            isCreateNew
            addHandler={this.showModal}
            scrollToTop
          />
          <div>
            <Modal
              title={`Add a new ${this.addOrgType(category)}`}
              visible={ismodalVisible}
              onOk={this.handleOk}
              confirmLoading={confirmLoading}
              onCancel={this.handleCancel}
            >
              {this.state.newOrgError && (
                <>
                  <Alert
                    message={this.state.newOrgError}
                    type="error"
                    showIcon
                  />
                  <br />
                </>
              )}
              {this.state.newOrgSuccess && (
                <>
                  <Alert
                    message={`A new ${this.addOrgType(
                      category
                    )} added successfully`}
                    type="success"
                    showIcon
                  />
                  <br />
                </>
              )}
              <Input
                autoFocus
                placeholder={`Add a new ${this.addOrgType(category)}`}
                allowClear
                name="newOrg"
                onChange={this.addNewOrgHandler}
                value={newOrg}
              />
            </Modal>
          </div>
        </Options>
      </QuestionOptionsWrapper>
    );
  }
}

export default DropDown;
