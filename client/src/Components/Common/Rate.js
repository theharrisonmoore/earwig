import React from "react";
import { Rate as AntdRate } from "antd";

import { colors } from "../../theme";

export default function Rate({ rate }) {
  return (
    <div>
      <AntdRate
        disabled
        value={rate}
        style={{
          color: `${colors.stars}`,
          fontSize: "0.8rem",
        }}
        className="last-reviewed-star-rate"
      />
    </div>
  );
}
