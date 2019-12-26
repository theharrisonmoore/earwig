import React from "react";

const ContractBefore = props => (
  <svg
    height={props.height}
    width={props.width}
    viewBox="0 0 45 45"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M33.8571 23.0536C33.8749 23.0514 33.8928 23.0493 33.9107 23.0472V23.0536H33.8571ZM33.9107 23.0472C34.3256 23 34.7856 23 35.1964 23C35.6786 23 36.1071 23 36.5893 23.0536V9.65035V8.73893V5.68298C36.5893 2.51981 34.0714 0 30.9107 0H12.2679C11.9464 0 11.625 0.0536131 11.3036 0.160839C10.9821 0.268065 10.7143 0.482517 10.5 0.69697L0.803571 10.0793C0.535714 10.2937 0.375 10.6154 0.214286 10.9371C0.0535714 11.2051 0 11.5804 0 11.9021V40.317C0 43.4802 2.51786 46 5.67857 46H27.3214C26.3571 45.2494 25.4464 44.338 24.75 43.3193H5.67857C4.01786 43.3193 2.67857 41.979 2.67857 40.317V12.7063H7.44643C10.5536 12.7063 13.125 10.1329 13.125 7.02331V2.68065H30.9107C32.5714 2.68065 33.9107 4.02098 33.9107 5.68298V8.73893V23.0472ZM29.25 13.6177C30 13.6177 30.5893 13.028 30.5893 12.2774C30.5893 11.5268 30 10.9371 29.25 10.9371H28.6071H24.375H21.9643H17.9464H17.0893C16.3393 10.9371 15.75 11.5268 15.75 12.2774C15.75 13.028 16.3393 13.6177 17.0893 13.6177H17.9464H18.9643H27.3214H28.6071H29.25ZM29.25 21.6597C30 21.6597 30.5893 22.2494 30.5893 23C30.5893 23.7506 30 24.3403 29.25 24.3403H21H15.375H7.125C6.375 24.3403 5.78571 23.7506 5.78571 23C5.78571 22.2494 6.375 21.6597 7.125 21.6597H12.5893H15.4286H20.8929H23.3036H29.25ZM29.25 16.2984H19.2321H17.1429H7.125C6.375 16.2984 5.78571 16.8881 5.78571 17.6387C5.78571 18.3893 6.375 18.979 7.125 18.979H12.6429H16.0179H20.3571H23.3036H29.25C30 18.979 30.5893 18.3893 30.5893 17.6387C30.5893 16.8881 30 16.2984 29.25 16.2984ZM25.8214 27.021C25.0714 27.8252 24.4286 28.7366 23.8929 29.7016H23.3571H19.7143H16.7143H12.6429H7.125C6.375 29.7016 5.78571 29.1119 5.78571 28.3613C5.78571 27.6107 6.375 27.021 7.125 27.021H15.75H20.5714H25.8214ZM7.125 35.0629H15.5893H20.7857H22.3929C22.4464 34.1515 22.6071 33.2401 22.8214 32.3823H18.2679H18.1071H7.125C6.375 32.3823 5.78571 32.972 5.78571 33.7226C5.78571 34.4732 6.375 35.0629 7.125 35.0629ZM23.1964 40.4242H7.01786C6.26786 40.4242 5.67857 39.8345 5.67857 39.0839C5.67857 38.3333 6.26786 37.7436 7.01786 37.7436H22.5C22.6071 38.655 22.875 39.5664 23.1964 40.4242ZM36.1071 35.3846C36.1071 35.4918 36.1607 35.6527 36.2679 35.7599L38.4107 38.3333C38.625 38.7086 38.625 39.1911 38.3571 39.4592C38.0357 39.7809 37.5 39.7809 37.1786 39.5128L34.2321 37.0466L34.0714 36.8858C33.8036 36.6713 33.6964 36.3497 33.6964 36.028V35.9744V35.8671L34.0714 30.6131V30.5594C34.125 30.1305 34.5 29.8089 34.9286 29.8089C35.3571 29.8089 35.7321 30.1841 35.7857 30.6131L36.1071 35.3846ZM45 35.8671C45 41.3893 40.5 45.8928 34.9821 45.8928C29.4643 45.8928 24.9107 41.3893 24.9107 35.8671C24.9107 30.345 29.4107 25.8415 34.9286 25.8415C40.4464 25.8415 45 30.2914 45 35.8671ZM34.9821 28.1469C39.2143 28.1469 42.6964 31.5781 42.6964 35.8671C42.6964 40.1026 39.2143 43.5874 34.9821 43.5874C30.75 43.5874 27.2679 40.1026 27.2679 35.8671C27.2679 31.6317 30.6964 28.1469 34.9821 28.1469Z"
      fill={props.color || "currentColor"}
    />
  </svg>
);

export default ContractBefore;