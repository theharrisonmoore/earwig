import React from "react";

const OtherEmployees = props => (
  <svg
    height={props.height}
    width={props.width}
    viewBox="0 0 45 45"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M20.6649 11V12.5441L20.1753 12.75C19.4897 13.0074 19 13.6765 19 14.5C19 15.2721 19.4897 15.9926 20.1753 16.25L20.6649 16.4044V16.9191C20.7629 21.3456 24.2887 25 28.5 25C32.7113 25 36.2371 21.3971 36.3351 16.9191V16.4044L36.8247 16.25C37.5103 15.9926 38 15.3235 38 14.5C38 13.7279 37.5103 13.0074 36.8247 12.75L36.3351 12.5441V11H20.6649Z"
      fill={props.color || "currentColor"}
    />
    <path
      d="M38.4112 8.73096H36.2523L36.1051 8.17259C35.5164 5.88833 34.0444 4.06091 32.0327 2.99492V4.67005H30.5607V1.9797C30.5607 0.913706 29.7266 0 28.6472 0C27.5678 0 26.7336 0.862944 26.7336 1.9797V4.72081H25.2617V2.8934C23.1519 3.90863 21.5327 5.83756 20.8949 8.22335L20.7477 8.78173H18.5888C18.2453 8.78173 18 9.03553 18 9.39086C18 9.74619 18.2453 10 18.5888 10H20.6495H36.3505H38.4112C38.7547 10 39 9.74619 39 9.39086C39 9.03553 38.7547 8.73096 38.4112 8.73096Z"
      fill={props.color || "currentColor"}
    />
    <path
      d="M6 35L4 35.7009V40H5.95455L6 35Z"
      fill={props.color || "currentColor"}
    />
    <path
      d="M3 36L2.1 36.2591C0.84 36.6736 0 37.7098 0 39.0052V46H3V40.8705V36Z"
      fill={props.color || "currentColor"}
    />
    <rect
      x="19"
      y="40"
      width="20"
      height="6"
      fill={props.color || "currentColor"}
    />
    <path
      d="M41.7778 31.6931L40 31V38.5743V46H45V35.9505C45 34.0198 43.8333 32.4851 41.7778 31.6931Z"
      fill={props.color || "currentColor"}
    />
    <path
      d="M18 31L16.2778 31.6908C14.1667 32.5789 13 34.0592 13 35.9836V41.2632V46H15.5H18V39.4868V31Z"
      fill={props.color || "currentColor"}
    />
    <path
      d="M5.07317 24V24.2581L4.58537 24.4645C4.2439 24.6194 4 24.9806 4 25.3419C4 25.7548 4.2439 26.1161 4.58537 26.2194L5.07317 26.3742V26.8903C5.12195 29.729 7.36585 32 10 32C12.6829 32 14.878 29.729 14.9268 26.8903V26.3742L15.4146 26.2194C15.7561 26.0645 16 25.7032 16 25.3419C16 24.929 15.7561 24.5677 15.4146 24.4645L14.9268 24.2581V24H5.07317Z"
      fill={props.color || "currentColor"}
    />
    <path
      d="M4.83273 23H15.1164H16.6436H16.8473C16.8982 23 17 22.9478 17 22.8433C17 22.791 17 22.1642 17 22.1642C17 22.0597 16.9491 22.0075 16.8473 22.0075H15.1673L14.9636 21.4328C14.6073 20.1269 13.7927 18.9776 12.6727 18.2985V19.3955H11.1455V17.097C11.1455 16.5224 10.6873 16 10.0764 16C9.51636 16 9.00727 16.4701 9.00727 17.097V19.3955H7.48V18.1418C6.25818 18.8209 5.34182 20.0224 4.98545 21.3806L4.83273 21.9552H3.15273C3.05091 21.9552 3 22.0075 3 22.1119C3 22.1642 3 22.791 3 22.8433L3.05091 22.8955L3.25455 22.9478H4.01818H4.83273V23Z"
      fill={props.color || "currentColor"}
    />
    <rect
      x="4"
      y="42"
      width="8"
      height="4"
      fill={props.color || "currentColor"}
    />
    <path
      d="M23 29V38H35V29.0952L28.9742 32L23 29Z"
      fill={props.color || "currentColor"}
    />
    <path
      d="M36 39H39V30.3158L36 29V39Z"
      fill={props.color || "currentColor"}
    />
    <path
      d="M19 39H22V29L19 30.2042V39Z"
      fill={props.color || "currentColor"}
    />
    <path d="M8 40H12V36.9159L8 35V40Z" fill={props.color || "currentColor"} />
  </svg>
);

export default OtherEmployees;
