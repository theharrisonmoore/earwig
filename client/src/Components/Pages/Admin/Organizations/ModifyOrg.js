import React, { Component } from "react";
import axios from "axios";
import { message, Button, Modal, Icon } from "antd";

import CustomizedSelects from "./../../../Common/Select";
import { SelectsWrapper, Paragraph } from "./Organizations.style";

const { confirm } = Modal;

const profileTypes = [
  { label: "Company", value: "company" },
  { label: "Agency", value: "agency" },
  { label: "Payroll", value: "payroll" },
  { label: "Worksite", value: "worksite" }
];
const initialState = {
  orgType: "",
  organisations: [],
  toMergeProfileId: "",
  toMergeProfileIntoId: "",
  mergeProfileDataReviews: [],
  toMergeProfile: {},
  toMergeProfileInto: {}
};

export default class AllOrganizations extends Component {
  state = initialState;

  handleChange = (key, value) => {
    this.setState({ [key]: value, toMergeProfile: {}, toMergeProfileInto: {} });
  };

  handleSearch = () => {
    const {
      toMergeProfileId,
      toMergeProfileIntoId,
      organisations
    } = this.state;

    if (toMergeProfileId && toMergeProfileIntoId && organisations.length) {
      const [toMergeProfile] = organisations.filter(
        org => org._id === toMergeProfileId
      );

      const [toMergeProfileInto] = organisations.filter(
        org => org._id === toMergeProfileIntoId
      );

      confirm({
        title: "Are you sure merge these two profiles?",
        content: (
          <div>
            <Paragraph
              style={{
                textAlign: "left",
                fontSize: "14px",
                marginBottom: "0.5rem"
              }}
            >
              you're about to merge <span>{toMergeProfile.name}</span> into{" "}
              <span>{toMergeProfileInto.name}</span>
            </Paragraph>
            <Paragraph
              style={{
                textAlign: "left",
                fontSize: "14px",
                marginBottom: "0.5rem"
              }}
            >
              this will delete <span>{toMergeProfile.name}</span> profile
            </Paragraph>
            <Paragraph
              style={{
                textAlign: "left",
                fontSize: "14px",
                marginBottom: "0.5rem"
              }}
            >
              reviews will be transfered to{" "}
              <span>{toMergeProfileInto.name}</span>
            </Paragraph>
          </div>
        ),
        okText: "merge",
        okType: "danger",
        cancelText: "cancel",
        onOk: () => {
          this.mergeProfiles();
        }
      });

      this.setState({ toMergeProfile, toMergeProfileInto });
    }
  };

  mergeProfiles = () => {
    const { toMergeProfileId, toMergeProfileIntoId } = this.state;
    axios
      .put(
        `/api/admin/organisations/merge?toMergeProfileId=${toMergeProfileId}&toMergeProfileIntoId=${toMergeProfileIntoId}`
      )
      .then(res => {
        message.success("Merged");
        this.resetState();
      })
      .catch(err => {
        const error =
          err.response && err.response.data && err.response.data.error;
        message.error(error || "Something went wrong");
      });
  };

  resetState = () => {
    const { orgType } = this.state;
    this.setState({ ...initialState, orgType }, () => this.fetchOrgs(orgType));
  };

  componentDidUpdate(prevProps, prevState) {
    const { orgType: oldOrgType } = prevState;
    const { orgType } = this.state;
    if (oldOrgType !== orgType) {
      this.fetchOrgs(orgType);
    }
  }

  // get all profiles based on profile type
  fetchOrgs = orgType => {
    axios
      .get(`/api/admin/organizations/${orgType}`)
      .then(({ data }) => {
        this.setState({
          organisations: data,
          fetching: true,
          toMergeProfileId: "",
          toMergeProfileIntoId: ""
        });
      })
      .catch(err => {
        const error =
          err.response && err.response.data && err.response.data.error;
        message.error(error || "Something went wrong");
      });
  };

  render() {
    const {
      organisations,
      toMergeProfileId,
      toMergeProfileIntoId,
      orgType
    } = this.state;

    const organsiationsIds = organisations.map(org => ({
      label: org.name,
      value: org._id
    }));
    return (
      <div>
        <h1>Merging Profiles</h1>
        <h3 style={{ marginTop: "3rem" }}>Select profiles type</h3>
        <div style={{ margin: "0 auto", width: "200px" }}>
          <CustomizedSelects
            options={profileTypes}
            handleChange={value => this.handleChange("orgType", value)}
            placeholder="Select the profile type"
            showSearch
            value={orgType}
          />
        </div>

        {this.state.orgType && (
          <SelectsWrapper>
            <div>
              <Paragraph style={{ fontSize: "1rem" }}>
                select the profile you want <span>to merge</span>
              </Paragraph>
              <CustomizedSelects
                options={organsiationsIds.filter(
                  item => item.value !== toMergeProfileIntoId
                )}
                handleChange={value =>
                  this.handleChange("toMergeProfileId", value)
                }
                placeholder="Select the profile you want to merge"
                showSearch
                value={toMergeProfileId}
              />
            </div>
            <Icon
              type="double-right"
              rotate="90"
              style={{ color: "#00a8ff", fontSize: "20px" }}
            />
            <div>
              <Paragraph style={{ fontSize: "1rem" }}>
                select the profile you want <span>to merge into</span>
              </Paragraph>
              <CustomizedSelects
                options={organsiationsIds.filter(
                  item => item.value !== toMergeProfileId
                )}
                handleChange={value =>
                  this.handleChange("toMergeProfileIntoId", value)
                }
                placeholder="Select the profile you want to merge into"
                showSearch
                value={toMergeProfileIntoId}
              />
            </div>
            <div>
              <Button
                onClick={this.handleSearch}
                type="primary"
                style={{ fontSize: "20px" }}
                size="large"
              >
                {" "}
                <Icon type="fork" />
                Merge
              </Button>
            </div>
          </SelectsWrapper>
        )}
      </div>
    );
  }
}
