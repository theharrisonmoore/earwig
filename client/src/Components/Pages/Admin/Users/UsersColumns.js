import React from "react";
import { Link } from "react-router-dom";

import { Tag, Button, Icon } from "antd";

import { routes } from "./../../../../constants/adminRoutes";
const { USERS_VIEW } = routes;

export default deletHandler => {
  return [
    {
      title: "User Id",
      dataIndex: "userId",
      key: "userId",
      render: text => <span style={{ fontWeight: "700" }}>{text}</span>
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email"
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: text => {
        const color =
          text === "verified"
            ? "green"
            : text === "unverified"
            ? "red"
            : "gold";
        return <Tag color={color}>{text.toUpperCase()}</Tag>;
      }
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
                justifyContent: `${
                  record.status !== "awaiting review"
                    ? "felx-start"
                    : "space-between"
                }`
              }}
            >
              <Button
                ghost
                type="danger"
                onClick={() => deletHandler(record._id)}
              >
                <Icon type="delete" style={{ color: "red" }} />
              </Button>
              {record.status === "awaiting review" && (
                <Link to={`${USERS_VIEW}${record._id}`}>
                  <Button type="primary" ghost>
                    View
                  </Button>
                </Link>
              )}
            </div>
          </div>
        );
      }
    }
  ];
};
