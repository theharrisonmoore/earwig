import React from "react";

const ParkingSign = props => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 500 500"
    height={props.height}
    width={props.width}
    {...props}
  >
    <path d="M408 0H51C22.95 0 0 22.95 0 51v357c0 28.05 22.95 51 51 51h357c28.05 0 51-22.95 51-51V51c0-28.05-22.95-51-51-51zM173.4 265.2V357h-45.9V102h109.65c38.25 0 56.1 7.65 71.399 22.95 17.851 15.3 22.95 35.7 22.95 58.65 0 25.5-7.65 45.9-22.95 58.65s-33.149 20.4-71.399 20.4H173.4v2.55z" fill={props.color || "currentColor"} />
    <path d="M173.4 229.5v-91.8h58.65c17.851 0 30.601 5.1 38.25 15.3 7.65 10.2 12.75 17.85 12.75 30.6 0 15.3-5.1 22.95-12.75 33.15-7.649 7.65-17.85 12.75-35.7 12.75h-61.2z" fill={props.color || "currentColor"} />
  </svg>
);

export default ParkingSign;
