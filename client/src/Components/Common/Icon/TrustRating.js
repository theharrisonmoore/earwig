import React from "react";

const TrustRating = props => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 487.4 487.4"
    height={props.height}
    width={props.width}
    {...props}
  >
    <path
      d="M378.6 107.39c9.9 0 19.6-2.6 28.1-7.7l80.7-47.7v-22.3l-90.8 52.9c-6.9 4-14.7 6.1-22.6 6l-120.2-1.4c-6-2.2-10.8-3.6-12.6-4.3-37.6-8.4-67-5.1-87 .3-15 4-31 2.5-45.2-4l-109-50v199.8l11.3 6.2c16.7 9.1 30 23.2 38.3 40.3l-6.4 5.2c-17.2 12.5-20.9 36.7-9.6 53.8 6.3 8.3 15.2 13.6 25.4 15.4 1.2.1 3 .2 4.3.2 3.7.2 7.3-.2 10.4-.7.2 8.6 2.2 16 7.3 23 6.8 9.5 17.6 13.8 29.2 14.4 3 .2 6.1.3 8.5.5-1.1 9.1 1.5 18.4 7.2 26 6.3 8.3 15.2 13.6 25.4 15.4 1.2.1 3 .2 4.3.2 9.1.5 17.8-2.1 24.8-7.2l3.8-2.9c.9 5.5 2.5 10.5 5.9 15 5.1 7 12.8 11.7 21.9 13.4 1.2.1 2.4.1 3.7.2 7.3.4 14.7-1.7 21.1-6.2h.6l4.5 6.3c7.9 11.4 24.3 14.1 35.7 6.2 9.5-6.8 13.3-20.1 9-30.7l.8 1.2c7.5 11.1 21.7 15.9 34.1 10.8 13.7-5.6 19.2-20.4 15.6-33.1 9.2 10.3 25 12.3 36.4 4.4l.6-.6c11.4-7.9 14.7-23 8.6-35 9.9 9.1 25.7 10.5 37.1 2.6 13.3-9.7 16.8-28.4 7.1-41.8l-14.2-20.3 30.9-36c8.1-9.5 17.8-17.5 28.6-23.8l15.2-8.8v-23.8l-21 11.9c-12 6.8-22.8 15.6-31.8 26.1l-33.2 38.5c-9.9-9.1-25.7-10.5-37.1-2.6-13.3 9.7-16.8 28.4-7.1 41.8l.5 1.3h-.6c-9.4-6.6-22.2-7.3-32.3-.5l-.6.6c-8.9 6.2-13.1 17-11.2 27.5l-3.2 2.3c-8.9-4.7-19.9-4.7-28.8 1.5-8.2 5.7-12.4 15.8-11.7 25l-8.8 5.6c-6.6-1.6-14-.1-19.7 3.8-7 5.1-11.1 13.5-10.9 21.4l-4.4 2.8c-2.6 2.3-6.9 3.3-10.5 2.5s-7.2-2.8-9.5-6c-2.3-2.6-3.3-6.9-2.5-10.5s2.8-7.2 6-9.5l47.7-35.9c2.5-1.7 3.9-4.1 4-7.1.3-5.5-4.4-10.2-9.8-10.2-2.1 0-3.8.5-5.6 1.5l-76.2 55.2c-4.4 2.8-9.4 4.4-14.8 3.5-5.4-.9-10.2-3.6-13-8-6.3-8.3-4.4-21 4.5-27.2l90.8-64.8c2-1.8 3.4-4.3 3.4-7.6.1-5.2-4.2-9.6-9.4-9.8-3-.1-5.4 1-7.4 3.3l-88.9 64.3c-2.5 1.1-3.8 2.9-5.7 4.6-10.7 6.8-26.5 5.3-32.2-2.3-5.7-8.2-4.5-19.2 2.6-26.1l8.9-6.2 98.8-67.4c2.5-1.7 3.9-4.1 4-7.1.2-3.3-1.4-6.4-4.1-8.3-3.5-2.5-7-2.6-10.7-.4l-105.8 71.9c-.7 1.2-1.9 1.7-2.6 2.3l-10.2 7.4c-8.3 6.3-21 4.4-27.2-4.5-6.3-8.3-4.4-21 4.5-27.2l199.5-146.9c16 9.4 27.8 28.3 27.8 28.3 19.6 61.4 44 61.9 58.8 54.5 7.7-3.8 11.2-12.9 8.5-21.1-7.8-23.7-12.3-69.6-12.3-69.6-5.5-11.9-23.1-24.4-42.7-34.6l64.1 1 20.3-.4z"
      fill={props.color || "currentColor"}
    />
  </svg>
);

export default TrustRating;
