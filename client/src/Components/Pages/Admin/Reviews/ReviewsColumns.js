import React from "react";
import moment from "moment";
import { Link } from "react-router-dom";

import { Tag, Button } from "antd";
import Highlighter from "react-highlight-words";
import { routes } from "./../../../../constants/adminRoutes";

import { GENERAL_ORGS_PROFILE_URL } from "./../../../../constants/naviagationUrls";

export default ({
  deletHandler,
  viewHandler,
  getColumnSearchProps,
  searchText
}) => {
  return [
    {
      title: "Username",
      dataIndex: "userId",
      key: "user.userIduserId",
      render: text => (
        <span style={{ fontWeight: "700" }}>
          <Highlighter
            highlightStyle={{ backgroundColor: "#ffc069", padding: 0 }}
            searchWords={[searchText]}
            autoEscape
            textToHighlight={text && text.toString()}
          />
        </span>
      ),
      ...getColumnSearchProps("userId")
    },
    {
      title: "Organization",
      dataIndex: "organization",
      key: "organization",
      render: (text, record) => (
        <Link to={`${GENERAL_ORGS_PROFILE_URL}/${record.orgId}`}>
          <span style={{ fontWeight: "700", textTransform: "capitalize" }}>
            <Highlighter
              highlightStyle={{ backgroundColor: "#ffc069", padding: 0 }}
              searchWords={[searchText]}
              autoEscape
              textToHighlight={text && text.toString()}
            />
          </span>
        </Link>
      ),
      ...getColumnSearchProps("organization")
    },
    {
      title: "Org. type",
      dataIndex: "orgType",
      key: "orgType",
      filters: [
        {
          text: "Agency",
          value: "agency"
        },
        {
          text: "Worksite",
          value: "worksite"
        },
        {
          text: "Company",
          value: "company"
        },
        {
          text: "Payroll",
          value: "payroll"
        }
      ],
      onFilter: (value, record) => record["orgType"].indexOf(value) === 0
    },
    {
      title: "Rate",
      dataIndex: "rate",
      key: "rate",
      sorter: (a, b) => a.rate - b.rate,
      sortDirections: ["descend", "ascend"]
    },
    {
      title: "Status",
      dataIndex: "isVerified",
      key: "isVerified",
      render: text => {
        const color = text === true ? "green" : "gold";
        const status = text === true ? "Verified" : "Unverified";
        return <Tag color={color}>{status}</Tag>;
      },
      filters: [
        {
          text: "Verified",
          value: true
        },
        {
          text: "Unverified",
          value: false
        }
      ],
      onFilter: (value, record) => record["isVerified"] === value
    },
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
      render: value => (
        <span>{value && moment(value).format("DD MMM YYYY")}</span>
      ),
      sorter: (a, b) => moment(a.date) - moment(b.date),
      sortDirections: ["descend", "ascend"]
    },
    {
      title: "Action",
      key: "action",
      width: "180px",
      render: (text, record) => {
        return (
          <div>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between"
              }}
            >
              <Button
                ghost
                type="danger"
                onClick={() => deletHandler(record._id)}
                style={{ color: "red" }}
              >
                Delete
              </Button>
              <Button type="primary" ghost>
                <Link
                  to={{
                    pathname: `${routes.REVIEWS_ALL}/${record._id}`,
                    state: {
                      name: record && record.organization,
                      category: record && record.orgType,
                      userEmail: record && record.user.email,
                      userID: record && record.user.userId,
                      rating: text && text.rate,
                      overallRev: text && text.overallReview,
                      revID: text && text._id,
                      isVerified: text && text.isVerified
                    }
                  }}
                >
                  View
                </Link>
              </Button>
            </div>
          </div>
        );
      }
    }
  ];
};
