import React from "react";

const AmountExpected = props => (
  <svg
    height={props.height}
    width={props.width}
    viewBox="0 0 45 45"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <g opacity="0.498163">
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M33.25 0H4.75C2.1375 0 0 2.16 0 4.8V43.2C0 45.84 2.1375 48 4.75 48H33.25C35.8625 48 38 45.84 38 43.2V4.8C38 2.16 35.8625 0 33.25 0ZM33.25 14.4H4.75V4.8H33.25V14.4ZM7.125 24H11.875V19.2H7.125V24ZM21.375 24H16.625V19.2H21.375V24ZM7.125 33.6H11.875V28.8H7.125V33.6ZM21.375 33.6H16.625V28.8H21.375V33.6ZM7.125 43.2H11.875V38.4H7.125V43.2ZM21.375 43.2H16.625V38.4H21.375V43.2ZM26.125 24H30.875V19.2H26.125V24ZM30.875 33.6H26.125V28.8H30.875V33.6ZM26.125 43.2H30.875V38.4H26.125V43.2Z"
        fill={props.color || "currentColor"}
      />
      <rect
        x="26"
        y="7"
        width="5"
        height="5"
        fill={props.color || "currentColor"}
      />
    </g>
  </svg>
);

export default AmountExpected;
