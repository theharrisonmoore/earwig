import React from "react";

const Recent = props => (
  <svg viewBox="0 0 551.13 551.13" xmlns="http://www.w3.org/2000/svg" height={props.height} width={props.width} {...props}>
    <path d="M275.531 172.228l-.05 120.493c0 4.575 1.816 8.948 5.046 12.177l86.198 86.181 24.354-24.354-81.153-81.136.05-113.361z" fill={props.color || "currentColor"}/>
    <path d="M310.011 34.445c-121.23 0-221.563 90.033-238.367 206.674H0l86.114 86.114 86.114-86.114h-65.78C122.925 143.53 207.803 68.891 310.011 68.891c113.966 0 206.674 92.707 206.674 206.674s-92.707 206.674-206.674 206.674c-64.064 0-123.469-28.996-162.978-79.555l-27.146 21.192c46.084 58.968 115.379 92.808 190.124 92.808 132.955 0 241.119-108.181 241.119-241.119S442.966 34.446 310.011 34.445z" fill={props.color || "currentColor"}/>
  </svg>
);

export default Recent;