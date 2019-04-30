import React from "react";

const Water = props => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 224.827 224.827" height={props.height}
  width={props.width} {...props}>
  <path d="M205.153 127.687v12.744c0 4.143-3.357 7.5-7.5 7.5h-37.029a7.499 7.499 0 0 1-7.5-7.5v-12.744a7.5 7.5 0 0 1 6.011-7.351V105.99a4.648 4.648 0 0 0-4.643-4.643h-1.524c-6.898 12.417-19.909 20.193-34.423 20.193s-27.524-7.776-34.423-20.193H27.174a7.499 7.499 0 0 1-7.5-7.5V69.081c0-4.143 3.357-7.5 7.5-7.5h57.719c4.748-7.771 12.021-13.585 20.452-16.592v-9.314c0-.514.052-1.015.151-1.5H85.363a7.499 7.499 0 0 1-7.5-7.5v-10.74c0-4.143 3.357-7.5 7.5-7.5h19.981V7.5c0-4.143 3.357-7.5 7.5-7.5h11.4c4.143 0 7.5 3.357 7.5 7.5v.935h19.982c4.143 0 7.5 3.357 7.5 7.5v10.74c0 4.143-3.357 7.5-7.5 7.5h-20.133c.098.485.151.986.151 1.5v9.314c8.431 3.007 15.704 8.82 20.452 16.592h14.438c17.659 0 32.026 14.366 32.026 32.025v26.656c3.666.493 6.493 3.625 6.493 7.425zm-7.803 72.018a7.438 7.438 0 0 0-.387-1.305l-11.15-35.521a7.498 7.498 0 0 0-14.31 0l-11.316 36.051c-.057.18-.106.361-.148.543a19.337 19.337 0 0 0-.902 5.831c0 10.765 8.758 19.522 19.522 19.522s19.522-8.758 19.522-19.522a19.45 19.45 0 0 0-.831-5.599z" fill={props.color || "currentColor"}/>
</svg>
);

export default Water;