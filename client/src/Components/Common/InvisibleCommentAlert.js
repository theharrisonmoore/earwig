import React from "react";

import { Alert } from "antd";

export default function InvisibleCommentAlert() {
  return (
    <div>
      <Alert
        message="Your reply will be shown publicly as soon as we've checked your verification photo."
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
