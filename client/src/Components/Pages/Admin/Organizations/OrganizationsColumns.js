import React from "react";
import { Link } from "react-router-dom";
import { Button } from "antd";
import Highlighter from "react-highlight-words";

import { GENERAL_ORGS_PROFILE_URL } from "./../../../../constants/naviagationUrls";

import { routes } from "./../../../../constants/adminRoutes";

const { EDITORG } = routes;

export const modifyOrg = { record1: null, record2: null };

export default ({
  category,
  deleteHandler,
  editHandler,
  getColumnSearchProps,
  searchText
}) => {
  const basicInfo = [
    {
      title: category,
      dataIndex: "name",
      key: "name",
      ...getColumnSearchProps("name"),
      render: (text, record) => {
        return (
          <Link to={`${GENERAL_ORGS_PROFILE_URL}/${record._id}`}>
            <span style={{ fontWeight: "700", textTransform: "capitalize" }}>
              <Highlighter
                highlightStyle={{ backgroundColor: "#ffc069", padding: 0 }}
                searchWords={[searchText]}
                autoEscape
                textToHighlight={text.toString()}
              />
            </span>
          </Link>
        );
      }
    }
  ];

  if (category !== "worksite") {
    basicInfo.push({
      title: "Website",
      dataIndex: "websiteURL",
      key: "websiteURL",
      ...getColumnSearchProps("websiteURL"),
      render: (text, record) => {
        return (
          <Link to={`${GENERAL_ORGS_PROFILE_URL}/${record._id}`}>
            <span style={{ fontWeight: "700" }}>
              <Highlighter
                highlightStyle={{ backgroundColor: "#ffc069", padding: 0 }}
                searchWords={[searchText]}
                autoEscape
                textToHighlight={text.toString()}
              />
            </span>
          </Link>
        );
      }
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
        key: "phoneNumber",
        ...getColumnSearchProps("phoneNumber"),
        render: (text, record) => {
          return (
            <Link to={`${GENERAL_ORGS_PROFILE_URL}/${record._id}`}>
              <span style={{ fontWeight: "700", textTransform: "capitalize" }}>
                <Highlighter
                  highlightStyle={{ backgroundColor: "#ffc069", padding: 0 }}
                  searchWords={[searchText]}
                  autoEscape
                  textToHighlight={text.toString()}
                />
              </span>
            </Link>
          );
        }
      }
    );
  }

  // if (category === "all") {
  //   basicInfo.push({
  //     title: "Select",
  //     key: "action",
  //     width: "13rem",
  //     render: (text, record) => {
  //       return (
  //         <div>
  //           <div
  //             style={{
  //               display: "flex",
  //               justifyContent: "space-between"
  //             }}
  //           >
  //             {/* <Link
  //               to={{
  //                 pathname: "/modify-org",
  //                 state: {
  //                   record
  //                 }
  //               }}
  //             > */}
  //             <Button
  //               onClick={handleClick}
  //               type="primary"
  //               ghost
  //               style={{
  //                 paddingLeft: "0.5rem",
  //                 paddingRight: "0.5rem"
  //               }}
  //             >
  //               Select
  //             </Button>
  //             {/* </Link> */}
  //           </div>
  //         </div>
  //       );
  //     }
  //   });
  //   return basicInfo;
  // }

  basicInfo.push({
    title: "Action",
    key: "action",
    width: "13rem",
    render: (text, record) => {
      return (
        <div>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between"
            }}
          >
            <Link
              to={{
                pathname: EDITORG,
                state: {
                  record
                }
              }}
            >
              <Button
                type="primary"
                ghost
                style={{
                  paddingLeft: "0.5rem",
                  paddingRight: "0.5rem"
                }}
              >
                Edit
              </Button>
            </Link>
            <Button
              ghost
              type={record.active ? "danger" : "primary"}
              onClick={() =>
                deleteHandler({ id: record._id, active: !record.active })
              }
              style={{
                color: record.active ? "red" : "",
                paddingLeft: "0.5rem",
                paddingRight: "0.5rem"
              }}
            >
              {record.active ? "Deactivate" : "Activate"}
            </Button>
          </div>
        </div>
      );
    }
  });
  return basicInfo;
};
