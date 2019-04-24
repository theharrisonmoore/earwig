import React from "react";

const Add = props => (
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 52 52" style="enable-background:new 0 0 52 52" height={props.height} width={props.width} {...props}>
  <path d="M26 0C11.664 0 0 11.663 0 26s11.664 26 26 26 26-11.663 26-26S40.336 0 26 0zm0 50C12.767 50 2 39.233 2 26S12.767 2 26 2s24 10.767 24 24-10.767 24-24 24z" fill={props.color || "currentColor"}/>
  <path d="M38.5 25H27V14a1 1 0 1 0-2 0v11H13.5a1 1 0 1 0 0 2H25v12a1 1 0 1 0 2 0V27h11.5a1 1 0 1 0 0-2z" fill={props.color || "currentColor"}/>
</svg>
);

export default Add;
