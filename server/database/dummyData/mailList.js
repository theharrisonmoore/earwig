const MailList = require("./../models/MailList");

module.exports = async () => {
  const mails = [
    { email: "ramyshurafa@hotmail.com" },
    { email: "ramyshurafa@gmail.com" },
  ];

  return MailList.create(mails);
};
