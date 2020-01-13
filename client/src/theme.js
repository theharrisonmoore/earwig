// media queries
// so far we only decided to use 1 breakpoint, 768px (tablet)
export const size = {
  mobileS: "320px",
  mobileM: "375px",
  mobileL: "425px",
  mobileXL: "680px",
  tablet: "768px",
  laptop: "1024px",
  laptopL: "1440px",
  desktop: "2560px",
};

export const breakpoints = {
  mobileS: `(min-width: ${size.mobileS})`,
  mobileM: `(min-width: ${size.mobileM})`,
  mobileL: `(min-width: ${size.mobileL})`,
  mobileXL: `(min-width: ${size.mobileXL})`,
  tablet: `(min-width: ${size.tablet})`,
  laptop: `(min-width: ${size.laptop})`,
  laptopL: `(min-width: ${size.laptopL})`,
  desktop: `(min-width: ${size.desktop})`,
  desktopL: `(min-width: ${size.desktop})`,
};

export const breakpointsMax = {
  mobileS: `(max-width: ${size.mobileS})`,
  mobileM: `(max-width: ${size.mobileM})`,
  mobileL: `(max-width: ${size.mobileL})`,
  mobileXL: `(max-width: ${size.mobileXL})`,
  tablet: `(max-width: ${size.tablet})`,
  laptop: `(max-width: ${size.laptop})`,
  laptopL: `(max-width: ${size.laptopL})`,
  desktop: `(max-width: ${size.desktop})`,
  desktopL: `(max-width: ${size.desktop})`,
};

const colorCodes = {
  // primary
  primary: "#1C77C3",
  // red buttons background
  secondary: "#ED254E",

  // organizations
  heliotrope: "#8B51FC",
  dodgerBlue: "#37B6FD",
  webOrange: "#FFA400",
  gondola: "#1C0F13",

  // general
  flamingo: "#F15025", // red
  malachite: "#04E762", // green
  white: "#FFFFFF",
  gray: "#818181",
  mischkaa: "#DBD5DD",
  tundora: "#4A4A4A",
  dustyGray1: "#979797",
  dustyGray2: "#9B9B9B",
  dustyGray3: "#767676",
  dustyGray4: "#949494",
  veryLightGray: "#CDCDCD",
  black: "#000000",
  black2: "#363636",
  athens1: "#EDEFF2",
  athens2: "#F0F2F4",
  alto: "#D8D8D8",
  brown: "#f8a791",
  orange: "#FFB751",

  // shadows color
  cocoaBrown: "#2A1E22",

  // stars
  stars: "#F8E71C",

  // transparent
  ghostWhite: "rgba(255, 255, 255, 0.7)",
  btnClick: "rgba(255, 255, 255, 0.3)",
  ghostGray: "rgba(28, 15, 19, 0.0514915)",
};

// Organization colors
export const organizations = {
  agency: {
    primary: colorCodes.heliotrope,
    secondary: "rgba(139, 81, 252, 0.0964543)",
  },
  payroll: {
    primary: colorCodes.dodgerBlue,
    secondary: "rgba(55, 182, 253, .1)",
  },
  worksite: {
    primary: colorCodes.webOrange,
    secondary: "rgba(255, 164, 0, .1)",
  },
  company: {
    primary: colorCodes.gondola,
    secondary: "rgba(27, 14, 18, 0.1)",
  },
};

// general colors
export const colors = {
  ...colorCodes,
  red: colorCodes.flamingo,
  green: colorCodes.malachite,
  headingUnderline: colorCodes.gray,
  sectionBorder: colorCodes.mischkaa,
  profileFontColor: colorCodes.dustyGray3,
  inputBorder: colorCodes.dustyGray1,
  purpleLinks: colorCodes.heliotrope,
  lightGray: colorCodes.dustyGray2,
  strikedOutItem: colorCodes.brown,
  warningText: colorCodes.orange,
};

