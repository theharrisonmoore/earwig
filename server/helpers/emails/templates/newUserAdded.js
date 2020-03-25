const mailer = require("../mailer");
const config = require("../../../config");

const newUserAdded = userEmail => {
  const html = `
  <div>
    <p style="font-weight: 700;">Dear earwig Admin,</p>

    <p>Someone just signed up to earwig with email: <span style="font-weight: 700;">${userEmail}</span> </p>

  </div>
`;

  const { email } = config;
  const user = email.main;
  const pass = email.password;
  const from = email.main;
  const to = email.main;
  const subject = "Someone just signed up to earwig";

  return mailer({
    from,
    to,
    subject,
    html,
    user,
    pass,
  });
};

module.exports = newUserAdded;
