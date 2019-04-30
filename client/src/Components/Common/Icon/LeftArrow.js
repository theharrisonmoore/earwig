import React from "react";

const Left = props => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    version="1.1"
    id="Capa_1"
    x="0px"
    y="0px"
    height={props.height}
    width={props.width}
    {...props}
    viewBox="0 0 451.847 451.847"
    style={{ enableBackground: `new 0 0 451.847 451.847` }}
    class=""
  >
    <g>
      <g>
        <path
          d="M97.141,225.92c0-8.095,3.091-16.192,9.259-22.366L300.689,9.27c12.359-12.359,32.397-12.359,44.751,0   c12.354,12.354,12.354,32.388,0,44.748L173.525,225.92l171.903,171.909c12.354,12.354,12.354,32.391,0,44.744   c-12.354,12.365-32.386,12.365-44.745,0l-194.29-194.281C100.226,242.115,97.141,234.018,97.141,225.92z"
          data-original="#000000"
          class="active-path"
          data-old_color={props.color || "currentColor"}
          fill={props.color || "currentColor"}
        />
      </g>
    </g>{" "}
  </svg>
);

export default Left;
