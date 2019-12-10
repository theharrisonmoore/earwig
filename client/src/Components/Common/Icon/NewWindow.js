import React from "react";

const NewWindow = props => (

<svg xmlns="http://www.w3.org/2000/svg" height={props.height}
  width={props.width} viewBox="0 0 16 16" {...props}>
  <path d="M14 16V5l-1 1v9H1V3h9l1-1H0v14z" fill={props.color || "currentColor"}/>
  <path d="M16 0h-5l1.8 1.8L6 8.6 7.4 10l6.8-6.8L16 5z" fill={props.color || "currentColor"}/>
</svg>
);

export default NewWindow;