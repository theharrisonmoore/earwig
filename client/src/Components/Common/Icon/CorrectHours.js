import React from "react";

const CorrectHours = props => (
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
      d="M0.753796 16.6765C3.30667 6.93259 11.7528 0.401499 21.1207 0.0178553C23.2826 -0.0706316 25.4953 0.168133 27.6939 0.770744C39.42 3.98417 46.3882 16.3308 43.2462 28.3233C40.1043 40.316 28.0322 47.4425 16.3061 44.2291C4.57998 41.0157 -2.38826 28.6692 0.753796 16.6765ZM27.313 2.21773C25.2579 1.65426 23.1937 1.4308 21.1751 1.51178C12.428 1.86483 4.55489 7.95828 2.16866 17.0661C-0.768298 28.2761 5.7264 39.7783 16.687 42.7821C27.6476 45.7857 38.8945 39.1435 41.8313 27.9337C44.7682 16.7239 38.2736 5.22134 27.313 2.21773ZM22 3.00271C11.48 3.00271 2.93624 11.7407 2.93627 22.4998C2.93633 33.2589 11.4801 41.997 22 41.997C32.52 41.997 41.0637 33.2589 41.0638 22.4998C41.0638 11.7407 32.52 3.00271 22 3.00271ZM21.2668 9.00183V4.54059C20.2039 4.58543 19.165 4.71321 18.1592 4.94193L18.7234 7.09501L17.3057 7.4845L16.7386 5.31687C15.7299 5.63918 14.7642 6.05956 13.8429 6.55299L14.9342 8.48636L13.6654 9.23625L12.5798 7.30873C11.6933 7.88464 10.8659 8.54155 10.0966 9.26549L13.187 12.4263L12.1502 13.4866L9.05981 10.326C8.35205 11.1126 7.70948 11.9589 7.14656 12.8656L9.03117 13.9787L8.29795 15.2763L6.41048 14.1633C5.92815 15.1058 5.51662 16.0899 5.20181 17.1218L7.31555 17.7017L6.93461 19.1489L4.8352 18.5748C4.61218 19.6017 4.48365 20.665 4.43995 21.7499H8.80204V23.2497H4.43995C4.48376 24.3365 4.61155 25.3998 4.8352 26.4281L6.93461 25.8539L7.31555 27.3009L5.20181 27.8809C5.5169 28.9126 5.92792 29.8972 6.41048 30.8395L8.29795 29.7264L9.03117 31.024L7.15229 32.1343C7.71536 33.0406 8.3548 33.8875 9.06267 34.6738L12.1502 31.5162L13.187 32.5765L10.0995 35.7343C10.8683 36.4575 11.6968 37.1128 12.5827 37.6881L13.6654 35.7666L14.9342 36.5165L13.8458 38.4438C14.7672 38.9373 15.7327 39.358 16.7414 39.68L17.3057 37.5182L18.7234 37.9078L18.1592 40.0549C19.165 40.2838 20.2039 40.4142 21.2668 40.4592V35.9978H22.7332V40.4592C23.7961 40.4144 24.835 40.2838 25.8408 40.0549L25.2766 37.9078L26.6943 37.5182L27.2586 39.68C28.2665 39.3581 29.2306 38.9367 30.1514 38.4438L29.063 36.5165L30.3347 35.7666L31.4173 37.6881C32.3032 37.1128 33.1318 36.4575 33.9005 35.7343L30.813 32.5765L31.8498 31.5162L34.9402 34.6738C35.6476 33.8878 36.285 33.04 36.8477 32.1343L34.9689 31.024L35.7021 29.7264L37.5896 30.8395C38.0721 29.8972 38.4831 28.9126 38.7982 27.8809L36.6845 27.3009L37.0626 25.8539L39.1648 26.4281C39.3885 25.3998 39.5162 24.3365 39.5601 23.2497H35.198V21.7499H39.5601C39.5164 20.665 39.3879 19.6017 39.1648 18.5748L37.0654 19.1489L36.6845 17.7017L38.7982 17.1218C38.4834 16.0899 38.0719 15.1058 37.5896 14.1633L35.7021 15.2763L34.9689 13.9787L36.8535 12.8656C36.2906 11.9589 35.648 11.1126 34.9402 10.326L31.8498 13.4866L30.813 12.4263L33.9034 9.26549C33.1341 8.54155 32.3067 7.88464 31.4202 7.30873L30.3347 9.23625L29.0659 8.48636L30.1571 6.55299C29.2358 6.05956 28.2701 5.63918 27.2615 5.31687L26.6943 7.48165L25.2766 7.09501L25.8408 4.94193C24.835 4.71321 23.7961 4.58558 22.7332 4.54059V9.00183H21.2668ZM25.036 10.9118L23.9476 12.1626L21.831 20.2415C21.5086 20.2655 21.1856 20.3525 20.8887 20.5285C19.9635 21.0749 19.5707 22.2218 19.8949 23.2235L12.1273 27.8107C11.9159 27.7177 11.6742 27.7316 11.4743 27.8482C11.3055 27.9475 11.1823 28.1114 11.1318 28.3036C11.0813 28.4959 11.1077 28.7009 11.2051 28.8733C11.3021 29.0459 11.4624 29.172 11.6504 29.2236C11.8385 29.2753 12.0389 29.2483 12.2075 29.1487C12.4071 29.0306 12.5408 28.8234 12.5684 28.5892L20.3331 24.005C21.0183 24.7963 22.1871 25.0151 23.1142 24.4677C23.2371 24.3957 23.3454 24.3107 23.4493 24.2187L27.9832 26.899L29.6186 26.998L28.7164 25.5978L24.1739 22.9175C24.2433 22.5421 24.2305 22.1493 24.1081 21.775L25.5229 20.9372C25.7343 21.0302 25.9761 21.0163 26.176 20.8997C26.3447 20.8004 26.4679 20.6366 26.5184 20.4443C26.5689 20.252 26.5426 20.047 26.4452 19.8746C26.3481 19.702 26.1879 19.576 25.9998 19.5243C25.8118 19.4727 25.6113 19.4996 25.4428 19.5993C25.2431 19.7173 25.1095 19.9245 25.0819 20.1587L23.667 20.9935H23.664C23.5409 20.8525 23.3986 20.737 23.2487 20.6332L25.3653 12.5544L25.036 10.9139L25.036 10.9118ZM22.9108 21.9638C22.6908 21.5748 22.2799 21.3783 21.874 21.4308V21.4305C21.7387 21.4485 21.603 21.4935 21.4759 21.5685C20.9677 21.8686 20.7986 22.519 21.0921 23.0389C21.3855 23.559 22.0188 23.7286 22.527 23.4285C23.0353 23.1282 23.2042 22.4836 22.9108 21.9638Z"
      fill={props.color || "currentColor"}
    />
  </svg>
);

export default CorrectHours;