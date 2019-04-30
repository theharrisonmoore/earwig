import React from "react";

const Canteen = props => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 550 500" height={props.height}
  width={props.width} {...props}>
    <path d="M24.91 320.344h78.834l10.643 86.062h9.925v-114.75H26.833l-9.439-153H0v267.75h17.394z" fill={props.color || "currentColor"} />
    <path d="M33.469 282.094h86.062c2.639 0 4.781-2.142 4.781-4.781s-2.142-4.781-4.781-4.781H33.469c-2.639 0-4.781 2.142-4.781 4.781s2.142 4.781 4.781 4.781zM515.84 291.656H411.188v114.75h17.097l10.644-86.062h78.833l7.515 86.062h19.785v-267.75h-19.785z" fill={props.color || "currentColor"} />
    <path d="M411.188 277.312a4.782 4.782 0 0 0 4.781 4.781h86.062a4.782 4.782 0 0 0 0-9.562h-86.062a4.782 4.782 0 0 0-4.781 4.781z" fill={props.color || "currentColor"} />
    <path d="M84.925 205.594h77.638v200.812h14.784l11.484-162.562h158.804l11.485 162.562h13.817V205.594h87.2a8.42 8.42 0 0 0 8.425-8.425v-2.275a8.42 8.42 0 0 0-8.425-8.425H84.925a8.42 8.42 0 0 0-8.425 8.425v2.275a8.42 8.42 0 0 0 8.425 8.425zm260.004 0l1.349 19.125H190.179l1.348-19.125h153.402z" fill={props.color || "currentColor"} />
  </svg>
);

export default Canteen;