// shadows
export const shadows = {
  buttonShadow: "0px 2px 4px rgba(0, 0, 0, 0.462658)",
  activeButtonShadow: "0px 1px 2px rgba(0, 0, 0, 0.462658)",
  sectionShadow: "0px 12px 16px -13px rgba(173,145,183,0.273438)",
  searchShadow: "0px 2px 4px rgba(0, 0, 0, 0.5)",
  commentShadow: "0px 3px 4px rgba(152, 152, 152, 0.5);",
  headerShadow: "0px -5px 17px #9B9B9B;",
  searchBoxShadow: "0px 2px 4px rgba(0, 0, 0, 0.5)",
  autocompleteSuggestionShadow: "0px 1px 2px rgba(0, 0, 0, 0)",
  frameShadow: "0px 0px 19px 6px rgba(173,145,183,0.273438)",
  buttonShadow2: "0px 2px 5px rgba(0, 0, 0, 0.25)",
};

// gradient colors
export const gradient = {
  earwig: `linear-gradient(100.91deg, ${colorCodes.heliotrope} 41.92%, ${colorCodes.dodgerBlue} 71.11%)`,

  fade: `linear-gradient(96.06deg, ${colorCodes.heliotrope} 18.26%, ${colorCodes.cocoaBrown}  35.62%, rgba(55, 182, 253, 0.353591) 50.96%, rgba(55, 182, 253, 0) 68.85%)`,
  blackFade: `linear-gradient(96.06deg, ${colorCodes.cocoaBrown} 18.26%, rgba(42, 30, 34, 0) 90%)`,
  multiFade: `linear-gradient(95.7deg, ${colorCodes.heliotrope} -0.49%, ${colorCodes.cocoaBrown}  16.44%, ${colorCodes.webOrange} 32.65%, ${colorCodes.cocoaBrown} 48.14%, rgba(42, 30, 34, 0) 68.67%)`,
  adminBackground: `linear-gradient(to bottom, ${colorCodes.athens1} 0%,  ${colorCodes.athens2} 100%)`,
};

export const borders = {
  searchBox: `2px solid ${colors.black}`,
  buttonBox: `1px solid ${colors.black}`,
  commentBox: `1px solid ${colors.veryLightGray}`,
  recording: `1px solid ${colors.red}`,
  section: `1px solid ${colors.sectionBorder}`,
};

export const pieColors = {
  agency: [
    "#8B51FC",
    "#7F4AE6",
    "#7243CF",
    "#663BB8",
    "#5934A1",
    "#4C2D8A",
    "#402573",
    "#331E5C",
  ],
};

// icons

export const organizationIcons = {
  agency: {
    symbol: "agency-icon",
    arrow: "agency-arrow",
  },
  payroll: {
    symbol: "payroll-icon",
    arrow: "payroll-arrow",
  },
  worksite: {
    symbol: "worksite-icon",
    arrow: "worksite-arrow",
  },
  company: {
    symbol: "company-icon",
    arrow: "company-arrow",
  },
};

export const cookieStyles = {
  general: {
    background: `${colors.dodgerBlue}`,
    color: `${colors.white}`,
    display: "flex",
    justifyContent: "flex-start",
    alignItems: "center",
    fontSize: "16px",
    fontWeight: "500",
    fontFamily: "Roboto",
    maxHeight: 155,
    paddingRight: "10rem",
    textAlign: "left",
  },
  contentStyle: {
    border: "1px red solid",
  },
  button: {
    background: `${colors.white}`,
    color: `${colors.black}`,
    fontSize: "16px",
    borderRadius: 4,
    border: `1px ${colors.white}`,
    marginTop: "15px",
    // marginTop: -8
  },
  buttonMobile: {
    background: `${colors.white}`,
    color: `${colors.black}`,
    fontSize: "16px",
    borderRadius: 4,
    border: `1px ${colors.white}`,
    marginTop: 0,
  },
  link: {
    textDecoration: "none",
    cursor: "pointer",
  },
};
//  font families to be added
