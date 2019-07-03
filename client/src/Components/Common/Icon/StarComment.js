import React from "react";

const StarComment = props => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 512 512"
    height={props.height}
    width={props.width}
    {...props}
  >
    <path
      d="M306 188.504l-34.549-5.021L256 152.177l-15.451 31.306L206 188.504l25 24.369-5.902 34.409L256 231.036l30.902 16.246L281 212.873zM166 188.504l-34.549-5.021L116 152.177l-15.451 31.306L66 188.504l25 24.369-5.902 34.409L116 231.036l30.902 16.246L141 212.873zM446 188.504l-34.549-5.021L396 152.177l-15.451 31.306L346 188.504l25 24.369-5.902 34.409L396 231.036l30.902 16.246L421 212.873z"
      fill={props.color || "currentColor"}
    />
    <path
      d="M0 86.73v229.999h201.729L256 425.271l54.271-108.541H512v-230H0zm482 199.999H291.729L256 358.188l-35.729-71.459H30v-170h452v170z"
      fill={props.color || "currentColor"}
    />
  </svg>
);

export default StarComment;
