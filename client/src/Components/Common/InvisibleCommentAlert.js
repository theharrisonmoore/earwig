import React from "react";

import { Alert } from "antd";

export default function InvisibleCommentAlert() {
  return (
    <div>
      <Alert
        message="Your replies are only visible to you until we've checked your verification photo."
        type="warning"
        style={{
          display: "inline-block",
          marginBottom: "0.5rem",
        }}
        banner
      />
    </div>
  );
}
