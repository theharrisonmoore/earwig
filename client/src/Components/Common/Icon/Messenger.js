import React from "react";

export default props => (
  <svg
    enableBackground="new 0 0 24 24"
    height={props.height}
    viewBox="0 0 24 24"
    width={props.width}
    xmlns="http://www.w3.org/2000/svg"
    fill={props.fill}
    {...props}
  >
    <path
      fill={props.fill}
      d="m0 11.111c0 3.496 1.744 6.615 4.471 8.652v4.237l4.086-2.242c1.09.301 2.245.465 3.442.465 6.627 0 12-4.974 12-11.111.001-6.137-5.372-11.112-11.999-11.112s-12 4.974-12 11.111zm10.734-3.112 3.13 3.259 5.887-3.259-6.56 6.962-3.055-3.258-5.963 3.259z"
    />
  </svg>
);
