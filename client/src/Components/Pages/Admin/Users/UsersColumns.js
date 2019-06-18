import React from "react";

import { Tag, Button, Icon } from "antd";
import Highlighter from "react-highlight-words";

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
      key: "userId",
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
      title: "Email",
      dataIndex: "email",
      key: "email",
      render: text => (
        <Highlighter
          highlightStyle={{ backgroundColor: "#ffc069", padding: 0 }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text.toString()}
        />
      ),
      ...getColumnSearchProps("email")
    },
    {
      title: "City/town",
      dataIndex: "city",
      key: "city",
      render: text => (
        <Highlighter
          highlightStyle={{ backgroundColor: "#ffc069", padding: 0 }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text.toString()}
        />
      ),
      ...getColumnSearchProps("city")
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
