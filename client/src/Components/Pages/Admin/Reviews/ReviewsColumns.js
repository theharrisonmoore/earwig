import React from "react";

import { Link } from "react-router-dom";

import { Tag, Button } from "antd";

export default ({ deletHandler, viewHandler }) => {
  return [
    {
      title: "User Id",
      dataIndex: "user.userId",
      key: "user.userIduserId",
      render: text => <span style={{ fontWeight: "700" }}>{text}</span>
    },
    {
      title: "Organization",
      dataIndex: "organization.name",
      key: "organization.name"
    },
    {
      title: "Rate",
      dataIndex: "rate",
      key: "rate"
    },
    {
      title: "Status",
      dataIndex: "isVerified",
      key: "isVerified",
      render: text => {
        const color = text === true ? "green" : "gold";
        const status = text === true ? "Verified" : "Unverified";
        return <Tag color={color}>{status}</Tag>;
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
                      name: record.organization.name,
                      category: record.organization.category,
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

// isVerified: false
// organization:
// active: false
// category: "worksite"
// contractor: {name: "MACE", logo: "contractors/contractor1.png"}
// createdAt: "2019-04-22T11:53:50.274Z"
// lastViewed: "2019-01-01T22:00:00.000Z"
// loacation: {lat: 51.5074, long: 0.1278}
// name: "Bournemouth University"
// phoneNumber: "+441582461422"
// updatedAt: "2019-04-22T12:57:59.073Z"
// websiteURL: "https://www.Bournemouth.co.uk/"
// __v: 0
// _id: "5cbdab4ebaf3710a63093edd"
// __proto__: Object
// rate: 1
// user:
// awaitingReview: false
// createdAt: "2019-04-22T11:53:50.122Z"
// email: "level3-2@earwig.com"
// isAdmin: false
// password: "$2a$08$usnG5LGh/Aeo3bHPpfvWNutwPph8ss3NvE7IKg4zIsr7776d8XO5O"
// points: 0
// trade: "5cbdab4dbaf3710a63093e8b"
// updatedAt: "2019-04-22T11:53:50.122Z"
// userId: "ccQo1iQRgO"
// verified: true
// __v: 0
// _id: "5cbdab4ebaf3710a63093ed5"
// __proto__: Object
// _id: "5cbdab4ebaf3710a63093ef0"
