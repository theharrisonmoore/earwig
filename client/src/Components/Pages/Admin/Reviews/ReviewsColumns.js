import React from "react";

import { Link } from "react-router-dom";

import { Tag, Button } from "antd";
import Highlighter from "react-highlight-words";

import { GENERAL_ORGS_PROFILE_URL } from "./../../../../constants/naviagationUrls";

export default ({
  deletHandler,
  viewHandler,
  getColumnSearchProps,
  searchText
}) => {
  return [
    {
      title: "User Id",
      dataIndex: "userId",
      key: "user.userIduserId",
      render: text => (
        <span style={{ fontWeight: "700" }}>
          <Highlighter
            highlightStyle={{ backgroundColor: "#ffc069", padding: 0 }}
            searchWords={[searchText]}
            autoEscape
            textToHighlight={text.toString()}
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
              textToHighlight={text.toString()}
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
      title: "Action",
      key: "action",
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
                    pathname: `${record._id}`,
                    state: {
                      name: record.organization,
                      category: record.orgType,
                      userEmail: record.user.email,
                      userID: record.user.userId,
                      rating: text.rate,
                      overallRev: text.overallReview,
                      revID: text._id,
                      isVerified: text.isVerified
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
