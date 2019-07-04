import React from "react";

const NumberOne = props => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    height={props.height}
    width={props.width}
    viewBox="0 0 405 405"
    {...props}
  >
    <path d="M202.531 0C90.676 0 0 90.678 0 202.535 0 314.393 90.676 405.07 202.531 405.07c111.859 0 202.539-90.678 202.539-202.535S314.391 0 202.531 0zm40.661 312.198c0 8.284-6.716 15-15 15h-27.629c-8.284 0-15-6.716-15-15v-168.35l-17.1 9.231a15.002 15.002 0 0 1-21.665-9.51l-5.459-21.518a15 15 0 0 1 7.461-16.913l47.626-25.491a14.99 14.99 0 0 1 7.078-1.775h24.688c8.284 0 15 6.716 15 15v219.326z" fill={props.color || "currentColor"} />
  </svg>
);

export default NumberOne;
