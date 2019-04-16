const colorCodes = {
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

  // shadows color
  cocoaBrown: "#2A1E22"
};

// Organization colors
export const organizations = {
  agency: {
    primary: colorCodes.heliotrope,
    secondary: "rgba(139, 81, 252, 0.0964543)"
  },
  payroll: {
    primary: colorCodes.dodgerBlue,
    secondary: "rgba(55, 182, 253, .1)"
  },
  worksite: {
    primary: colorCodes.webOrange,
    secondary: "rgba(255, 164, 0, .1)"
  },
  company: {
    primary: colorCodes.gondola,
    secondary: "rgba(27, 14, 18, 0.1)"
  }
};

// general colors
export const colors = {
  ...colorCodes,
  red: colorCodes.flamingo,
  green: colorCodes.malachite,
  headingUnderline: colorCodes.gray,
  sectionBorder: colorCodes.mischkaa,
  profileFontColor: colorCodes.tundora,
  inputBorder: colorCodes.dustyGray1,
  purpleLinks: colorCodes.heliotrope,
  lightGray: colorCodes.dustyGray2
};

// shadows
export const shadows = {
  buttonShadow: "0px 4px 13px rgba(173, 145, 183, 0.273438)",
  activeButtonShadow: "0px 2px 9px rgba(173, 145, 183, 0.273438)",
  searchShadow: "0px 2px 4px rgba(0, 0, 0, 0.5)",
  frameShadow: "0px 0px 19px 6px rgba(173,145,183,0.273438)"
};

// gradient colors
export const gradient = {
  earwig: `linear-gradient(100.91deg, ${colorCodes.heliotrope} 41.92%, ${
    colorCodes.dodgerBlue
  } 71.11%)`,

  fade: `linear-gradient(96.06deg, ${colorCodes.heliotrope} 18.26%, ${
    colorCodes.cocoaBrown
  }  35.62%, rgba(55, 182, 253, 0.353591) 50.96%, rgba(55, 182, 253, 0) 68.85%)`,
  blackFade: `linear-gradient(96.06deg, ${
    colorCodes.cocoaBrown
  } 18.26%, rgba(42, 30, 34, 0) 68.85%)`,
  multiFade: `linear-gradient(95.7deg, ${colorCodes.heliotrope} -0.49%, ${
    colorCodes.cocoaBrown
  }  16.44%, ${colorCodes.webOrange} 32.65%, ${
    colorCodes.cocoaBrown
  } 48.14%, rgba(42, 30, 34, 0) 68.67%)`
};

export const borders = {
  searchBox: `1px solid ${colors.lightGray}`
};

//  font families to be added
