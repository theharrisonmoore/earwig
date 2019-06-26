module.exports = {
  database: {
    ORGANIZATIONS_TYPE: ["company", "agency", "payroll", "worksite"],
    SHORT_ID_CHARACTERS: "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ$@",
    PROFILE_SECTIONS: [
      "Key ratings",
      "Detailed ratings",
      "Getting onto site",
      "Working on the site",
      "The site welfare",
      "Supervisors & employees",
      "Tools & materials",
    ],
  },
  tokenMaxAge: {
    string: "30d",
    number: 2592000000,
  },
  referralPoints: 20,
};
