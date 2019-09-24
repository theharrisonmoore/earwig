import React from "react";
import { Popover } from "antd";

const PopOverWrapper = ({ disabled, children }) => {
  if (disabled) {
    return (
      <Popover
        content="You reviewed this organisation within the last 30 days"
        trigger="click"
        placement="topLeft"
      >
        <div
          style={{ cursor: "not-allowed" }}
          onClick={e => {
            e.stopPropagation();
          }}
        >
          {children}
        </div>
      </Popover>
    );
  }
  return children;
};

export default PopOverWrapper;
