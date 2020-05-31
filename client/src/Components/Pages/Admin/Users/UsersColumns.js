import React from "react";

import { Tag, Button, Icon } from "antd";
import Highlighter from "react-highlight-words";

export default ({
  deletHandler,
  viewHandler,
  getColumnSearchProps,
  searchText,
}) => {
  const tableColumns = [
    {
      title: "Username",
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
      ...getColumnSearchProps("userId"),
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
      ...getColumnSearchProps("email"),
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
      ...getColumnSearchProps("city"),
    },
    {
      title: "# of reviews",
      dataIndex: "numOfReviews",
      key: "numOfReviews",
      render: (text = "error") => (
        <Highlighter
          highlightStyle={{ backgroundColor: "#ffc069", padding: 0 }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text.toString()}
        />
      ),
      ...getColumnSearchProps("numOfReviews"),
    },
    {
      title: "points",
      dataIndex: "points",
      key: "points",
      render: (text = "error") => (
        <Highlighter
          highlightStyle={{ backgroundColor: "#ffc069", padding: 0 }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text.toString()}
        />
      ),
      ...getColumnSearchProps("points"),
    },
    {
      title: "helpedUsers",
      dataIndex: "helpedUsers",
      key: "helpedUsers",
      render: (text = "error") => (
        <Highlighter
          highlightStyle={{ backgroundColor: "#ffc069", padding: 0 }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text.toString()}
        />
      ),
      ...getColumnSearchProps("helpedUsers"),
    },
    {
      title: "Signed Up",
      dataIndex: "numOfSignUps",
      key: "numOfSignUps",
      render: (text = "error") => (
        <Highlighter
          highlightStyle={{ backgroundColor: "#ffc069", padding: 0 }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text.toString()}
        />
      ),
      ...getColumnSearchProps("numOfSignUps"),
    },
    {
      title: "Trade",
      dataIndex: "trade",
      key: "trade",
      render: text => (
        <Highlighter
          highlightStyle={{ backgroundColor: "#ffc069", padding: 0 }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text.toString()}
        />
      ),
      ...getColumnSearchProps("trade"),
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
      },
    },
    // {
    //   title: "Works For",
    //   dataIndex: "worksFor",
    //   key: "worksFor",
    //   render: text => (
    //     <Highlighter
    //       highlightStyle={{ backgroundColor: "#ffc069", padding: 0 }}
    //       searchWords={[searchText]}
    //       autoEscape
    //       textToHighlight={text.toString()}
    //     />
    //   ),
    //   ...getColumnSearchProps("worksFor"),
    // },
    // {
    //   title: "Current Org",
    //   dataIndex: "currentOrg",
    //   key: "currentOrg",
    //   render: text => {
    //     if (text !== "N/A") {
    //       return (
    //         <Popover
    //           placement="topLeft"
    //           content={
    //             <div>
    //               <p>Current agency: {text.agency && text.agency.name}</p>
    //               <p>Current company: {text.company && text.company.name}</p>
    //               <p>Current worksite: {text.worksite && text.worksite.name}</p>
    //               <p>Current payroll: {text.payroll && text.payroll.name}</p>
    //             </div>
    //           }
    //         >
    //           <div
    //             style={{
    //               color: "#1890ff",
    //               cursor: "pointer",
    //               textDecoration: "underline",
    //             }}
    //           >
    //             Current Orgs.
    //           </div>
    //         </Popover>
    //       );
    //     }
    //     return (
    //       <Highlighter
    //         highlightStyle={{ backgroundColor: "#ffc069", padding: 0 }}
    //         searchWords={[searchText]}
    //         autoEscape
    //         textToHighlight={text.toString()}
    //       />
    //     );
    //   },
    //   ...getColumnSearchProps("currentOrg"),
    // },
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
                }`,
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
      },
    },
  ];

  return tableColumns;
};
