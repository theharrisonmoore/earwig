import React from "react";

import { Button, Icon } from "antd";

export default ({ category, deletHandler, editHandler }) => {
  const basicInfo = [
    {
      title: category,
      dataIndex: "name",
      key: "name",
      render: text => <span style={{ fontWeight: "700" }}>{text}</span>
    }
  ];

  if (category !== "worksite") {
    basicInfo.push({
      title: "Website",
      dataIndex: "websiteURL",
      key: "websiteURL"
    });
  }

  if (category === "agency" || category === "payroll") {
    basicInfo.push(
      {
        title: "Email",
        dataIndex: "email",
        key: "email"
      },
      {
        title: "Phone",
        dataIndex: "phoneNumber",
        key: "phoneNumber"
      }
    );
  }

  basicInfo.push({
    title: "Action",
    key: "action",
    width: "10rem",
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
              type="primary"
              ghost

              // to be added in sprint 2
              // onClick={() => editHandler(record._id)}
            >
              <Icon type="edit" />
            </Button>
            <Button
              ghost
              type={record.active ? "danger" : "primary"}
              onClick={() =>
                deletHandler({ id: record._id, active: !record.active })
              }
            >
              <Icon
                type={record.active ? "eye-invisible" : "eye"}
                style={{ color: record.active ? "red" : "" }}
              />
            </Button>
          </div>
        </div>
      );
    }
  });
  return basicInfo;
};
