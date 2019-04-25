import React from "react";

const ReportFlag = props => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 60 60"
    height={props.height}
    width={props.width}
    {...props}
  >
    <path d="M46.714 25l10.61-15.434A1.001 1.001 0 0 0 56.5 8h-30V4a1 1 0 0 0-1-1h-21V1a1 1 0 1 0-2 0v58a1 1 0 1 0 2 0V34h11.026a4.948 4.948 0 0 0-1.026 3c0 2.757 2.243 5 5 5h37a1.001 1.001 0 0 0 .824-1.566L46.714 25zM4.5 5h20v27h-20V5zm15 35c-1.654 0-3-1.346-3-3s1.346-3 3-3h6a1 1 0 0 0 1-1V10h28.099l-9.923 14.434a1.002 1.002 0 0 0 0 1.133L54.599 40H19.5z" fill={props.color || "currentColor"} />
  </svg>
);

export default ReportFlag;
