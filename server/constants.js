module.exports = {
  database: {
    ORGANIZATIONS_TYPE: ["company", "agency", "payroll", "worksite"],
    SHORT_ID_CHARACTERS: "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ$@",
  },
  tokenMaxAge: {
    string: "30d",
    number: 2592000000,
  },
};
