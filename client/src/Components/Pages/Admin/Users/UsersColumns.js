import React from "react";

import { Tag, Button, Icon } from "antd";

export default ({ deletHandler, viewHandler }) => {
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
      title: "City/town",
      dataIndex: "city",
      key: "city",
      render: text => <span>{text || "N/A"}</span>
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
                <Button
                  type="primary"
                  ghost
                  onClick={() => viewHandler(record._id)}
                >
                  View
                </Button>
              )}
            </div>
          </div>
        );
      }
    }
  ];
};
