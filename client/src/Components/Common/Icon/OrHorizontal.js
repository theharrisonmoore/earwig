import React from "react";

const OrHorizontal = props => (
  <svg
    height={props.height}
    width={props.width}
    {...props}
    viewBox="0 0 121 26"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M1 13.5H119.795"
      stroke={props.color || "currentColor"}
      strokeLinecap="square"
    />
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M60 1C66.6274 1 72 6.37258 72 13C72 19.6274 66.6274 25 60 25C53.3726 25 48 19.6274 48 13C48 6.37258 53.3726 1 60 1Z"
      fill="white"
      stroke={props.color || "currentColor"}
    />
    <path
      d="M53.263 13.4648C53.263 12.7357 53.3721 12.1237 53.5902 11.6289C53.7529 11.2643 53.9743 10.9372 54.2542 10.6475C54.5374 10.3577 54.8467 10.1429 55.182 10.0029C55.6279 9.81413 56.1423 9.71973 56.7249 9.71973C57.7796 9.71973 58.6227 10.0469 59.2542 10.7012C59.889 11.3555 60.2064 12.2653 60.2064 13.4307C60.2064 14.5863 59.8923 15.4912 59.264 16.1455C58.6357 16.7965 57.7959 17.1221 56.7445 17.1221C55.68 17.1221 54.8337 16.7982 54.2054 16.1504C53.5771 15.4993 53.263 14.6042 53.263 13.4648ZM54.7523 13.416C54.7523 14.2266 54.9395 14.8418 55.3138 15.2617C55.6882 15.6784 56.1634 15.8867 56.7396 15.8867C57.3158 15.8867 57.7878 15.68 58.1556 15.2666C58.5267 14.8499 58.7122 14.2266 58.7122 13.3965C58.7122 12.5762 58.5316 11.9642 58.1702 11.5605C57.8122 11.1569 57.3353 10.9551 56.7396 10.9551C56.1439 10.9551 55.6637 11.1602 55.2992 11.5703C54.9346 11.9772 54.7523 12.5924 54.7523 13.416ZM61.5107 17V9.8418H64.5527C65.3177 9.8418 65.8727 9.9069 66.2178 10.0371C66.5661 10.1641 66.8444 10.3919 67.0527 10.7207C67.2611 11.0495 67.3652 11.4255 67.3652 11.8486C67.3652 12.3857 67.2074 12.8301 66.8916 13.1816C66.5758 13.5299 66.1038 13.7497 65.4756 13.8408C65.7881 14.0231 66.0452 14.2233 66.2471 14.4414C66.4521 14.6595 66.7272 15.0469 67.0723 15.6035L67.9463 17H66.2178L65.1729 15.4424C64.8018 14.8857 64.5479 14.5358 64.4111 14.3926C64.2744 14.2461 64.1296 14.1468 63.9766 14.0947C63.8236 14.0394 63.5811 14.0117 63.249 14.0117H62.9561V17H61.5107ZM62.9561 12.8691H64.0254C64.7188 12.8691 65.1517 12.8398 65.3242 12.7813C65.4967 12.7227 65.6318 12.6217 65.7295 12.4785C65.8271 12.3353 65.876 12.1563 65.876 11.9414C65.876 11.7005 65.8109 11.5068 65.6807 11.3604C65.5537 11.2106 65.373 11.1162 65.1387 11.0771C65.0215 11.0609 64.6699 11.0527 64.084 11.0527H62.9561V12.8691Z"
      fill={props.color || "currentColor"}
    />
  </svg>
);

export default OrHorizontal;
