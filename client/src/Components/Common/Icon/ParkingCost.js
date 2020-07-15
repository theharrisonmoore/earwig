import React from "react";

const ParkingCost = props => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="15 15 75 75"
    height={props.height}
    width={props.width}
    {...props}
  >
    <style></style>
    <path
      d="M79.7 85.6H21.9c-3.7 0-6.8-3-6.8-6.8V21c0-3.7 3-6.8 6.8-6.8h57.9c3.7 0 6.8 3 6.8 6.8v57.9c-.1 3.7-3.1 6.7-6.9 6.7z"
      fill="none"
      stroke="#000"
      strokeMiterlimit="10"
    />
    <path
      d="M57.7 36H43v14.2h14.7s10.6-6.9 0-14.2zM65.3 60.9v3.8h6.2v-3.8h-3.1z"
      fill={props.color || "currentColor"}
    />
    <path
      d="M20.3 20.3V81h61.4V20.3H20.3zm39.3 35.2h-17v17.4h-5.3V30.8h22.4l2.7.6s13.7 8.8 0 22.9l-2.8 1.2zm14.1 9.3L72.2 73h-2.6v3.4h-2.4V73h-2.6l-1.5-8.2c-1.1-2.7 0-5.2 0-5.2 2.1-2.4 5.3-2.2 5.3-2.2s3.2-.2 5.3 2.2c0-.1 1.1 2.5 0 5.2z"
      fill={props.color || "currentColor"}
    />
  </svg>
);

export default ParkingCost;
