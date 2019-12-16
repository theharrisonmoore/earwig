const mailer = require("../mailer");
const config = require("../../../config");

const newTradeAdded = ({ newTrade }) => {
  const html = `
  <div>
    <p style="font-weight: 700;">Dear earwig Admin,</p>

    <p>A user has just added a new trade: <span style="font-weight: 700;">${newTrade.title}</span> </p>

  </div>
`;

  const { email } = config;
  const user = email.main;
  const pass = email.password;
  const from = email.main;
  const to = email.main;
  const subject = "New trade on earwig";


  return mailer({
    from,
    to,
    subject,
    html,
    user,
    pass,
  });
};

module.exports = newTradeAdded;
